"use client";

import Link from "next/link";
import type { StationMapItem } from "@/types/station";

type StationPopupProps = {
  station: StationMapItem;
};

export function StationPopup({ station }: StationPopupProps) {
  return (
    <div className="min-w-[180px]">
      <h3 className="mb-1 text-sm font-semibold">{station.name}</h3>
      <Link
        href={`/stations/${station.id}`}
        className="text-xs text-blue-600 hover:underline"
      >
        詳細を見る →
      </Link>
    </div>
  );
}
