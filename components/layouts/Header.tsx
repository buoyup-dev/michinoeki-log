import Link from "next/link";
import { getUser } from "@/lib/supabase/auth";
import { getProfileForHeader } from "@/lib/db/queries/profiles";
import { UserMenu } from "./UserMenu";

export async function Header() {
  const user = await getUser();
  const profile = user ? await getProfileForHeader() : null;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-gray-900">
          道の駅コレクション
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            地図
          </Link>
          <Link
            href="/stations"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            一覧
          </Link>
          {user && (
            <Link
              href="/mypage"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              マイページ
            </Link>
          )}
          {user && profile ? (
            <UserMenu
              displayName={profile.displayName}
              avatarUrl={profile.avatarUrl}
            />
          ) : (
            <Link
              href="/auth/login"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              ログイン
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
