import type { AreaGroup } from "./station";

/** 訪問状況フィルタ */
export type VisitFilter = "all" | "unvisited" | "visited";

/** 施設フィルタキー（地図フィルタで使用する4種） */
export type FacilityFilterKey = "restaurant" | "wifi" | "evCharger" | "babyRoom";

/** 道の駅フィルタの状態（地図・一覧共通） */
export type StationFilters = {
  areas: Set<AreaGroup>;
  visitFilter: VisitFilter;
  facilities: Set<FacilityFilterKey>;
};

export const ALL_AREAS: AreaGroup[] = ["道東", "道北", "道央", "道南"];

export const FACILITY_FILTER_OPTIONS: {
  key: FacilityFilterKey;
  label: string;
}[] = [
  { key: "restaurant", label: "レストラン" },
  { key: "wifi", label: "Wi-Fi" },
  { key: "evCharger", label: "EV充電器" },
  { key: "babyRoom", label: "授乳室" },
];

export function createDefaultFilters(): StationFilters {
  return {
    areas: new Set<AreaGroup>(ALL_AREAS),
    visitFilter: "all",
    facilities: new Set<FacilityFilterKey>(),
  };
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
