import { AREA_GROUPS } from "./station";
import type { AreaGroup, StationFacilities } from "./station";

/** 訪問状況フィルタ */
export type VisitFilter = "all" | "unvisited" | "visited";

/** 施設フィルタキー（カテゴリ別8種） */
export type FacilityFilterKey =
  | "dining"
  | "kids"
  | "evCharger"
  | "coveredParking"
  | "onsenLodging"
  | "leisure"
  | "dogRun"
  | "museum";

/** 施設フィルタキーに対応する facilities キーのマッピング（OR条件） */
export const FACILITY_FILTER_MATCH: Record<FacilityFilterKey, (keyof StationFacilities)[]> = {
  dining: ["restaurant", "cafe", "farmMarket"],
  kids: ["nursingRoom", "diaperChanging", "kidsSpace"],
  evCharger: ["evCharger"],
  coveredParking: ["coveredParking"],
  onsenLodging: ["onsen", "lodging"],
  leisure: ["park", "observatory", "campground"],
  dogRun: ["dogRun"],
  museum: ["museum"],
};

/** 施設フィルタが道の駅にマッチするか判定 */
export function matchesFacilityFilter(
  key: FacilityFilterKey,
  facilities: StationFacilities,
): boolean {
  return FACILITY_FILTER_MATCH[key].some((k) => facilities[k]);
}

/** 道の駅フィルタの状態（地図・一覧共通） */
export type StationFilters = {
  areas: Set<AreaGroup>;
  visitFilter: VisitFilter;
  facilities: Set<FacilityFilterKey>;
};

export const ALL_AREAS: readonly AreaGroup[] = AREA_GROUPS;

export const FACILITY_FILTER_OPTIONS: {
  key: FacilityFilterKey;
  label: string;
}[] = [
  { key: "dining", label: "飲食" },
  { key: "kids", label: "子連れ" },
  { key: "evCharger", label: "EV充電" },
  { key: "coveredParking", label: "屋根付きP" },
  { key: "onsenLodging", label: "温泉・宿泊" },
  { key: "leisure", label: "レジャー" },
  { key: "dogRun", label: "ドッグラン" },
  { key: "museum", label: "博物館" },
];

export function createDefaultFilters(): StationFilters {
  return {
    areas: new Set<AreaGroup>(ALL_AREAS),
    visitFilter: "all",
    facilities: new Set<FacilityFilterKey>(),
  };
}

/** エリア・訪問・施設フィルタを適用する共通ロジック */
export function matchesStationFilters(
  station: { id: string; areaGroup: AreaGroup; facilities: StationFacilities },
  filters: StationFilters,
  visitBadges?: Record<string, unknown>,
): boolean {
  // 1. エリアフィルタ
  if (!filters.areas.has(station.areaGroup)) return false;

  // 2. 訪問状況フィルタ（visitBadges が渡された場合=ログイン中のみ適用）
  if (visitBadges && filters.visitFilter !== "all") {
    const hasVisit = station.id in visitBadges;
    if (filters.visitFilter === "visited" && !hasVisit) return false;
    if (filters.visitFilter === "unvisited" && hasVisit) return false;
  }

  // 3. 施設フィルタ（AND条件、グループ化マッチ）
  if (filters.facilities.size > 0) {
    for (const key of filters.facilities) {
      if (!matchesFacilityFilter(key, station.facilities)) return false;
    }
  }

  return true;
}

/** デフォルトからの差分をカウント（バッジ表示用） */
export function countActiveFilters(filters: StationFilters): number {
  let count = 0;

  // エリア: 全選択でなければ +1（フィルタカテゴリ単位でカウント）
  if (filters.areas.size < ALL_AREAS.length) {
    count += 1;
  }

  // 訪問状況: "all" 以外なら +1
  if (filters.visitFilter !== "all") {
    count += 1;
  }

  // 施設: 選択数
  count += filters.facilities.size;

  return count;
}
