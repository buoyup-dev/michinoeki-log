import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMyProfile } from "@/lib/db/queries/profiles";
import { getVisitStats, getVisitHistory } from "@/lib/db/queries/visits";
import { VisitStatsCard } from "@/components/features/visit/VisitStatsCard";
import { areaGroupColors } from "@/lib/utils/area-colors";
import { ProfileForm } from "./ProfileForm";

export const metadata: Metadata = {
  title: "マイページ",
};

export default async function MypagePage() {
  const [profile, stats, history] = await Promise.all([
    getMyProfile(),
    getVisitStats(),
    getVisitHistory(20),
  ]);

  if (!profile) {
    return (
      <div className="text-center text-gray-600">
        プロフィールの読み込みに失敗しました。
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-8 text-2xl font-bold text-gray-900">マイページ</h1>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">プロフィール</h2>

        <div className="mb-6 flex items-center gap-4">
          {profile.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt=""
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-medium text-blue-700">
              {profile.displayName.charAt(0) || "?"}
            </span>
          )}
          <div>
            <p className="font-medium text-gray-900">{profile.displayName || "未設定"}</p>
            <p className="text-sm text-gray-500">
              登録日: {new Date(profile.createdAt).toLocaleDateString("ja-JP")}
            </p>
          </div>
        </div>

        <ProfileForm displayName={profile.displayName} />
      </section>

      {/* 訪問統計 */}
      {stats && (
        <section className="mt-8">
          <VisitStatsCard stats={stats} />
        </section>
      )}

      {/* 訪問履歴 */}
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">訪問履歴</h2>

        {history.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
            <p className="text-gray-500">まだ訪問記録がありません</p>
            <Link
              href="/stations"
              className="mt-2 inline-block text-sm text-blue-600 hover:underline"
            >
              道の駅を探す
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {history.map((visit) => (
              <li key={visit.id}>
                <Link
                  href={`/stations/${visit.station.id}`}
                  className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition hover:bg-gray-50"
                >
                  {/* 道の駅画像 */}
                  {visit.station.imageUrl ? (
                    <Image
                      src={visit.station.imageUrl}
                      alt={visit.station.name}
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

                  {/* 訪問情報 */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{visit.station.name}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${areaGroupColors[visit.station.areaGroup] ?? "bg-gray-100 text-gray-800"}`}
                      >
                        {visit.station.areaGroup}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <time dateTime={visit.visitedAt}>
                        {new Date(visit.visitedAt).toLocaleDateString("ja-JP")}
                      </time>
                      {visit.isGpsVerified ? (
                        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-yellow-600">
                          <span className="text-yellow-500">●</span> Gold
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-gray-400">
                          <span>●</span> Silver
                        </span>
                      )}
                    </div>

                    {visit.memo && (
                      <p className="mt-1 truncate text-sm text-gray-600">{visit.memo}</p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
