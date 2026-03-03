"use client";

import { useState, useMemo, useCallback } from "react";
import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import type { StationMapItem } from "@/types/station";
import type { StationVisitBadgeRecord } from "@/types/badge";
import type { StationFilters } from "@/types/station-filter";
import { createDefaultFilters, countActiveFilters, matchesStationFilters } from "@/types/station-filter";
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
  const [sheetMounted, setSheetMounted] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const isLoggedIn = visitBadges !== undefined;

  const filteredStations = useMemo(() => {
    return stations.filter((s) => matchesStationFilters(s, filters, visitBadges));
  }, [stations, filters, visitBadges]);

  const activeCount = useMemo(() => countActiveFilters(filters), [filters]);

  const handleOpenSheet = useCallback(() => {
    setSheetMounted(true);
    setSheetOpen(true);
  }, []);
  const handleAutoLocateComplete = useCallback(() => setMapReady(true), []);

  return (
    <div className="relative h-full w-full">
      <LeafletMapContainer
        center={[43.0, 143.0]}
        zoom={7}
        minZoom={7}
        maxBounds={[
          [40.5, 138.0],  // 南西（余裕を持たせて函館方面もカバー）
          [46.5, 147.5],  // 北東（余裕を持たせて根室方面もカバー）
        ]}
        maxBoundsViscosity={1.0}
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <StationMarkers stations={filteredStations} visitBadges={visitBadges} />
        <CurrentLocationButton onAutoLocateComplete={handleAutoLocateComplete} />
      </LeafletMapContainer>
      {!mapReady && (
        <div className="absolute inset-0 z-[1001] bg-background" />
      )}
      <MapFilterButton activeCount={activeCount} onClick={handleOpenSheet} />
      {sheetMounted && (
        <StationFilterSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          filters={filters}
          onFiltersChange={setFilters}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
}
