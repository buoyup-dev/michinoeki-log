"use client";

import { useState, useMemo, useCallback } from "react";
import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import type { StationMapItem } from "@/types/station";
import type { StationVisitBadgeRecord } from "@/types/badge";
import type { StationFilters } from "@/types/station-filter";
import { createDefaultFilters, countActiveFilters } from "@/types/station-filter";
import { StationMarkers } from "./StationMarkers";
import { MapFilterButton } from "./MapFilterButton";
import { StationFilterSheet } from "@/components/features/station/StationFilterSheet";
import { CurrentLocationButton } from "./CurrentLocationButton";

import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icon path broken by bundlers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

type MapContainerProps = {
  stations: StationMapItem[];
  visitBadges?: StationVisitBadgeRecord;
};

export default function MapContainerComponent({ stations, visitBadges }: MapContainerProps) {
  const [filters, setFilters] = useState<StationFilters>(createDefaultFilters);
  const [sheetOpen, setSheetOpen] = useState(false);

  const isLoggedIn = visitBadges !== undefined;

  const filteredStations = useMemo(() => {
    return stations.filter((s) => {
      // 1. エリアフィルタ
      if (!filters.areas.has(s.areaGroup)) return false;

      // 2. 訪問状況フィルタ（ログイン時のみ適用）
      if (isLoggedIn && filters.visitFilter !== "all") {
        const hasVisit = s.id in visitBadges;
        if (filters.visitFilter === "visited" && !hasVisit) return false;
        if (filters.visitFilter === "unvisited" && hasVisit) return false;
      }

      // 3. 施設フィルタ（AND条件）
      if (filters.facilities.size > 0) {
        for (const key of filters.facilities) {
          if (!s.facilities[key]) return false;
        }
      }

      return true;
    });
  }, [stations, filters, isLoggedIn, visitBadges]);

  const activeCount = useMemo(() => countActiveFilters(filters), [filters]);

  const handleOpenSheet = useCallback(() => setSheetOpen(true), []);

  return (
    <div className="relative h-full w-full">
      <LeafletMapContainer
        center={[43.0, 143.0]}
        zoom={7}
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <StationMarkers stations={filteredStations} visitBadges={visitBadges} />
        <CurrentLocationButton />
      </LeafletMapContainer>
      <MapFilterButton activeCount={activeCount} onClick={handleOpenSheet} />
      <StationFilterSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        filters={filters}
        onFiltersChange={setFilters}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
