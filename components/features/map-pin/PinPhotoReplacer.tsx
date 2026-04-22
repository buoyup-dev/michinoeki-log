"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import { ImagePlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { updateMapPinPhoto } from "@/lib/actions/map-pin";
import { validateImageFile, resizeForDisplay, resizeForThumbnail } from "@/lib/utils/image-resize";
import type { MapPinPhoto } from "@/types/map-pin";
import type { ActionState } from "@/types/actions";

type PinPhotoReplacerProps = {
  pinId: string;
  photo: MapPinPhoto | null;
};

export function PinPhotoReplacer({ pinId, photo: initialPhoto }: PinPhotoReplacerProps) {
  const [photo, setPhoto] = useState(initialPhoto);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // アップロード済みだが未保存のURLを追跡（クリーンアップ用）
  const uploadedRef = useRef({ photoUrl: "", thumbnailUrl: "" });

  function cleanupStorage() {
    const { photoUrl: pUrl, thumbnailUrl: tUrl } = uploadedRef.current;
    if (!pUrl && !tUrl) return;
    const supabase = createClient();
    const paths = [pUrl, tUrl]
      .map((url) => { const match = url.match(/\/map-pin-photos\/(.+)$/); return match ? match[1] : null; })
      .filter((p): p is string => p !== null);
    if (paths.length > 0) {
      supabase.storage.from("map-pin-photos").remove(paths).catch((err) => console.error("Storage cleanup error:", err));
    }
    uploadedRef.current = { photoUrl: "", thumbnailUrl: "" };
  }

  // アンマウント時に未保存のアップロード済みファイルを削除
  useEffect(() => {
    return () => { cleanupStorage(); };
  }, []);

  const [state, formAction, isPending] = useActionState(updateMapPinPhoto, null as ActionState);

  useEffect(() => {
    if (state?.success) {
      // 更新成功: プレビューをクリアし、新しいURLを表示に反映
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
      setPhoto((prev) =>
        prev
          ? { ...prev, photoUrl, thumbnailUrl }
          : { id: "", pinId, photoUrl, thumbnailUrl, sortOrder: 0, createdAt: new Date().toISOString() },
      );
      setPhotoUrl("");
      setThumbnailUrl("");
      uploadedRef.current = { photoUrl: "", thumbnailUrl: "" }; // 保存済みのためクリア
    }
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // 再選択時: 前回アップロード済みの未保存ファイルを削除
    cleanupStorage();

    const error = validateImageFile(file);
    if (error) {
      setImageError(error);
      return;
    }

    setImageError(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const [displayBlob, thumbBlob] = await Promise.all([
        resizeForDisplay(file),
        resizeForThumbnail(file),
      ]);

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("ログインが必要です");

      const timestamp = Date.now();
      const displayPath = `${user.id}/${timestamp}_display.jpg`;
      const thumbPath = `${user.id}/${timestamp}_thumb.jpg`;

      const [displayResult, thumbResult] = await Promise.all([
        supabase.storage.from("map-pin-photos").upload(displayPath, displayBlob, { contentType: "image/jpeg" }),
        supabase.storage.from("map-pin-photos").upload(thumbPath, thumbBlob, { contentType: "image/jpeg" }),
      ]);

      if (displayResult.error) throw displayResult.error;
      if (thumbResult.error) throw thumbResult.error;

      const { data: displayUrlData } = supabase.storage.from("map-pin-photos").getPublicUrl(displayPath);
      const { data: thumbUrlData } = supabase.storage.from("map-pin-photos").getPublicUrl(thumbPath);

      setPhotoUrl(displayUrlData.publicUrl);
      setThumbnailUrl(thumbUrlData.publicUrl);
      uploadedRef.current = { photoUrl: displayUrlData.publicUrl, thumbnailUrl: thumbUrlData.publicUrl };
    } catch (err) {
      console.error("Image upload error:", err);
      setImageError("画像のアップロードに失敗しました");
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  }

  const displayUrl = imagePreview || photo?.photoUrl;
  const canSave = photoUrl && thumbnailUrl && !uploading && !isPending;

  return (
    <div className="relative mb-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* 画像表示エリア（クリックで差し替え） */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="group relative block aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted"
      >
        {displayUrl ? (
          <img
            src={displayUrl}
            alt="ピンの写真"
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <ImagePlus className="size-8" />
              <span className="text-sm">写真を選択</span>
            </div>
          </div>
        )}

        {/* ホバー時のオーバーレイ */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
          <span className="text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            <ImagePlus className="mx-auto mb-1 size-6" />
            写真を変更
          </span>
        </div>

        {/* アップロード中オーバーレイ */}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="text-sm text-white">アップロード中...</span>
          </div>
        )}
      </button>

      {imageError && (
        <p className="mt-1 text-xs text-red-500">{imageError}</p>
      )}

      {/* アップロード完了後の保存ボタン */}
      {photoUrl && (
        <form action={formAction} className="mt-2">
          <input type="hidden" name="pinId" value={pinId} />
          <input type="hidden" name="photoUrl" value={photoUrl} />
          <input type="hidden" name="thumbnailUrl" value={thumbnailUrl} />
          <button
            type="submit"
            disabled={!canSave}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isPending ? "保存中..." : "写真を保存"}
          </button>
        </form>
      )}

      {state?.success === false && (
        <p className="mt-1 text-xs text-red-500">{state.error.message}</p>
      )}
    </div>
  );
}
