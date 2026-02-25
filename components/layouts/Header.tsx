import Link from "next/link";
import { getUser } from "@/lib/supabase/auth";
import { getProfileForHeader } from "@/lib/db/queries/profiles";
import { UserMenu } from "./UserMenu";

export async function Header() {
  const user = await getUser();
  const profile = user ? await getProfileForHeader() : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-foreground">
          道の駅コレクション
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            地図
          </Link>
          <Link
            href="/stations"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            一覧
          </Link>
          {user && profile ? (
            <UserMenu
              displayName={profile.displayName}
              avatarUrl={profile.avatarUrl}
            />
          ) : (
            <Link
              href="/auth/login"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              ログイン
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
