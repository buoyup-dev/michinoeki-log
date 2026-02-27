import type { Metadata } from "next";
import Link from "next/link";
import { getMyProfile } from "@/lib/db/queries/profiles";
import { ChevronLeft } from "lucide-react";
import { ProfileForm } from "./ProfileForm";
import { DeleteAccountSection } from "./DeleteAccountSection";

export const metadata: Metadata = {
  title: "アカウント設定",
};

export default async function SettingsPage() {
  const profile = await getMyProfile();

  if (!profile) {
    return (
      <div className="text-center text-muted-foreground">
        プロフィールの読み込みに失敗しました。
      </div>
    );
  }

  return (
    <>
      <Link
        href="/mypage"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        マイページに戻る
      </Link>

      <h1 className="mb-8 text-2xl font-bold text-foreground">アカウント設定</h1>

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">プロフィール</h2>
        <ProfileForm displayName={profile.displayName} />
      </section>

      <div className="mt-8">
        <DeleteAccountSection />
      </div>
    </>
  );
}
