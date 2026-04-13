"use client";

import dynamic from "next/dynamic";
import type { StationMapItem } from "@/types/station";
import type { StationVisitBadgeRecord } from "@/types/badge";
import type { MapPinMarker } from "@/types/map-pin";

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
  mapPins: MapPinMarker[];
  userId?: string;
  initialPinId?: string;
};

export function MapView({ stations, visitBadges, mapPins, userId, initialPinId }: MapViewProps) {
  return <MapContainer stations={stations} visitBadges={visitBadges} mapPins={mapPins} userId={userId} initialPinId={initialPinId} />;
}
