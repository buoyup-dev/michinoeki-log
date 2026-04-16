import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMyProfile } from "@/lib/db/queries/profiles";
import { getVisitStats, getVisitCount } from "@/lib/db/queries/visits";
import { getFavoriteCount } from "@/lib/db/queries/favorites";
import { getMyMapPinCount } from "@/lib/db/queries/map-pins";
import { VisitStatsCard } from "@/components/features/visit/VisitStatsCard";
import { Settings, Heart, Clock, MapPin, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "マイページ",
};

export default async function MypagePage() {
  const [profile, stats, visitCount, favoriteCount, pinCount] = await Promise.all([
    getMyProfile(),
    getVisitStats(),
    getVisitCount(),
    getFavoriteCount(),
    getMyMapPinCount(),
  ]);

  if (!profile) {
    return (
      <div className="text-center text-muted-foreground">
        プロフィールの読み込みに失敗しました。
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-8 text-2xl font-bold text-foreground">マイページ</h1>

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">プロフィール</h2>

        <div className="flex items-center gap-4">
          {profile.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt=""
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-medium text-primary">
              {profile.displayName.charAt(0) || "?"}
            </span>
          )}
          <div>
            <p className="font-medium text-foreground">{profile.displayName || "未設定"}</p>
            <p className="text-sm text-muted-foreground">
              登録日: {new Date(profile.createdAt).toLocaleDateString("ja-JP")}
            </p>
          </div>
        </div>

      </section>

      <section className="mt-8 space-y-3">
        {/* アカウント設定 */}
        <Link
          href="/mypage/settings"
          className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition hover:bg-muted"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Settings className="h-5 w-5 text-gray-600" />
            </span>
            <p className="font-medium text-foreground">アカウント設定</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground/70" />
        </Link>

        {/* お気に入り */}
        <Link
          href="/mypage/favorites"
          className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition hover:bg-muted"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            </span>
            <div>
              <p className="font-medium text-foreground">お気に入り</p>
              <p className="text-sm text-muted-foreground">{favoriteCount}件</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground/70" />
        </Link>

        {/* 訪問履歴 */}
        <Link
          href="/mypage/history"
          className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition hover:bg-muted"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
              <Clock className="h-5 w-5 text-blue-500" />
            </span>
            <div>
              <p className="font-medium text-foreground">訪問履歴</p>
              <p className="text-sm text-muted-foreground">{visitCount}件</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground/70" />
        </Link>

        {/* ピン */}
        <Link
          href="/mypage/pins"
          className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition hover:bg-muted"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
              <MapPin className="h-5 w-5 text-green-500" />
            </span>
            <div>
              <p className="font-medium text-foreground">ピン</p>
              <p className="text-sm text-muted-foreground">{pinCount}件</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground/70" />
        </Link>
      </section>

      {/* 訪問統計 */}
      {stats && (
        <section className="mt-8">
          <VisitStatsCard stats={stats} />
        </section>
      )}

    </>
  );
}
