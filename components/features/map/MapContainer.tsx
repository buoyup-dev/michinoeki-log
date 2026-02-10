"use client";

import { useState, useMemo } from "react";
import { MapContainer as LeafletMapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import type { StationMapItem } from "@/types/station";
import type { AreaGroup } from "@/types/station";
import { StationMarkers } from "./StationMarkers";
import { MapFilterPanel } from "./MapFilterPanel";
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
};

const ALL_AREAS: AreaGroup[] = ["道東", "道北", "道央", "道南"];

export default function MapContainerComponent({ stations }: MapContainerProps) {
  const [activeAreas, setActiveAreas] = useState<Set<AreaGroup>>(
    () => new Set(ALL_AREAS)
  );

  const filteredStations = useMemo(
    () => stations.filter((s) => activeAreas.has(s.areaGroup)),
    [stations, activeAreas]
  );

  function handleToggle(area: AreaGroup) {
    setActiveAreas((prev) => {
      const next = new Set(prev);
      if (next.has(area)) {
        if (next.size > 1) next.delete(area);
      } else {
        next.add(area);
      }
      return next;
    });
  }

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
        <StationMarkers stations={filteredStations} />
        <CurrentLocationButton />
      </LeafletMapContainer>
      <MapFilterPanel activeAreas={activeAreas} onToggle={handleToggle} />
    </div>
  );
}
