"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { MapPinMarker } from "@/types/map-pin";

/** ズームレベルに応じたピン幅（3段階） */
function getPinSize(zoom: number): number {
  if (zoom >= 13) return 48;  // 詳細
  if (zoom >= 10) return 36;  // 中域
  return 30;                   // 広域
}

/** しずく型SVGピンアイコン（foreignObjectで円形写真を埋め込み） */
function createPinIcon(thumbnailUrl: string, isOwn: boolean, size: number): L.DivIcon {
  const borderColor = isOwn ? "#3b82f6" : "#6b7280";
  const bw = size >= 48 ? 2.5 : 2;
  const w = size;
  const h = Math.round(size * 1.3);
  const cx = w / 2;
  const scaledBw = bw * (40 / w);
  // ストローク幅分のパディングを追加してSVGの見切れを防止
  const pad = Math.ceil(scaledBw);
  const vbW = 40 + pad * 2;
  const vbH = 52 + pad * 2;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w + bw * 2}" height="${h + bw * 2}" viewBox="${-pad} ${-pad} ${vbW} ${vbH}" overflow="visible">
    <path d="M20 52C20 52 40 30 40 18.5C40 8.3 31 0 20 0C9 0 0 8.3 0 18.5C0 30 20 52 20 52Z"
      fill="white" stroke="${borderColor}" stroke-width="${scaledBw}"/>
    <foreignObject x="3" y="2" width="34" height="34">
      <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;border-radius:50%;overflow:hidden">
        <img src="${thumbnailUrl}" style="width:100%;height:100%;object-fit:cover" />
      </div>
    </foreignObject>
  </svg>`;

  const totalW = w + bw * 2;
  const totalH = h + bw * 2;

  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [totalW, totalH],
    iconAnchor: [totalW / 2, totalH - bw],
    popupAnchor: [0, -totalH],
  });
}

type PinMarkersProps = {
  pins: MapPinMarker[];
  userId?: string;
  selectedPinId?: string | null;
  onPinClick: (pinId: string) => void;
};

export function PinMarkers({ pins, userId, selectedPinId, onPinClick }: PinMarkersProps) {
  const [pinSize, setPinSize] = useState(36);
  const markerRefs = useRef<Map<string, L.Marker>>(new Map());

  const handleZoom = useCallback((map: L.Map) => {
    const newSize = getPinSize(map.getZoom());
    setPinSize((prev) => (prev !== newSize ? newSize : prev));
  }, []);

  useMapEvents({
    zoomend(e) {
      handleZoom(e.target);
    },
    load(e) {
      handleZoom(e.target);
    },
  });

  // 選択ピンにバウンスアニメーションを適用
  // pinSize 変更時にアイコンが再生成されDOM要素が入れ替わるため、再適用が必要
  useEffect(() => {
    // Leaflet のDOM更新を待つため requestAnimationFrame で遅延
    const raf = requestAnimationFrame(() => {
      markerRefs.current.forEach((marker, id) => {
        const el = marker.getElement();
        if (!el) return;
        if (id === selectedPinId) {
          el.classList.add("pin-bounce");
        } else {
          el.classList.remove("pin-bounce");
        }
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [selectedPinId, pinSize]);

  const icons = useMemo(() => {
    return new Map(
      pins.map((pin) => [
        pin.id,
        createPinIcon(pin.thumbnailUrl, pin.userId === userId, pinSize),
      ]),
    );
  }, [pins, userId, pinSize]);

  return (
    <>
      {pins.map((pin) => (
        <Marker
          key={`${pin.id}-${pin.thumbnailUrl}`}
          ref={(ref) => {
            if (ref) {
              markerRefs.current.set(pin.id, ref);
            } else {
              markerRefs.current.delete(pin.id);
            }
          }}
          position={[pin.latitude, pin.longitude]}
          icon={icons.get(pin.id)!}
          eventHandlers={{
            click: () => onPinClick(pin.id),
          }}
        />
      ))}
    </>
  );
}
