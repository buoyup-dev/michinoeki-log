"use client";

import { useState, useEffect, useActionState, useRef } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Pencil, Trash2, X } from "lucide-react";
import { MemoTextarea } from "@/components/features/map-pin/MemoTextarea";
import { PinDeleteButton } from "@/components/features/map-pin/PinDeleteButton";
import { fetchMapPinDetail, updateMapPinMemo, toggleMapPinVisibility } from "@/lib/actions/map-pin";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { MapPinDetail } from "@/types/map-pin";
import type { ActionState } from "@/types/actions";

type PinDetailSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pinId: string | null;
  userId?: string;
  onDeleted: () => void;
};

export function PinDetailSheet({
  open,
  onOpenChange,
  pinId,
  userId,
  onDeleted,
}: PinDetailSheetProps) {
  const [pin, setPin] = useState<MapPinDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editMemo, setEditMemo] = useState("");

  const [memoState, memoAction, isSavingMemo] = useActionState<ActionState, FormData>(
    updateMapPinMemo,
    null,
  );

  useEffect(() => {
    if (memoState?.success && pin) {
      // memoStateが成功した場合、最新のeditMemoでpinを更新
      setPin((prev) => prev ? { ...prev, memo: editMemo.trim() || null } : prev);
      setEditing(false);
    }
  }, [memoState, editMemo]); // eslint-disable-line react-hooks/exhaustive-deps

  const [toggleState, toggleAction, isToggling] = useActionState<ActionState, FormData>(
    toggleMapPinVisibility,
    null,
  );

  useEffect(() => {
    if (toggleState?.success) {
      setPin((prev) => prev ? { ...prev, isPublic: !prev.isPublic } : prev);
    }
  }, [toggleState]);

  // シートが開くたびに最新データを再フェッチ（画像変更などの反映のため）
  useEffect(() => {
    if (!pinId || !open) return;

    setPin(null);
    setLoading(true);
    setEditing(false);
    fetchMapPinDetail(pinId).then((detail) => {
      setPin(detail);
      setLoading(false);
    });
  }, [pinId, open]);

  const isOwn = userId != null && pin?.userId === userId;
  const isDesktop = useMediaQuery("(min-width: 640px)");

  // PC サイドパネル（非モーダル）展開中のみ body に data 属性を付与し、
  // pointer-events: auto !important を適用するCSSセレクタを有効にする。
  // Radix AlertDialog 等が開いている間は属性が除去されるため、背面クリック抑止が正常動作する。
  useEffect(() => {
    if (isDesktop && open) {
      document.body.dataset.pinPanelOpen = "true";
    } else {
      delete document.body.dataset.pinPanelOpen;
    }
    return () => {
      delete document.body.dataset.pinPanelOpen;
    };
  }, [open, isDesktop]);

  // PC サイドパネル: 外部クリック検知（短押しのみ。ドラッグ操作では閉じない）
  const deleteDialogOpenRef = useRef(false);
  deleteDialogOpenRef.current = deleteDialogOpen;
  const panelRef = useRef<HTMLDivElement>(null);
  const mouseDownTimeRef = useRef<number>(0);
  const mouseDownPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDesktop || !open) return;

    const handleMouseDown = (e: MouseEvent) => {
      // パネル内でのマウスダウンは記録しない（パネル内→外ドラッグで誤閉じしないよう）
      if (panelRef.current?.contains(e.target as Node)) return;
      mouseDownTimeRef.current = Date.now();
      mouseDownPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = (e: MouseEvent) => {
      // パネル内のクリックは無視
      if (panelRef.current?.contains(e.target as Node)) return;

      // AlertDialog（削除確認）が開いている場合は無視
      if (deleteDialogOpenRef.current) return;

      const elapsed = Date.now() - mouseDownTimeRef.current;
      const dx = Math.abs(e.clientX - mouseDownPosRef.current.x);
      const dy = Math.abs(e.clientY - mouseDownPosRef.current.y);

      // 200ms未満かつ移動距離5px未満 → 短押しクリックと判定
      if (elapsed < 200 && dx < 5 && dy < 5) {
        onOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDesktop, open, onOpenChange]);

  // PC: 独自サイドパネル / モバイル: Radix Sheet（ボトムシート）
  const panelContent = (
    <>
      {/* ヘッダー */}
      <div className="flex flex-row items-center justify-between p-4">
        <div>
          <h2 className="text-foreground font-semibold">ピンの詳細</h2>
        </div>
        <button
          onClick={() => onOpenChange(false)}
          className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="閉じる"
        >
          <X className="size-5" />
        </button>
      </div>

        {/* コンテンツ — 2カラムレイアウト */}
        <div className="overflow-y-auto px-4 py-2">
          {loading ? (
            <div className="flex h-20 items-center justify-center">
              <span className="text-sm text-muted-foreground">読み込み中...</span>
            </div>
          ) : pin ? (
            <div className={
              isDesktop
                ? "flex flex-col gap-3"
                : "flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4"
            }>
              {/* 写真 */}
              {pin.photo && (
                <div className={`aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted ${
                  isDesktop ? "" : "sm:w-[420px] sm:shrink-0"
                }`}>
                  <img
                    src={pin.photo.photoUrl}
                    alt="ピンの写真"
                    className="h-full w-full object-contain"
                  />
                </div>
              )}

              {/* 右: メモ・日時・公開設定 */}
              <div className="flex flex-1 flex-col justify-between pt-1">
                <div className="space-y-3">
                  {editing ? (
                    <form action={memoAction}>
                      <input type="hidden" name="pinId" value={pin.id} />
                      <MemoTextarea name="memo" value={editMemo} onChange={setEditMemo} rows={9} />
                      <div className="mt-1">
                        <button
                          type="submit"
                          disabled={isSavingMemo || editMemo.length > 200}
                          className="h-[26px] min-w-[86px] rounded-md bg-primary px-3 text-xs text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                        >
                          {isSavingMemo ? "更新中..." : "更新"}
                        </button>
                      </div>
                      {memoState?.success === false && (
                        <p className="mt-1 text-xs text-red-500">{memoState.error.message}</p>
                      )}
                    </form>
                  ) : (
                    <div>
                      {pin.memo ? (
                        <div className="min-h-[80px] sm:min-h-[180px] rounded-lg border border-input bg-background px-3 py-2">
                          <p className="whitespace-pre-wrap text-sm">{pin.memo}</p>
                        </div>
                      ) : isOwn ? (
                        <div className="min-h-[80px] sm:min-h-[180px] rounded-lg border border-input bg-background px-3 py-2">
                          <p className="text-sm text-muted-foreground">メモなし</p>
                        </div>
                      ) : null}
                      {isOwn && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditMemo(pin.memo || "");
                            setEditing(true);
                          }}
                          className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="size-3" />
                          編集
                        </button>
                      )}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    登録日：{new Date(pin.createdAt).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {isOwn && (
                  <div className="pt-2">
                    <form action={toggleAction}>
                      <input type="hidden" name="pinId" value={pin.id} />
                      <input type="hidden" name="isPublic" value={String(!pin.isPublic)} />
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-sm font-medium">公開する</span>
                        <button
                          type="submit"
                          disabled={isToggling}
                          role="switch"
                          aria-checked={pin.isPublic}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            pin.isPublic ? "bg-blue-500" : "bg-muted"
                          }`}
                        >
                          <span
                            className={`inline-block size-4 rounded-full bg-white transition-transform ${
                              pin.isPublic ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </form>
                    {toggleState?.success === false && (
                      <p className="mt-1 text-xs text-red-500">{toggleState.error.message}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-20 items-center justify-center">
              <span className="text-sm text-muted-foreground">ピンが見つかりません</span>
            </div>
          )}
        </div>

      {/* フッター */}
      <div className="border-t border-border px-4 py-3">
        {isOwn && (
          <div className="mb-2 text-center">
            <Link
              href={pinId ? `/pins/${pinId}` : "/mypage/pins"}
              className="text-xs text-primary hover:underline"
            >
              詳細ページを見る →
            </Link>
          </div>
        )}
        <div className="mx-auto flex max-w-md gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-lg border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
          >
            閉じる
          </button>
          {isOwn && pin && (
            <PinDeleteButton
              key={pin.id}
              pinId={pin.id}
              onDeleted={() => {
                onDeleted();
                onOpenChange(false);
              }}
              onOpenChange={setDeleteDialogOpen}
            >
              <button
                type="button"
                className="flex-1 rounded-lg border border-red-300 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
              >
                <Trash2 className="mr-1.5 inline-block size-4" />
                削除
              </button>
            </PinDeleteButton>
          )}
        </div>
      </div>
    </>
  );

  // PC: 独自サイドパネル（Radixを使わない → 再マウントなし）
  if (isDesktop) {
    return (
      <div
        ref={panelRef}
        className={`fixed left-0 top-16 z-[1100] flex h-[calc(100%-64px)] w-[400px] max-w-[400px] flex-col gap-0 border-r bg-background shadow-lg transition-transform duration-300 ease-in-out pointer-events-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {panelContent}
      </div>
    );
  }

  // モバイル: Radix Sheet（ボトムシート）
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="flex max-h-[85vh] flex-col gap-0 rounded-t-2xl"
      >
        <SheetTitle className="sr-only">ピンの詳細</SheetTitle>
        <SheetDescription className="sr-only">ピンの写真・メモ・設定を表示します</SheetDescription>
        {panelContent}
      </SheetContent>
    </Sheet>
  );
}
