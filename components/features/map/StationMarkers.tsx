"use client";

import { Marker, Popup } from "react-leaflet";
import type { StationMapItem } from "@/types/station";
import { StationPopup } from "./StationPopup";

type StationMarkersProps = {
  stations: StationMapItem[];
};

export function StationMarkers({ stations }: StationMarkersProps) {
  return (
    <>
      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
        >
          <Popup>
            <StationPopup station={station} />
          </Popup>
        </Marker>
      ))}
    </>
  );
}
