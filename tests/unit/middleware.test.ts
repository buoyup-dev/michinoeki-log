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

    it("getUser() が失敗しても公開ページは表示できる", async () => {
      getUserMock.mockRejectedValue(
        new DOMException("timeout", "TimeoutError"),
      );

      const res = await middleware(makeRequest("/stations", auth));

      expect(res.status).toBe(200);
    });

    it("getUser() が失敗した場合、保護ルートはログインへリダイレクトする", async () => {
      getUserMock.mockRejectedValue(
        new DOMException("timeout", "TimeoutError"),
      );

      const res = await middleware(makeRequest("/mypage", auth));

      expect(res.status).toBe(307);
      const location = new URL(res.headers.get("location")!);
      expect(location.pathname).toBe("/auth/login");
      expect(location.searchParams.get("next")).toBe("/mypage");
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
