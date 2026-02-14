"use client";

import { useActionState, useState, useRef } from "react";
import { recordVisit } from "@/lib/actions/visit";
import type { ActionState } from "@/types/actions";

type VisitRecorderProps = {
  stationId: string;
  stationName: string;
  hasVisited: boolean;
};

export function VisitRecorder({ stationId, stationName, hasVisited }: VisitRecorderProps) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(recordVisit, null);
  const [isGettingGps, setIsGettingGps] = useState(false);
  const [gpsMessage, setGpsMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const lonRef = useRef<HTMLInputElement>(null);

  const isProcessing = isGettingGps || isPending;

  // ボタンクリック → GPS取得 → フォーム送信
  const handleClick = async () => {
    setGpsMessage(null);

    if (navigator.geolocation) {
      setIsGettingGps(true);
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 5000,
            });
          },
        );
        if (latRef.current)
          latRef.current.value = String(position.coords.latitude);
        if (lonRef.current)
          lonRef.current.value = String(position.coords.longitude);
      } catch (error) {
        if (error instanceof GeolocationPositionError) {
          if (error.code === error.PERMISSION_DENIED) {
            setGpsMessage("位置情報が拒否されました。シルバーバッジとして記録します。");
          } else if (error.code === error.TIMEOUT) {
            setGpsMessage("位置情報の取得がタイムアウトしました。シルバーバッジとして記録します。");
          } else {
            setGpsMessage("位置情報を取得できませんでした。シルバーバッジとして記録します。");
          }
        }
      }
    }

    // GPS取得後にフォームを送信（action={formAction} 経由で useActionState が管理）
    // requestSubmit() の後に isGettingGps を解除し、ボタンの一瞬有効化を防ぐ
    formRef.current?.requestSubmit();
    setIsGettingGps(false);
  };

  const buttonLabel = isGettingGps
    ? "位置情報を取得中..."
    : isPending
      ? "記録中..."
      : `「${stationName}」の訪問を記録`;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        {hasVisited ? "再訪問を記録" : "訪問した！"}
      </h2>

      {/* エラー表示 */}
      {state?.success === false && (
        <div role="alert" className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {state.error.message}
        </div>
      )}

      <form ref={formRef} action={formAction}>
        <input type="hidden" name="stationId" value={stationId} />
        <input type="hidden" name="latitude" ref={latRef} defaultValue="" />
        <input type="hidden" name="longitude" ref={lonRef} defaultValue="" />

        {/* GPS 説明 */}
        <p className="mb-4 text-sm text-gray-600">
          記録時に位置情報を自動取得します。1km以内なら
          <span className="font-medium text-yellow-600"> ゴールドバッジ</span>
          、それ以外は
          <span className="font-medium text-gray-500"> シルバーバッジ</span>
          になります
        </p>

        {/* GPS エラー通知 */}
        {gpsMessage && (
          <div role="status" aria-live="polite" className="mb-4 rounded-md bg-yellow-50 p-3 text-sm text-yellow-700">
            {gpsMessage}
          </div>
        )}

        {/* メモ入力 */}
        <div className="mb-4">
          <label htmlFor="visit-memo" className="mb-1 block text-sm font-medium text-gray-700">
            メモ（任意）
          </label>
          <textarea
            id="visit-memo"
            name="memo"
            rows={3}
            maxLength={500}
            placeholder="訪問の感想やメモを残せます"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-invalid={state?.success === false && state.error.fieldErrors?.memo ? "true" : undefined}
            aria-describedby={state?.success === false && state.error.fieldErrors?.memo ? "memo-error" : undefined}
          />
          {state?.success === false && state.error.fieldErrors?.memo && (
            <p id="memo-error" className="mt-1 text-sm text-red-600">
              {state.error.fieldErrors.memo[0]}
            </p>
          )}
        </div>

        {/* 送信ボタン（type="button" で onClick → GPS取得 → requestSubmit） */}
        <button
          type="button"
          onClick={handleClick}
          disabled={isProcessing}
          className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {buttonLabel}
        </button>
      </form>
    </div>
  );
}
