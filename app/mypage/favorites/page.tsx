import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/auth";
import { getFavorites, getFavoriteCount } from "@/lib/db/queries/favorites";
import { FavoriteButton } from "@/components/features/favorite/FavoriteButton";
import { areaGroupColors } from "@/lib/utils/area-colors";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "お気に入り",
};

const PER_PAGE = 20;

export default async function FavoritesPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/auth/login?next=/mypage/favorites");
  }

  const { page: pageParam } = await props.searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const offset = (page - 1) * PER_PAGE;

  const [favorites, totalCount] = await Promise.all([
    getFavorites(PER_PAGE, offset),
    getFavoriteCount(),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PER_PAGE));

  return (
    <>
      <Link
        href="/mypage"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        マイページに戻る
      </Link>

      <h1 className="mb-8 text-2xl font-bold text-foreground">お気に入り</h1>

      {favorites.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-6 text-center">
          <p className="text-muted-foreground">お気に入りはまだありません</p>
          <Link
            href="/stations"
            className="mt-2 inline-block text-sm text-primary hover:underline"
          >
            道の駅を探す
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            全{totalCount}件中 {offset + 1}〜{Math.min(offset + PER_PAGE, totalCount)}件
          </p>

          <ul className="space-y-3">
            {favorites.map((fav) => (
              <li key={fav.id} className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                <Link
                  href={`/stations/${fav.station.id}`}
                  className="flex min-w-0 flex-1 items-start gap-4 transition hover:opacity-80"
                >
                  {fav.station.imageUrl ? (
                    <Image
                      src={fav.station.imageUrl}
                      alt={fav.station.name}
                      width={80}
                      height={60}
                      className="shrink-0 rounded-md object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-[60px] w-[80px] shrink-0 items-center justify-center rounded-md bg-muted">
                      <svg className="h-6 w-6 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </svg>
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{fav.station.name}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${areaGroupColors[fav.station.areaGroup] ?? "bg-muted text-foreground"}`}
                      >
                        {fav.station.areaGroup}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{fav.station.address}</p>
                    <p className="mt-1 text-xs text-muted-foreground/70">
                      {new Date(fav.createdAt).toLocaleDateString("ja-JP")} に追加
                    </p>
                  </div>
                </Link>

                <div className="shrink-0">
                  <FavoriteButton stationId={fav.station.id} initialFavorited={true} />
                </div>
              </li>
            ))}
          </ul>

          {/* ページネーション */}
          {totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-2" aria-label="ページネーション">
              {page > 1 ? (
                <Link
                  href={`/mypage/favorites?page=${page - 1}`}
                  className="flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  <ChevronLeft className="h-4 w-4" />
                  前へ
                </Link>
              ) : (
                <span className="flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground/50">
                  <ChevronLeft className="h-4 w-4" />
                  前へ
                </span>
              )}

              <span className="px-3 py-2 text-sm text-muted-foreground">
                {page} / {totalPages}
              </span>

              {page < totalPages ? (
                <Link
                  href={`/mypage/favorites?page=${page + 1}`}
                  className="flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  次へ
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <span className="flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground/50">
                  次へ
                  <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </nav>
          )}
        </>
      )}
    </>
  );
}
