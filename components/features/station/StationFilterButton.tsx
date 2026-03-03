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
      className="relative flex shrink-0 items-center justify-center rounded-lg border border-border bg-card p-2.5 transition-colors hover:bg-muted sm:gap-1.5 sm:px-3 sm:py-2.5"
    >
      <SlidersHorizontal className="size-5 sm:size-4" />
      <span className="hidden text-sm font-medium sm:inline">絞り込み</span>
      {activeCount > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white sm:static">
          {activeCount}
        </span>
      )}
    </button>
  );
}
