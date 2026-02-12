"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { StationMapItem } from "@/types/station";
import type { StationVisitBadgeRecord } from "@/types/badge";
import { StationPopup } from "./StationPopup";

function createMarkerIcon(color: string): L.DivIcon {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 41" width="25" height="41"><path d="M12.5 0C5.6 0 0 5.6 0 12.5 0 21.9 12.5 41 12.5 41S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/><circle cx="12.5" cy="12.5" r="5" fill="#fff"/></svg>`;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
}

const goldIcon = createMarkerIcon("#EAB308");
const silverIcon = createMarkerIcon("#9CA3AF");
const defaultIcon = createMarkerIcon("#3B82F6");

function getMarkerIcon(stationId: string, visitBadges?: StationVisitBadgeRecord): L.DivIcon {
  const badge = visitBadges?.[stationId];
  if (badge === "gold") return goldIcon;
  if (badge === "silver") return silverIcon;
  return defaultIcon;
}

type StationMarkersProps = {
  stations: StationMapItem[];
  visitBadges?: StationVisitBadgeRecord;
};

export function StationMarkers({ stations, visitBadges }: StationMarkersProps) {
  return (
    <>
      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
          icon={getMarkerIcon(station.id, visitBadges)}
        >
          <Popup>
            <StationPopup station={station} />
          </Popup>
        </Marker>
      ))}
    </>
  );
}
