import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUser } from "@/lib/supabase/auth";
import { getMapPinDetail } from "@/lib/db/queries/map-pins";
import { BackButton } from "@/components/ui/BackButton";
import { PinDetailContent } from "@/components/features/map-pin/PinDetailContent";
import { PinPhotoReplacer } from "@/components/features/map-pin/PinPhotoReplacer";

export const metadata: Metadata = {
  title: "ピンの詳細",
};

export default async function PinDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const [pin, user] = await Promise.all([getMapPinDetail(id), getUser()]);

  if (!pin) {
    notFound();
  }

  const isOwn = user?.id === pin.userId;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <BackButton fallbackHref="/mypage/pins" label="戻る" />

      {/* 写真: 自分のピンは差し替え可能、他人のピンは閲覧のみ */}
      {isOwn ? (
        <PinPhotoReplacer pinId={pin.id} photo={pin.photo} />
      ) : pin.photo ? (
        <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-lg">
          <img
            src={pin.photo.photoUrl}
            alt="ピンの写真"
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="mb-6 flex aspect-[16/9] items-center justify-center rounded-lg bg-muted">
          <svg
            className="h-16 w-16 text-muted-foreground/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
            />
          </svg>
        </div>
      )}

      {/* メモ・情報・アクション */}
      <PinDetailContent pin={pin} isOwn={isOwn} />
    </div>
  );
}
