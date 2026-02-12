"use client";

import { useActionState, useState, useCallback } from "react";
import { recordVisit } from "@/lib/actions/visit";
import type { ActionState } from "@/types/actions";

type GpsState = "idle" | "requesting" | "granted" | "denied" | "unavailable";

type VisitRecorderProps = {
  stationId: string;
  stationName: string;
  hasVisited: boolean;
};

export function VisitRecorder({ stationId, stationName, hasVisited }: VisitRecorderProps) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(recordVisit, null);
  const [gpsState, setGpsState] = useState<GpsState>("idle");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  const requestGps = useCallback(() => {
    if (!navigator.geolocation) {
      setGpsState("unavailable");
      return;
    }

    setGpsState("requesting");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setGpsState("granted");
      },
      () => {
        setGpsState("denied");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

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

      <form action={formAction}>
        <input type="hidden" name="stationId" value={stationId} />
        <input type="hidden" name="latitude" value={coords?.lat ?? ""} />
        <input type="hidden" name="longitude" value={coords?.lon ?? ""} />

        {/* GPS 取得セクション */}
        <div className="mb-4">
          <p className="mb-2 text-sm text-gray-600">
            位置情報を送信すると、1km以内なら
            <span className="font-medium text-yellow-600"> ゴールドバッジ</span>
            が付きます
          </p>

          {gpsState === "idle" && (
            <button
              type="button"
              onClick={requestGps}
              className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              位置情報を取得
            </button>
          )}

          {gpsState === "requesting" && (
            <p className="text-sm text-gray-500">位置情報を取得中...</p>
          )}

          {gpsState === "granted" && (
            <p className="text-sm text-green-600">
              位置情報を取得しました
            </p>
          )}

          {gpsState === "denied" && (
            <p className="text-sm text-amber-600">
              位置情報の取得が拒否されました。GPS なしでも記録できます（シルバーバッジ）
            </p>
          )}

          {gpsState === "unavailable" && (
            <p className="text-sm text-amber-600">
              このブラウザは位置情報に対応していません。GPS なしでも記録できます
            </p>
          )}
        </div>

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

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "記録中..." : `「${stationName}」の訪問を記録`}
        </button>
      </form>
    </div>
  );
}
