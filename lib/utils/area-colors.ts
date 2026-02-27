import type { AreaGroup } from "@/types/station";

/**
 * エリア別スタイル定義（唯一のソース）
 * ベースカラーは types/station.ts の AREA_BASE_COLORS と一致させること。
 * Tailwind JIT は静的クラス文字列のみ検出するため、動的生成不可。
 */
export type AreaStyle = {
  /** バッジ用（一覧・詳細ページ） */
  badge: string;
  /** フィルタボタン非アクティブ */
  filterInactive: string;
  /** フィルタボタンアクティブ */
  filterActive: string;
};

export const areaStyles: Record<AreaGroup, AreaStyle> = {
  道央: {
    badge: "bg-[#f8b042]/20 text-[#b07a1f]",
    filterInactive: "border-[#f8b042]/50 text-[#b07a1f]",
    filterActive: "bg-[#f8b042] text-white border-[#f8b042]",
  },
  道南: {
    badge: "bg-[#ec6a52]/20 text-[#c4503a]",
    filterInactive: "border-[#ec6a52]/50 text-[#c4503a]",
    filterActive: "bg-[#ec6a52] text-white border-[#ec6a52]",
  },
  道北: {
    badge: "bg-[#9dbdba]/20 text-[#6a9a8d]",
    filterInactive: "border-[#9dbdba]/50 text-[#6a9a8d]",
    filterActive: "bg-[#9dbdba] text-white border-[#9dbdba]",
  },
  十勝: {
    badge: "bg-[#c2956b]/20 text-[#8a6440]",
    filterInactive: "border-[#c2956b]/50 text-[#8a6440]",
    filterActive: "bg-[#c2956b] text-white border-[#c2956b]",
  },
  オホーツク: {
    badge: "bg-[#93aec1]/20 text-[#5d8499]",
    filterInactive: "border-[#93aec1]/50 text-[#5d8499]",
    filterActive: "bg-[#93aec1] text-white border-[#93aec1]",
  },
  "釧路・根室": {
    badge: "bg-[#a08dbc]/20 text-[#6d5e87]",
    filterInactive: "border-[#a08dbc]/50 text-[#6d5e87]",
    filterActive: "bg-[#a08dbc] text-white border-[#a08dbc]",
  },
};

/** バッジ用カラーのみ（後方互換） */
export const areaGroupColors: Record<AreaGroup, string> = Object.fromEntries(
  Object.entries(areaStyles).map(([area, style]) => [area, style.badge])
) as Record<AreaGroup, string>;
