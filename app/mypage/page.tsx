import type { Metadata } from "next";
import Image from "next/image";
import { getMyProfile } from "@/lib/db/queries/profiles";
import { ProfileForm } from "./ProfileForm";

export const metadata: Metadata = {
  title: "マイページ",
};

export default async function MypagePage() {
  const profile = await getMyProfile();

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
    </>
  );
}
