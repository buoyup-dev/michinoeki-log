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
 * スポットカテゴリは「絞り込みがあるかどうか」を1件としてカウント（個数ではない）。
 * 1つでも外せばバッジに+1、何個外しても+1のまま。
 * ピンフィルタは "all" 以外なら+1。
 */
export function countActiveLayerFilters(filters: MapLayerFilters): number {
  let count = 0;
  // 1件でも絞り込みがあれば1（全選択=デフォルト=0）
  if (filters.spotCategories.size < SPOT_CATEGORIES.length) count += 1;
  // "all" 以外なら1件
  if (filters.pinFilter !== "all") count += 1;
  return count;
}
