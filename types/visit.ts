import type { Station } from "./station";

/** 訪問記録（アプリケーション層 camelCase 型） */
export type Visit = {
  id: string;
  userId: string;
  stationId: string;
  visitedAt: string;
  memo: string | null;
  latitude: number | null;
  longitude: number | null;
  isGpsVerified: boolean;
  createdAt: string;
};

/** 訪問履歴表示用（道の駅情報付き） */
export type VisitWithStation = Visit & {
  station: Pick<Station, "id" | "name" | "imageUrl" | "areaGroup">;
};

/** ユーザーの訪問統計 */
export type VisitStats = {
  totalVisits: number;
  uniqueStationsVisited: number;
  totalStations: number;
  completionRate: number;
  gpsVerifiedCount: number;
  selfReportedCount: number;
  thisMonthVisits: number;
};
