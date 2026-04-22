"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { MapContainer as LeafletMapContainer, TileLayer, ZoomControl, useMap, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import type { StationMapItem } from "@/types/station";
import type { StationVisitBadgeRecord } from "@/types/badge";
import type { MapPinMarker } from "@/types/map-pin";
import type { StationFilters } from "@/types/station-filter";
import { createDefaultFilters, countActiveFilters, matchesStationFilters } from "@/types/station-filter";
import { fetchMapPins } from "@/lib/actions/map-pin";
import { StationMarkers } from "./StationMarkers";
import { MapFilterButton } from "./MapFilterButton";
import { StationFilterSheet } from "@/components/features/station/StationFilterSheet";
import { CurrentLocationButton } from "./CurrentLocationButton";
import { DevModeSheet, type DevToggleItem } from "./DevModeSheet";
import { PinMarkers } from "@/components/features/map-pin/PinMarkers";
import { PinCreateFAB } from "@/components/features/map-pin/PinCreateFAB";
import { PinCreationMode } from "@/components/features/map-pin/PinCreationMode";
import { PinCreateSheet } from "@/components/features/map-pin/PinCreateSheet";
import { PinDetailSheet } from "@/components/features/map-pin/PinDetailSheet";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import "leaflet/dist/leaflet.css";

const SIDE_PANEL_WIDTH = 400;
const INITIAL_ZOOM = 7;

// 円山動物園の敷地に合わせて手動調整済み（PoC）
const MARUYAMA_ZOO_BOUNDS: [[number, number], [number, number]] = [
  [43.04591, 141.30359], // 南西端
  [43.05209, 141.30877], // 北東端
];

// 定山渓エリア（PoC・未調整）
const JYOZANKEI_BOUNDS: [[number, number], [number, number]] = [
  [42.9589, 141.1494], // 南西端
  [42.9756, 141.1824], // 北東端
];
const JYOZANKEI_LOW_URL = "/images/jyozankei-low.webp";
const JYOZANKEI_HIGH_URL = "/images/jyozankei-high.webp";
// zoom 14 以上で高画質に切り替える閾値（このズーム以上でイラストの細部が視認できる）
const JYOZANKEI_HIGH_ZOOM_THRESHOLD = 14;

/**
 * ズームレベルの変化を監視して通知する
 */
function ZoomWatcher({ onZoomChange }: { onZoomChange: (zoom: number) => void }) {
  const map = useMap();
  useEffect(() => {
    onZoomChange(map.getZoom());
    const handler = () => onZoomChange(map.getZoom());
    map.on("zoomend", handler);
    return () => { map.off("zoomend", handler); };
  }, [map, onZoomChange]);
  return null;
}

/**
 * 定山渓イラストマップオーバーレイ
 * zoom state を内部で管理することで、アンマウント時に自動リセットされる
 */
function JyozankeiOverlay() {
  const [zoom, setZoom] = useState<number | null>(null);
  return (
    <>
      {/* ZoomWatcher が zoom を確定させてから ImageOverlay をマウントすることで、
          初回 URL 切り替えによる Leaflet の error イベント発火を防ぐ */}
      <ZoomWatcher onZoomChange={setZoom} />
      {zoom !== null && (
        <ImageOverlay
          url={zoom >= JYOZANKEI_HIGH_ZOOM_THRESHOLD ? JYOZANKEI_HIGH_URL : JYOZANKEI_LOW_URL}
          bounds={JYOZANKEI_BOUNDS}
          errorOverlayUrl="/images/overlay-error.png"
          alt="定山渓イラストマップ"
        />
      )}
    </>
  );
}

/**
 * サイドパネル展開時に、選択ピンがパネルに隠れないよう地図をパンする
 */
function PanForSidePanel({ pinId, pins, open }: { pinId: string | null; pins: MapPinMarker[]; open: boolean }) {
  const map = useMap();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  useEffect(() => {
    if (!open || !pinId || !isDesktop) return;

    const pin = pins.find((p) => p.id === pinId);
    if (!pin) return;

    // ピンのピクセル位置を取得
    const pinPoint = map.latLngToContainerPoint([pin.latitude, pin.longitude]);
    const mapSize = map.getSize();

    // 可視領域: サイドパネルの右端 〜 地図右端 にマージンを加えた範囲
    const visibleLeft = SIDE_PANEL_WIDTH + 40; // 40px マージン
    const visibleRight = mapSize.x - 40;

    // ピンが可視領域内にあれば何もしない
    if (pinPoint.x >= visibleLeft && pinPoint.x <= visibleRight) return;

    // 可視領域の中心にピンを配置するためのオフセットを計算
    const visibleCenterX = (visibleLeft + visibleRight) / 2;
    const offsetX = pinPoint.x - visibleCenterX;

    // ピクセルオフセットを使ってパン
    map.panBy([offsetX, 0], { animate: true, duration: 0.4 });
  }, [open, pinId, pins, map, isDesktop]);

  return null;
}

