"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, MapPin, Phone, Globe } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { fetchSpotDetail } from "@/lib/actions/spots";
import { SPOT_CATEGORY_CONFIG } from "@/lib/constants/spot-category";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { SpotDetail } from "@/types/spot";

type SpotDetailSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  spotId: string | null;
};

export function SpotDetailSheet({ open, onOpenChange, spotId }: SpotDetailSheetProps) {
  const [spot, setSpot] = useState<SpotDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  // シートが開くたびに最新データをフェッチ
  // spotId が素早く切り替わった場合に古いレスポンスで上書きしないようキャンセルフラグを使う
  useEffect(() => {
    if (!spotId || !open) return;
    let cancelled = false;
    setSpot(null);
    setLoading(true);
    fetchSpotDetail(spotId).then((detail) => {
      if (!cancelled) {
        setSpot(detail);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [spotId, open]);

  // PC サイドパネル展開中のみ body に data 属性を付与（PinDetailSheet と同じパターン）
  useEffect(() => {
    if (isDesktop && open) {
      document.body.dataset.spotPanelOpen = "true";
    } else {
      delete document.body.dataset.spotPanelOpen;
    }
    return () => {
      delete document.body.dataset.spotPanelOpen;
    };
  }, [open, isDesktop]);

  // PC サイドパネル: 外部クリック検知（短押しのみ。ドラッグ操作では閉じない）
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
      if (panelRef.current?.contains(e.target as Node)) return;
      const elapsed = Date.now() - mouseDownTimeRef.current;
      const dx = Math.abs(e.clientX - mouseDownPosRef.current.x);
      const dy = Math.abs(e.clientY - mouseDownPosRef.current.y);
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

  const config = spot ? SPOT_CATEGORY_CONFIG[spot.category] : null;

  const panelContent = (
    <>
      {/* ヘッダー */}
      <div className="flex flex-row items-start justify-between p-4">
        <div className="flex flex-col gap-1">
          {config && (
            <span
              className="inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
              style={{ backgroundColor: config.color }}
            >
              {config.label}
            </span>
          )}
          <h2 className="font-semibold text-foreground">
            {spot?.name ?? "スポットの詳細"}
          </h2>
        </div>
        <button
          onClick={() => onOpenChange(false)}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="閉じる"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* コンテンツ */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {loading ? (
          <div className="flex h-20 items-center justify-center">
            <span className="text-sm text-muted-foreground">読み込み中...</span>
          </div>
        ) : spot ? (
          <div className="flex flex-col gap-4">
            {/* 写真 */}
            {spot.imageUrl ? (
              <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
                <img
                  src={spot.imageUrl}
                  alt={spot.name}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="flex aspect-[16/9] items-center justify-center rounded-lg bg-muted">
                <svg
                  className="h-12 w-12 text-muted-foreground/50"
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

            {/* 説明文 */}
            {spot.description && (
              <p className="text-sm leading-relaxed text-foreground">
                {spot.description}
              </p>
            )}

            {/* 情報行 */}
            <div className="space-y-2.5">
              {spot.address && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm text-foreground">{spot.address}</span>
                </div>
              )}
              {spot.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="size-4 shrink-0 text-muted-foreground" />
                  <a
                    href={`tel:${spot.phone}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {spot.phone}
                  </a>
                </div>
              )}
              {/* DB の CHECK 制約と二重になるが、外部 URL を <a href> に渡す直前の防御的チェックとして残す */}
              {spot.websiteUrl && /^https?:\/\//.test(spot.websiteUrl) && (
                <div className="flex items-center gap-2.5">
                  <Globe className="size-4 shrink-0 text-muted-foreground" />
                  <a
                    href={spot.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    公式サイト
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-20 items-center justify-center">
            <span className="text-sm text-muted-foreground">
              スポットが見つかりません
            </span>
          </div>
        )}
      </div>

      {/* フッター */}
      <div className="border-t border-border px-4 py-3">
        {spot && (
          <div className="mb-2 text-center">
            <Link href={`/spots/${spot.id}`} className="text-xs text-primary hover:underline">
              詳細を見る →
            </Link>
          </div>
        )}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="w-full rounded-lg border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
        >
          閉じる
        </button>
      </div>
    </>
  );

  // PC: 独自サイドパネル（PinDetailSheet と同じ構造）
  // pointer-events-auto: 親要素の pointer-events: none を上書きしパネル内の操作を有効にする
  if (isDesktop) {
    return (
      <div
        ref={panelRef}
        className={`pointer-events-auto fixed left-0 top-16 z-[1100] flex h-[calc(100%-64px)] w-[400px] max-w-[400px] flex-col gap-0 border-r bg-background shadow-lg transition-transform duration-300 ease-in-out ${
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
        <SheetTitle className="sr-only">スポットの詳細</SheetTitle>
        <SheetDescription className="sr-only">
          スポットの写真・説明・アクセス情報を表示します
        </SheetDescription>
        {panelContent}
      </SheetContent>
    </Sheet>
  );
}
