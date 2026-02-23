"use client";

import { SlidersHorizontal } from "lucide-react";

type MapFilterButtonProps = {
  activeCount: number;
  onClick: () => void;
};

export function MapFilterButton({ activeCount, onClick }: MapFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`絞り込み${activeCount > 0 ? `（${activeCount}件適用中）` : ""}`}
      className="absolute right-3 top-3 z-[1000] flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-2 text-sm font-medium shadow-md backdrop-blur-sm transition-colors hover:bg-white"
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
