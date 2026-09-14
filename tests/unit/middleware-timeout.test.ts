/**
 * middleware の Supabase タイムアウトを「実物の @supabase/ssr + auth-js」で検証する。
 *
 * tests/unit/middleware.test.ts は createServerClient をモックしているため、
 * custom fetch の配線や auth-js 内部の再試行（指数バックオフ）を検証できない。
 * ここでは global.fetch だけを「永久に pending、abort で reject」に差し替え、
 * middleware 全体が SUPABASE_TIMEOUT_MS（5 秒）で完了することを確認する。
 */
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

const SUPABASE_URL = "https://stub.supabase.co";
// supabase-js の既定 storageKey は `sb-<project-ref>-auth-token`
const COOKIE_NAME = "sb-stub-auth-token";
const NOW = new Date("2026-09-14T00:00:00Z");

function sessionCookie(expiresAt: number) {
  const session = {
    access_token: "access-token",
    refresh_token: "refresh-token",
    token_type: "bearer",
    expires_in: 3600,
    expires_at: expiresAt,
    user: { id: "u1", aud: "authenticated", role: "authenticated" },
  };
  const encoded = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${COOKIE_NAME}=base64-${encoded}`;
}

function makeRequest(path: string, cookie: string) {
  return new NextRequest(`https://example.com${path}`, {
    headers: {
      authorization: `Basic ${Buffer.from("user:pass").toString("base64")}`,
      cookie,
    },
  });
}

type FetchMock = Mock<
  (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
>;

/** 永久に応答せず、signal が abort されたときだけ reject する fetch */
function pendingFetch(): FetchMock {
  return vi.fn((_input: RequestInfo | URL, init?: RequestInit) => {
    return new Promise<Response>((_, reject) => {
      const signal = init?.signal;
      const abort = () => reject(new DOMException("aborted", "AbortError"));
      if (signal?.aborted) return abort();
      signal?.addEventListener("abort", abort, { once: true });
    });
  });
}

async function runWithTimers(request: NextRequest) {
  let settled = false;
  const pending = middleware(request).then((res) => {
    settled = true;
    return res;
  });

  await vi.advanceTimersByTimeAsync(4_999);
  const settledBeforeTimeout = settled;

  await vi.advanceTimersByTimeAsync(1);
  const res = await pending;

  return { res, settledBeforeTimeout };
}

describe("middleware: Supabase 応答不能時のタイムアウト（実 auth-js）", () => {
  let fetchMock: FetchMock;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", SUPABASE_URL);
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "anon-key");
    vi.stubEnv("BASIC_AUTH_USER", "user");
    vi.stubEnv("BASIC_AUTH_PASSWORD", "pass");
    fetchMock = pendingFetch();
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("有効なセッション cookie あり: GET /auth/v1/user が pending でも 5 秒で 200 を返す", async () => {
    const validExpiresAt = Math.floor(NOW.getTime() / 1000) + 3600;

    const { res, settledBeforeTimeout } = await runWithTimers(
      makeRequest("/stations", sessionCookie(validExpiresAt)),
    );

    expect(settledBeforeTimeout).toBe(false);
    expect(res.status).toBe(200);

    const urls = fetchMock.mock.calls.map((c) => String(c[0]));
    expect(urls.some((u) => u.startsWith(`${SUPABASE_URL}/auth/v1/user`))).toBe(
      true,
    );
    // 中断された fetch は abort されている（signal が配線されている証拠）
    const init = fetchMock.mock.calls[0][1];
    expect(init?.signal?.aborted).toBe(true);
  });

  it("期限切れセッション cookie あり: refresh が pending → 再試行に入っても 5 秒で 200 を返す", async () => {
    // EXPIRY_MARGIN_MS（90 秒）より前に期限切れ → __loadSession が refresh を呼ぶ
    const expiredAt = Math.floor(NOW.getTime() / 1000) - 60;

    const { res, settledBeforeTimeout } = await runWithTimers(
      makeRequest("/stations", sessionCookie(expiredAt)),
    );

    expect(settledBeforeTimeout).toBe(false);
    expect(res.status).toBe(200);

    const urls = fetchMock.mock.calls.map((c) => String(c[0]));
    expect(
      urls.some((u) =>
        u.startsWith(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`),
      ),
    ).toBe(true);
  });

  it("期限切れセッション + 保護ルート: 5 秒で打ち切ってログインへリダイレクトする", async () => {
    const expiredAt = Math.floor(NOW.getTime() / 1000) - 60;

    const { res } = await runWithTimers(
      makeRequest("/mypage", sessionCookie(expiredAt)),
    );

    expect(res.status).toBe(307);
    expect(new URL(res.headers.get("location")!).pathname).toBe("/auth/login");
  });

  it("セッション cookie なし: Supabase へ fetch せず即座に 200 を返す", async () => {
    const res = await middleware(makeRequest("/", ""));

    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
  });
});
