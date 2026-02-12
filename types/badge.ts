import type { AreaGroup } from "./station";

/** バッジの種別 */
export type BadgeType = "area_complete" | "milestone";

/** マイルストーンバッジの閾値 */
export type MilestoneThreshold = 10 | 30 | 50 | 100 | 130;

/** バッジ定義 */
export type BadgeDefinition = {
  id: string;
  type: BadgeType;
  label: string;
  description: string;
  areaGroup?: AreaGroup;
  threshold?: MilestoneThreshold;
  requiredCount: number;
};

/** ユーザーのバッジ取得状況（定義 + 進捗） */
export type BadgeStatus = BadgeDefinition & {
  isEarned: boolean;
  earnedAt: string | null;
  currentCount: number;
  progress: number;
};

/** 道の駅ごとの訪問バッジ種別（ゴールド/シルバー） */
export type StationVisitBadge = "gold" | "silver";

/** 道の駅IDをキーとした訪問バッジのレコード（RSCシリアライズ用） */
export type StationVisitBadgeRecord = Record<string, StationVisitBadge>;
