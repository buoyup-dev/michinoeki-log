import type { Station } from "./station";

/** お気に入り（アプリケーション層 camelCase 型） */
export type Favorite = {
  id: string;
  userId: string;
  stationId: string;
  createdAt: string;
};

/** お気に入り一覧表示用（道の駅情報付き） */
export type FavoriteWithStation = Favorite & {
  station: Pick<Station, "id" | "name" | "imageUrl" | "areaGroup" | "address">;
};
