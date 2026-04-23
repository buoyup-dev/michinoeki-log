"use client";

import { useMemo, useEffect } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { usePinSize } from "@/hooks/usePinSize";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SPOT_CATEGORY_CONFIG } from "@/lib/constants/spot-category";
import type { SpotMarker, SpotCategory } from "@/types/spot";

// MapContainer の SIDE_PANEL_WIDTH と合わせる（サイドパネル幅 px）
const SIDE_PANEL_WIDTH = 400;

/**
 * ティアドロップ型スポットピンアイコンを生成する。
 * 中央に Lucide カテゴリアイコン（白）、背景をカテゴリ色で塗りつぶす。
 *
 * ViewBox: 0 0 40 52（pad=1 で余白を加えた 42x54 で描画）
 * アイコン: 24x24 Lucide パスを scale(0.833) で 20x20 相当に縮小し、
 *           ティアドロップ円部中心（20, 19）に配置
 */
function createSpotIcon(category: SpotCategory, size: number): L.DivIcon {
  const config = SPOT_CATEGORY_CONFIG[category];
  const w = size;
  const h = Math.round(size * 1.3);
  const pad = 1;
  const vbW = 40 + pad * 2;
  const vbH = 52 + pad * 2;

  // Lucide 24x24 アイコンを 20x20 相当（scale=0.833）にしてピン円部中心に配置
  const iconScale = 0.833;
  const iconSize = 24 * iconScale; // ≈ 20
  const iconX = 20 - iconSize / 2; // ≈ 10
  const iconY = 19 - iconSize / 2; // ≈ 9

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${-pad} ${-pad} ${vbW} ${vbH}">
    <path d="M20 52C20 52 40 30 40 18.5C40 8.3 31 0 20 0C9 0 0 8.3 0 18.5C0 30 20 52 20 52Z"
      fill="${config.color}"/>
    <g transform="translate(${iconX.toFixed(2)}, ${iconY.toFixed(2)}) scale(${iconScale})"
       fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${config.svgInner}
    </g>
  </svg>`;

  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [w, h],
    iconAnchor: [w / 2, h],
    popupAnchor: [0, -h],
  });
}

type SpotMarkersProps = {
  spots: SpotMarker[];
  onSpotClick?: (spotId: string) => void;
  /** 現在選択中のスポット ID（サイドパネルパン制御に使用） */
  selectedSpotId?: string | null;
  /** スポット詳細パネルの開閉状態（サイドパネルパン制御に使用） */
  spotDetailOpen?: boolean;
};

export function SpotMarkers({ spots, onSpotClick, selectedSpotId, spotDetailOpen }: SpotMarkersProps) {
  const pinSize = usePinSize();
  const map = useMap();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  // サイドパネル展開時に選択スポットがパネルに隠れないよう地図をパンする。
  // PinMarkers の PanForSidePanel と同じロジック・定数を使用。
  useEffect(() => {
    if (!spotDetailOpen || !selectedSpotId || !isDesktop) return;

    const spot = spots.find((s) => s.id === selectedSpotId);
    if (!spot) return;

    // スポットのピクセル位置を取得
    const spotPoint = map.latLngToContainerPoint([spot.latitude, spot.longitude]);
    const mapSize = map.getSize();

    // 可視領域: サイドパネルの右端 〜 地図右端 にマージンを加えた範囲
    const visibleLeft = SIDE_PANEL_WIDTH + 40; // 40px マージン
    const visibleRight = mapSize.x - 40;

    // スポットが可視領域内にあれば何もしない
    if (spotPoint.x >= visibleLeft && spotPoint.x <= visibleRight) return;

    // 可視領域の中心にスポットを配置するためのオフセットを計算
    const visibleCenterX = (visibleLeft + visibleRight) / 2;
    const offsetX = spotPoint.x - visibleCenterX;

    // ピクセルオフセットを使ってパン
    map.panBy([offsetX, 0], { animate: true, duration: 0.4 });
  }, [spotDetailOpen, selectedSpotId, spots, map, isDesktop]);

  const icons = useMemo(() => {
    return new Map(
      spots.map((spot) => [spot.id, createSpotIcon(spot.category, pinSize)]),
    );
  }, [spots, pinSize]);

  // eventHandlers を Map として事前生成（spots.map 内での毎回生成を防ぐ）
  const eventHandlersMap = useMemo(() => {
    if (!onSpotClick) return new Map<string, { click: () => void }>();
    return new Map(
      spots.map((spot) => [spot.id, { click: () => onSpotClick(spot.id) }]),
    );
  }, [spots, onSpotClick]);

  return (
    <>
      {spots.map((spot) => (
        <Marker
          key={spot.id}
          position={[spot.latitude, spot.longitude]}
          icon={icons.get(spot.id)!}
          eventHandlers={eventHandlersMap.get(spot.id)}
        />
      ))}
    </>
  );
}
