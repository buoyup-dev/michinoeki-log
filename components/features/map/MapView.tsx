"use client";

import dynamic from "next/dynamic";
import type { StationMapItem } from "@/types/station";
import type { StationVisitBadgeRecord } from "@/types/badge";

const MapContainer = dynamic(() => import("./MapContainer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted">
      <p className="text-sm text-muted-foreground">地図を読み込み中...</p>
    </div>
  ),
});

type MapViewProps = {
  stations: StationMapItem[];
  visitBadges?: StationVisitBadgeRecord;
};

export function MapView({ stations, visitBadges }: MapViewProps) {
  return <MapContainer stations={stations} visitBadges={visitBadges} />;
}
