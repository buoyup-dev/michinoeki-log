import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/mypage", "/admin"];

// Vercel Cron Jobs が叩くパス（vercel.json の crons と一致させる）
const CRON_PATHS = ["/api/keepalive"];

// Supabase への問い合わせ上限（middleware 1 回あたりの合計）。
// Supabase 側が停止・遅延していても middleware 全体が Vercel の実行時間上限
// （Edge: 25 秒）に達して 504 になるのを防ぐ。
//
// 注意: fetch 1 回ごとのタイムアウトでは不十分。auth-js はトークン refresh が
// ネットワークエラーで失敗すると 30 秒枠内で指数バックオフ再試行するため、
// fetch 単位で 5 秒に切っても合計は 25 秒を超えうる。そのため
//   1. 全 fetch で 1 つの AbortSignal を共有し（in-flight の fetch を止める）
//   2. getUser() 全体を同じ signal で打ち切る（再試行の sleep も待たない）
// の両方を行う。
const SUPABASE_TIMEOUT_MS = 5_000;

/**
 * Vercel Cron Jobs からのリクエストか判定する。
 * Vercel は環境変数 CRON_SECRET が設定されていると
 * `Authorization: Bearer <CRON_SECRET>` を付与して cron のパスを呼び出す。
 * CRON_SECRET 未設定時は常に false（cron を Basic 認証の外に出さない）。
 */
function isVercelCronRequest(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  if (!CRON_PATHS.includes(request.nextUrl.pathname)) return false;

  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${secret}`;
}

function checkBasicAuth(request: NextRequest): NextResponse | null {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASSWORD;

  if (!user || !pass) return null;

  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      let decoded: string;
      try {
        decoded = atob(encoded);
      } catch {
        return new NextResponse("Unauthorized", {
          status: 401,
          headers: { "WWW-Authenticate": 'Basic realm="Protected"' },
        });
      }
      const colonIndex = decoded.indexOf(":");
      if (colonIndex !== -1) {
        const u = decoded.slice(0, colonIndex);
        const p = decoded.slice(colonIndex + 1);
        if (u === user && p === pass) return null;
      }
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Protected"' },
  });
}

/** signal が abort されたら reject する Promise で promise を包む */
function withAbort<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const onAbort = () =>
      reject(new Error(`aborted after ${SUPABASE_TIMEOUT_MS}ms`));
    if (signal.aborted) {
      onAbort();
      return;
    }
    signal.addEventListener("abort", onAbort, { once: true });
    promise.then(resolve, reject).finally(() => {
      signal.removeEventListener("abort", onAbort);
    });
  });
}

export async function middleware(request: NextRequest) {
  // Vercel Cron からの keepalive は Basic 認証・セッション更新ともに不要
  if (isVercelCronRequest(request)) {
    return NextResponse.next({ request });
  }

  const basicAuthResponse = checkBasicAuth(request);
  if (basicAuthResponse) return basicAuthResponse;

  let supabaseResponse = NextResponse.next({
    request,
  });

  // AbortSignal.timeout() ではなく AbortController + setTimeout を使う
  // （テストで fake timer から制御できるようにするため）
  const abortController = new AbortController();
  const abortTimer = setTimeout(
    () => abortController.abort(),
    SUPABASE_TIMEOUT_MS,
  );

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (input, init) =>
          fetch(input, { ...init, signal: abortController.signal }),
      },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: DO NOT REMOVE auth.getUser()
  // This refreshes the session and must be called for every request
  //
  // Supabase が停止中・応答不能のときは未認証扱いで続行し、
  // 公開ページはそのまま表示できるようにする（保護ルートはログインへ）。
  // - auth-js はネットワークエラーを throw せず { error } で返すので、戻り値を見てログに残す
  //   （セッション cookie なしの AuthSessionMissingError は正常系なので除外）
  // - 再試行の sleep 中でも SUPABASE_TIMEOUT_MS で打ち切る（withAbort が reject）
  let user: User | null = null;
  try {
    const { data, error } = await withAbort(
      supabase.auth.getUser(),
      abortController.signal,
    );
    if (error && error.name !== "AuthSessionMissingError") {
      console.error("middleware: supabase.auth.getUser() failed:", error);
    }
    user = data.user;
  } catch (e) {
    console.error("middleware: supabase.auth.getUser() timed out:", e);
  } finally {
    clearTimeout(abortTimer);
  }

  // Redirect unauthenticated users away from protected routes
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (isProtectedRoute && !user) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
