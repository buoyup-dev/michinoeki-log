import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const getUserMock = vi.fn();

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(() => ({
    auth: { getUser: getUserMock },
  })),
}));

import { middleware } from "@/middleware";

const BASE_URL = "https://example.com";

function makeRequest(path: string, headers: Record<string, string> = {}) {
  return new NextRequest(`${BASE_URL}${path}`, { headers });
}

function basicHeader(user: string, pass: string) {
  return `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;
}

describe("middleware", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://stub.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "anon-key");
    vi.stubEnv("BASIC_AUTH_USER", "user");
    vi.stubEnv("BASIC_AUTH_PASSWORD", "pass");
    vi.stubEnv("CRON_SECRET", "cron-secret");
    getUserMock.mockReset();
    getUserMock.mockResolvedValue({ data: { user: null }, error: null });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  describe("Vercel Cron からの keepalive", () => {
    it("正しい CRON_SECRET の Bearer なら Basic 認証をスキップして通す", async () => {
      const res = await middleware(
        makeRequest("/api/keepalive", {
          authorization: "Bearer cron-secret",
        }),
      );

      expect(res.status).toBe(200);
      expect(getUserMock).not.toHaveBeenCalled();
    });

    it("CRON_SECRET が違えば Basic 認証で 401 になる", async () => {
      const res = await middleware(
        makeRequest("/api/keepalive", { authorization: "Bearer wrong" }),
      );

      expect(res.status).toBe(401);
    });

    it("CRON_SECRET 未設定なら Bearer では通さない", async () => {
      vi.stubEnv("CRON_SECRET", "");

      const res = await middleware(
        makeRequest("/api/keepalive", { authorization: "Bearer " }),
      );

      expect(res.status).toBe(401);
    });

    it("cron 対象外のパスは正しい Bearer でも Basic 認証を要求する", async () => {
      const res = await middleware(
        makeRequest("/", { authorization: "Bearer cron-secret" }),
      );

      expect(res.status).toBe(401);
    });
  });

  describe("Basic 認証", () => {
    it("認証ヘッダーなしは 401", async () => {
      const res = await middleware(makeRequest("/"));

      expect(res.status).toBe(401);
      expect(res.headers.get("www-authenticate")).toContain("Basic");
    });

    it("正しい資格情報なら通す", async () => {
      const res = await middleware(
        makeRequest("/", { authorization: basicHeader("user", "pass") }),
      );

      expect(res.status).toBe(200);
      expect(getUserMock).toHaveBeenCalledTimes(1);
    });

    it("BASIC_AUTH_USER / PASSWORD 未設定なら Basic 認証は無効", async () => {
      vi.stubEnv("BASIC_AUTH_USER", "");
      vi.stubEnv("BASIC_AUTH_PASSWORD", "");

      const res = await middleware(makeRequest("/"));

      expect(res.status).toBe(200);
    });
  });

  describe("Supabase 応答不能時", () => {
    const auth = { authorization: basicHeader("user", "pass") };

    // auth-js はネットワークエラーを throw せず { data: { user: null }, error } で返す
    const retryableError = Object.assign(new Error("fetch failed"), {
      name: "AuthRetryableFetchError",
    });

    it("getUser() がエラーを返しても公開ページは表示でき、ログに残す", async () => {
      getUserMock.mockResolvedValue({
        data: { user: null },
        error: retryableError,
      });

      const res = await middleware(makeRequest("/stations", auth));

      expect(res.status).toBe(200);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining("getUser() failed"),
        retryableError,
      );
    });

    it("getUser() がエラーを返した場合、保護ルートはログインへリダイレクトする", async () => {
      getUserMock.mockResolvedValue({
        data: { user: null },
        error: retryableError,
      });

      const res = await middleware(makeRequest("/mypage", auth));

      expect(res.status).toBe(307);
      const location = new URL(res.headers.get("location")!);
      expect(location.pathname).toBe("/auth/login");
      expect(location.searchParams.get("next")).toBe("/mypage");
    });

    it("セッション cookie なし（AuthSessionMissingError）は正常系なのでログに残さない", async () => {
      getUserMock.mockResolvedValue({
        data: { user: null },
        error: Object.assign(new Error("Auth session missing!"), {
          name: "AuthSessionMissingError",
        }),
      });

      const res = await middleware(makeRequest("/", auth));

      expect(res.status).toBe(200);
      expect(console.error).not.toHaveBeenCalled();
    });

    it("getUser() が永久に応答しなくても 5 秒で打ち切って続行する", async () => {
      vi.useFakeTimers();
      try {
        getUserMock.mockReturnValue(new Promise(() => {}));

        let settled = false;
        const pending = middleware(makeRequest("/", auth)).then((res) => {
          settled = true;
          return res;
        });

        await vi.advanceTimersByTimeAsync(4_999);
        expect(settled).toBe(false);

        await vi.advanceTimersByTimeAsync(1);
        const res = await pending;

        expect(settled).toBe(true);
        expect(res.status).toBe(200);
        expect(console.error).toHaveBeenCalledWith(
          expect.stringContaining("timed out"),
          expect.any(Error),
        );
      } finally {
        vi.useRealTimers();
      }
    });
  });

  describe("保護ルート", () => {
    const auth = { authorization: basicHeader("user", "pass") };

    it("未認証ユーザーはログインへリダイレクト", async () => {
      const res = await middleware(makeRequest("/admin", auth));

      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toContain(
        "/auth/login?next=%2Fadmin",
      );
    });

    it("認証済みユーザーは通す", async () => {
      getUserMock.mockResolvedValue({
        data: { user: { id: "u1" } },
        error: null,
      });

      const res = await middleware(makeRequest("/mypage", auth));

      expect(res.status).toBe(200);
    });
  });
});
