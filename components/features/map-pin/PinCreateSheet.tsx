"use client";

import { useState, useEffect, useActionState, useRef } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ImagePlus, X } from "lucide-react";
import { MemoTextarea } from "@/components/features/map-pin/MemoTextarea";
import { createClient } from "@/lib/supabase/client";
import { createMapPin } from "@/lib/actions/map-pin";
import { validateImageFile, resizeForDisplay, resizeForThumbnail } from "@/lib/utils/image-resize";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { MapPinMarker } from "@/types/map-pin";
import type { ActionState } from "@/types/actions";

type PinCreateSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  latitude: number;
  longitude: number;
  onCreated: (pin: MapPinMarker) => void;
};

export function PinCreateSheet({
  open,
  onOpenChange,
  latitude,
  longitude,
  onCreated,
}: PinCreateSheetProps) {
  const [state, formAction, isPending] = useActionState(createMapPin, null);

  useEffect(() => {
    if (state?.success && state.data) {
      onCreated(state.data as MapPinMarker);
      onOpenChange(false);
    }
  }, [state, onCreated, onOpenChange]);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [memo, setMemo] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function resetForm() {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setImageError(null);
    setPhotoUrl("");
    setThumbnailUrl("");
    setMemo("");
    setIsPublic(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // アップロード済みだが未保存の画像をStorageから削除する（fire-and-forget）
  function cleanupStorage() {
    if (!photoUrl && !thumbnailUrl) return;
    const supabase = createClient();
    const paths = [photoUrl, thumbnailUrl]
      .map((url) => {
        if (!url) return null;
        const match = url.match(/\/map-pin-photos\/(.+)$/);
        return match ? match[1] : null;
      })
      .filter((p): p is string => p !== null);
    if (paths.length > 0) {
      supabase.storage.from("map-pin-photos").remove(paths).catch((err) => {
        console.error("Storage cleanup error:", err);
      });
    }
  }

  function handleClose() {
    cleanupStorage();
    resetForm();
    onOpenChange(false);
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImageFile(file);
    if (error) {
      setImageError(error);
      return;
    }

    setImageError(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
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
        supabase.storage.from("map-pin-photos").upload(displayPath, displayBlob, {
          contentType: "image/jpeg",
        }),
        supabase.storage.from("map-pin-photos").upload(thumbPath, thumbBlob, {
          contentType: "image/jpeg",
        }),
      ]);

      if (displayResult.error) throw displayResult.error;
      if (thumbResult.error) throw thumbResult.error;

      const { data: displayUrlData } = supabase.storage
        .from("map-pin-photos")
        .getPublicUrl(displayPath);
      const { data: thumbUrlData } = supabase.storage
        .from("map-pin-photos")
        .getPublicUrl(thumbPath);

      setPhotoUrl(displayUrlData.publicUrl);
      setThumbnailUrl(thumbUrlData.publicUrl);
    } catch (err) {
      console.error("Image upload error:", err);
      setImageError("画像のアップロードに失敗しました");
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  }

  const canSubmit = photoUrl && thumbnailUrl && !uploading && !isPending && memo.length <= 200;
  const isDesktop = useMediaQuery("(min-width: 640px)");

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          cleanupStorage();
          resetForm();
        }
        onOpenChange(v);
      }}
      modal={!isDesktop ? true : false}
    >
      <SheetContent
        side={isDesktop ? "left" : "bottom"}
        showCloseButton={false}
        showOverlay={!isDesktop}
        className={
          isDesktop
            ? "top-16 flex h-[calc(100%-64px)] w-[400px] max-w-[400px] flex-col gap-0 pointer-events-auto"
            : "flex max-h-[85vh] flex-col gap-0 rounded-t-2xl"
        }
      >
        {/* ヘッダー — 絞り込みSheetと統一 */}
        <SheetHeader className="flex-row items-center justify-between">
          <div>
            <SheetTitle>ピンを作成</SheetTitle>
            <SheetDescription className="sr-only">写真とメモを添えてマップピンを作成します</SheetDescription>
          </div>
          <button
            onClick={handleClose}
            disabled={uploading}
            className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors disabled:opacity-50"
            aria-label="閉じる"
          >
            <X className="size-5" />
          </button>
        </SheetHeader>

        {/* コンテンツ — 絞り込みSheetと同じ構造 */}
        <form action={formAction}>
          <input type="hidden" name="latitude" value={latitude} />
          <input type="hidden" name="longitude" value={longitude} />
          <input type="hidden" name="photoUrl" value={photoUrl} />
          <input type="hidden" name="thumbnailUrl" value={thumbnailUrl} />
          <input type="hidden" name="isPublic" value={String(isPublic)} />

          <div className="flex-1 overflow-y-auto px-4 py-2">
            <div className={
              isDesktop
                ? "flex flex-col gap-3"
                : "flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4"
            }>
              {/* 写真 */}
              <div className={
                isDesktop
                  ? "w-full"
                  : "w-full sm:w-[420px] sm:shrink-0"
              }>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {imagePreview ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted"
                  >
                    <img
                      src={imagePreview}
                      alt="プレビュー"
                      className="h-full w-full object-contain"
                    />
                    {uploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="text-xs text-white">アップロード中...</span>
                      </div>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex aspect-[16/9] w-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 transition-colors hover:border-muted-foreground/50"
                  >
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                      <ImagePlus className="size-6" />
                      <span className="text-xs">写真を選択</span>
                    </div>
                  </button>
                )}
                {imageError && (
                  <p className="mt-1 text-xs text-red-500">{imageError}</p>
                )}
              </div>

              {/* 右: メモ・公開設定 */}
              <div className="flex flex-1 flex-col justify-between pt-1">
                <MemoTextarea name="memo" value={memo} onChange={setMemo} rows={9} />

                {state?.success === false && (
                  <p className="text-xs text-red-500" role="alert">{state.error.message}</p>
                )}

                <div className="flex items-center gap-2 justify-end pt-2">
                  <span className="text-sm font-medium">公開する</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isPublic}
                    onClick={() => setIsPublic(!isPublic)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isPublic ? "bg-blue-500" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block size-4 rounded-full bg-white transition-transform ${
                        isPublic ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* フッター */}
          <div className="border-t border-border px-4 py-3">
            <div className="mb-2 text-center">
              <Link
                href="/mypage/pins"
                className="text-xs text-primary hover:underline"
              >
                ピン一覧を見る →
              </Link>
            </div>
            <div className="mx-auto flex max-w-md gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={uploading}
                className="flex-1 rounded-lg border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {isPending ? "保存中..." : "保存"}
              </button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
