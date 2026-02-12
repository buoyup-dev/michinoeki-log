import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/auth";
import { getFavorites } from "@/lib/db/queries/favorites";
import { FavoriteButton } from "@/components/features/favorite/FavoriteButton";
import { areaGroupColors } from "@/lib/utils/area-colors";

export const metadata: Metadata = {
  title: "お気に入り",
};

export default async function FavoritesPage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/login?next=/mypage/favorites");
  }

  const favorites = await getFavorites();

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">お気に入り</h1>
        <Link
          href="/mypage"
          className="text-sm text-blue-600 hover:underline"
        >
          マイページに戻る
        </Link>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
          <p className="text-gray-500">お気に入りはまだありません</p>
          <Link
            href="/stations"
            className="mt-2 inline-block text-sm text-blue-600 hover:underline"
          >
            道の駅を探す
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {favorites.map((fav) => (
            <li key={fav.id} className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4">
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
                  />
                ) : (
                  <div className="flex h-[60px] w-[80px] shrink-0 items-center justify-center rounded-md bg-gray-100">
                    <svg className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                    </svg>
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{fav.station.name}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${areaGroupColors[fav.station.areaGroup] ?? "bg-gray-100 text-gray-800"}`}
                    >
                      {fav.station.areaGroup}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500">{fav.station.address}</p>
                  <p className="mt-1 text-xs text-gray-400">
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
      )}
    </>
  );
}
