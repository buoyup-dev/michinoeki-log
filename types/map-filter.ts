import type { SpotCategory } from "@/types/spot";
import { SPOT_CATEGORY_CONFIG } from "@/lib/constants/spot-category";

// Object.keys() の戻り値は string[] のため、SPOT_CATEGORY_CONFIG のキーと一致する型への明示的なキャストが必要
export const SPOT_CATEGORIES = Object.keys(SPOT_CATEGORY_CONFIG) as SpotCategory[];

/** マップピンの表示対象フィルタ */
export type PinFilter = "all" | "mine";

export type MapLayerFilters = {
  /** 表示するスポットカテゴリ。空集合 = スポット全非表示 */
  spotCategories: Set<SpotCategory>;
  /** マップピンの表示対象 */
  pinFilter: PinFilter;
};

export const PIN_FILTER_OPTIONS: { key: PinFilter; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "mine", label: "自分のみ" },
];

export function createDefaultLayerFilters(): MapLayerFilters {
  return {
    spotCategories: new Set(SPOT_CATEGORIES),
    pinFilter: "all",
  };
}

/**
 * 非選択のスポットカテゴリ数をカウント（全選択=デフォルト=0）。
 * station-filter.ts の countActiveFilters（選択した施設数）と同じ粒度で集計し、
 * MapContainer でのバッジ数値の加算時に意味が統一される。
 */
export function countActiveLayerFilters(filters: MapLayerFilters): number {
  let count = 0;
  // 非選択のカテゴリ数をカウント（全選択=デフォルト=0）
  count += SPOT_CATEGORIES.length - filters.spotCategories.size;
  // "all" 以外なら1件
  if (filters.pinFilter !== "all") count += 1;
  return count;
}
