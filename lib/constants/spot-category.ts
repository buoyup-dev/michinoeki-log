import type { SpotCategory } from "@/types/spot";

/**
 * スポットカテゴリごとの表示設定。
 * svgInner は Lucide アイコン（24x24 viewBox）の内部要素を文字列化したもの。
 * SpotMarkers の SVG ピン生成で、transform でスケール・配置して使用する。
 */
export const SPOT_CATEGORY_CONFIG: Record<
  SpotCategory,
  { color: string; label: string; svgInner: string }
> = {
  souvenir: {
    color: "#eab308",
    label: "お土産",
    // Lucide: Gift
    svgInner: `<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>`,
  },
  restaurant: {
    color: "#ef4444",
    label: "飲食店",
    // Lucide: Utensils
    svgInner: `<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>`,
  },
  park: {
    color: "#22c55e",
    label: "公園",
    // Lucide: Trees
    svgInner: `<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/>`,
  },
  attraction: {
    color: "#3b82f6",
    label: "観光",
    // Lucide: Camera
    svgInner: `<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>`,
  },
  accommodation: {
    color: "#a855f7",
    label: "宿泊",
    // Lucide: BedDouble
    svgInner: `<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/>`,
  },
  other: {
    color: "#6b7280",
    label: "その他",
    // Lucide: MoreHorizontal (Ellipsis)
    svgInner: `<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>`,
  },
};
