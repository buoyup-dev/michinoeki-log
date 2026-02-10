import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

function safeRedirectPath(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = safeRedirectPath(searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const redirectUrl = new URL(next, origin);
      if (redirectUrl.origin !== origin) {
        return NextResponse.redirect(new URL("/", origin));
      }
      return NextResponse.redirect(redirectUrl);
    }
    console.error("Auth callback: exchangeCodeForSession failed", error.message);
  } else {
    console.error("Auth callback: no code parameter");
  }

  return NextResponse.redirect(new URL("/auth/login?error=callback_error", origin));
}