/**
 * ピン作成モード時に地図コンテナのカーソルを crosshair に変更する
 * Leaflet が .leaflet-grab で cursor: grab を設定するため、
 * CSS クラスよりも優先度が高いインラインスタイルで上書きする
 */
function MapCursorControl({ active }: { active: boolean }) {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    container.style.cursor = active ? "crosshair" : "";

    if (!active) return;

    const handleMouseDown = () => { container.style.cursor = "grabbing"; };
    const handleMouseUp = () => { container.style.cursor = "crosshair"; };

    map.on("mousedown", handleMouseDown);
    map.on("mouseup", handleMouseUp);
    return () => {
      map.off("mousedown", handleMouseDown);
      map.off("mouseup", handleMouseUp);
    };
  }, [active, map]);
  return null;
}

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
  mapPins: MapPinMarker[];
  userId?: string;
  initialPinId?: string;
};

export default function MapContainerComponent({ stations, visitBadges, mapPins, userId, initialPinId }: MapContainerProps) {
  const [filters, setFilters] = useState<StationFilters>(createDefaultFilters);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMounted, setSheetMounted] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // PoC: 開発モード（環境変数で制御）
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [jyozankeiVisible, setJyozankeiVisible] = useState(false);
  const [devModeSheetOpen, setDevModeSheetOpen] = useState(false);
  const [devSheetMounted, setDevSheetMounted] = useState(false);
  const devToggles = useMemo<DevToggleItem[]>(() => [
    {
      id: "illustMap",
      label: "イラストマップ（円山動物園）",
      description: "円山動物園周辺にオーバーレイを表示（PoC）",
      value: overlayVisible,
      onChange: setOverlayVisible,
    },
    {
      id: "jyozankeiMap",
      label: "イラストマップ（定山渓）",
      description: "定山渓周辺にオーバーレイを表示（PoC）",
      value: jyozankeiVisible,
      onChange: setJyozankeiVisible,
    },
  ], [overlayVisible, jyozankeiVisible]);
  const devModeActiveCount = devToggles.filter((t) => t.value).length;

  // ピン作成モード
  const [pinCreateMode, setPinCreateMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [createSheetOpen, setCreateSheetOpen] = useState(false);

  // ピン詳細表示
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);

  // ピンデータ（ローカル状態で保持し、作成/削除時にリロードで更新）
  const [localPins, setLocalPins] = useState(mapPins);

  // サーバー側の再フェッチ（revalidatePath等）でpropsが更新されたら同期
  useEffect(() => {
    setLocalPins(mapPins);
  }, [mapPins]);

  // 初回マウントをスキップするためのフラグ
  // 初回はSSRのpropsと同じデータのため二重取得を避ける
  const isFirstMount = useRef(true);

  // マウント時: 別ページでの更新を反映するため最新データを取得
  // 初回はサーバーpropsと同じだが、/pins/[id]等から戻った場合は最新の画像URLが取れる
  // null=エラー（既存データ維持）、[]=0件（正常にクリア）
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    fetchMapPins().then((fresh) => {
      if (fresh !== null) setLocalPins(fresh);
    });
  }, []);

  // URLクエリパラメータ ?pin=<id> でピン詳細を自動表示
  useEffect(() => {
    if (initialPinId) {
      setSelectedPinId(initialPinId);
      setDetailSheetOpen(true);
    }
  }, [initialPinId]);

  const isLoggedIn = userId !== undefined;

  const filteredStations = useMemo(() => {
    return stations.filter((s) => matchesStationFilters(s, filters, visitBadges));
  }, [stations, filters, visitBadges]);

  const activeCount = useMemo(() => countActiveFilters(filters), [filters]);

  const handleOpenSheet = useCallback(() => {
    setSheetMounted(true);
    setSheetOpen(true);
  }, []);
  const handleAutoLocateComplete = useCallback(() => setMapReady(true), []);

  const handleTogglePinCreateMode = useCallback(() => {
    setPinCreateMode((prev) => !prev);
    setSelectedLocation(null);
  }, []);

  const handleLocationSelect = useCallback((lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    setCreateSheetOpen(true);
    setPinCreateMode(false);
  }, []);

  const handlePinClick = useCallback((pinId: string) => {
    setSelectedPinId(pinId);
    setDetailSheetOpen(true);
  }, []);

  const handlePinCreated = useCallback((newPin: MapPinMarker) => {
    setLocalPins((prev) => [newPin, ...prev]);
  }, []);

  const handlePinDeleted = useCallback(() => {
    if (selectedPinId) {
      setLocalPins((prev) => prev.filter((p) => p.id !== selectedPinId));
    }
    setSelectedPinId(null);
  }, [selectedPinId]);

  return (
    <div className="relative h-full w-full">
      <LeafletMapContainer
        center={[43.0, 143.0]}
        zoom={INITIAL_ZOOM}
        minZoom={7}
        maxBounds={[
          [41.1, 139.0],  // 南西（函館をカバー、青森を除外）
          [45.8, 146.5],  // 北東（宗谷岬をカバー）
        ]}
        maxBoundsViscosity={1.0}
        className="h-full w-full"
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* PoC: イラストマップオーバーレイ（環境変数ONかつトグルON時のみ読み込み） */}
        {process.env.NEXT_PUBLIC_ENABLE_DEV_MODE === "true" && overlayVisible && (
          <ImageOverlay
            url="/images/maruyama-zoo.png"
            bounds={MARUYAMA_ZOO_BOUNDS}
            errorOverlayUrl="/images/overlay-error.png"
            alt="円山動物園イラストマップ"
          />
        )}
        {process.env.NEXT_PUBLIC_ENABLE_DEV_MODE === "true" && jyozankeiVisible && (
          <JyozankeiOverlay />
        )}
        <StationMarkers stations={filteredStations} visitBadges={visitBadges} />
        <PinMarkers pins={localPins} userId={userId} selectedPinId={detailSheetOpen ? selectedPinId : null} onPinClick={handlePinClick} />
        <PanForSidePanel pinId={selectedPinId} pins={localPins} open={detailSheetOpen} />
        <MapCursorControl active={pinCreateMode} />
        <CurrentLocationButton onAutoLocateComplete={handleAutoLocateComplete} />
        {pinCreateMode && (
          <PinCreationMode onLocationSelect={handleLocationSelect} />
        )}
      </LeafletMapContainer>
      {!mapReady && (
        <div className="absolute inset-0 z-[1001] bg-background" />
      )}
      <div className="absolute right-3 top-3 z-[1000] flex items-center gap-2">
        {/* PoC: 開発モードボタン（環境変数で制御） */}
        {process.env.NEXT_PUBLIC_ENABLE_DEV_MODE === "true" && (
          <button
            type="button"
            onClick={() => { setDevSheetMounted(true); setDevModeSheetOpen(true); }}
            aria-label={`開発モード${devModeActiveCount > 0 ? `（${devModeActiveCount}件ON）` : ""}`}
            className="flex items-center gap-1.5 rounded-lg bg-card/90 px-3 py-2 text-sm font-medium shadow-md backdrop-blur-sm transition-colors hover:bg-card"
          >
            開発モード
            {devModeActiveCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {devModeActiveCount}
              </span>
            )}
          </button>
        )}
        {isLoggedIn && (
          <PinCreateFAB active={pinCreateMode} onClick={handleTogglePinCreateMode} />
        )}
        <MapFilterButton activeCount={activeCount} onClick={handleOpenSheet} />
      </div>
      {process.env.NEXT_PUBLIC_ENABLE_DEV_MODE === "true" && devSheetMounted && (
        <DevModeSheet
          open={devModeSheetOpen}
          onOpenChange={setDevModeSheetOpen}
          toggles={devToggles}
          onReset={() => devToggles.forEach((t) => t.onChange(false))}
        />
      )}
      {sheetMounted && (
        <StationFilterSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          filters={filters}
          onFiltersChange={setFilters}
          isLoggedIn={isLoggedIn}
        />
      )}
      {selectedLocation && (
        <PinCreateSheet
          open={createSheetOpen}
          onOpenChange={(v) => {
            setCreateSheetOpen(v);
            if (!v) setSelectedLocation(null);
          }}
          latitude={selectedLocation.lat}
          longitude={selectedLocation.lng}
          onCreated={handlePinCreated}
        />
      )}
      <PinDetailSheet
        open={detailSheetOpen}
        onOpenChange={setDetailSheetOpen}
        pinId={selectedPinId}
        userId={userId}
        onDeleted={handlePinDeleted}
      />
    </div>
  );
}
