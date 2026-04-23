import { useState } from "react";
import { useMapEvents } from "react-leaflet";

/** ズームレベルに応じたピン幅（3段階）。PinMarkers / SpotMarkers で共用 */
export function getPinSize(zoom: number): number {
  if (zoom >= 13) return 48;
  if (zoom >= 10) return 36;
  return 30;
}

/**
 * 地図のズームレベルを監視してピンサイズを返すフック。
 * Leaflet の MapContainer 内でのみ使用可能。
 */
export function usePinSize(): number {
  // 初期値は MapContainer の INITIAL_ZOOM=7 と一致させる（zoom 7 → 30px）
  const [pinSize, setPinSize] = useState(() => getPinSize(7));

  useMapEvents({
    zoomend(e) {
      const next = getPinSize(e.target.getZoom());
      setPinSize((prev) => (prev !== next ? next : prev));
    },
    load(e) {
      const next = getPinSize(e.target.getZoom());
      setPinSize((prev) => (prev !== next ? next : prev));
    },
  });

  return pinSize;
}
