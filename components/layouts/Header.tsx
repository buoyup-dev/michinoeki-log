import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold text-gray-900">
          道の駅コレクション
        </Link>
        <nav className="flex gap-6">
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
        </nav>
      </div>
    </header>
  );
}
