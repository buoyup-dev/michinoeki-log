"use client";

import { useActionState, useOptimistic, useState, useEffect } from "react";
import { toggleFavorite } from "@/lib/actions/favorite";
import type { ActionState } from "@/types/actions";

type FavoriteButtonProps = {
  stationId: string;
  initialFavorited: boolean;
};

export function FavoriteButton({ stationId, initialFavorited }: FavoriteButtonProps) {
  const [state, formAction, isPending] = useActionState<
    ActionState<{ isFavorited: boolean }>,
    FormData
  >(toggleFavorite, null);

  // 最後にサーバーで確定した状態を追跡（エラー時のロールバック用）
  const [lastConfirmed, setLastConfirmed] = useState(initialFavorited);
  useEffect(() => {
    if (state?.success) {
      setLastConfirmed(state.data.isFavorited);
    }
  }, [state]);

  // 成功時はサーバー値、エラー時は最後の確定値にロールバック
  const serverFavorited = state?.success ? state.data.isFavorited : lastConfirmed;
  const [optimisticFavorited, setOptimisticFavorited] = useOptimistic(serverFavorited);

  return (
    <form
      action={(formData) => {
        setOptimisticFavorited(!optimisticFavorited);
        formAction(formData);
      }}
    >
      <input type="hidden" name="stationId" value={stationId} />
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={optimisticFavorited ? "お気に入りから削除" : "お気に入りに追加"}
      >
        {optimisticFavorited ? (
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        ) : (
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        )}
        <span>{optimisticFavorited ? "お気に入り済み" : "お気に入り"}</span>
      </button>
    </form>
  );
}
