"use client";

import { SlidersHorizontal } from "lucide-react";

type StationFilterButtonProps = {
  activeCount: number;
  onClick: () => void;
};

export function StationFilterButton({ activeCount, onClick }: StationFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`絞り込み${activeCount > 0 ? `（${activeCount}件適用中）` : ""}`}
      className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
    >
      <SlidersHorizontal className="size-4" />
      絞り込み
      {activeCount > 0 && (
        <span className="flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {activeCount}
        </span>
      )}
    </button>
  );
}
