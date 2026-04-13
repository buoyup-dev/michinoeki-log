"use client";

import { useMapEvents } from "react-leaflet";

type PinCreationModeProps = {
  onLocationSelect: (lat: number, lng: number) => void;
};

export function PinCreationMode({ onLocationSelect }: PinCreationModeProps) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return (
    <div className="absolute inset-x-0 top-14 z-[1000] flex justify-center pointer-events-none">
      <div className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md">
        地図をタップして場所を選択
      </div>
    </div>
  );
}
