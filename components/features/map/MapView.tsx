"use client";

import dynamic from "next/dynamic";
import type { StationMapItem } from "@/types/station";

const MapContainer = dynamic(() => import("./MapContainer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-100">
      <p className="text-sm text-gray-500">地図を読み込み中...</p>
    </div>
  ),
});

type MapViewProps = {
  stations: StationMapItem[];
};

export function MapView({ stations }: MapViewProps) {
  return <MapContainer stations={stations} />;
}
