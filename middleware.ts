import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/mypage", "/admin"];

// Vercel Cron Jobs が叩くパス（vercel.json の crons と一致させる）
const CRON_PATHS = ["/api/keepalive"];

// Supabase への問い合わせ上限。Supabase 側が停止・遅延していても
// middleware 全体が Vercel の実行時間上限に達して 504 になるのを防ぐ
const SUPABASE_FETCH_TIMEOUT_MS = 5_000;

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

/** Supabase への各リクエストにタイムアウトを付与する fetch */
function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  return fetch(input, {
    ...init,
    signal: AbortSignal.timeout(SUPABASE_FETCH_TIMEOUT_MS),
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

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { fetch: fetchWithTimeout },
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
  // Supabase が停止中・応答不能のときは fetchWithTimeout が例外を投げる。
  // その場合は未認証扱いで続行し、公開ページはそのまま表示できるようにする。
  let user: { id: string } | null = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (e) {
    console.error("middleware: supabase.auth.getUser() failed:", e);
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
