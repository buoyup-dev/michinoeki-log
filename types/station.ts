/** エリアグループ */
export type AreaGroup = "道東" | "道北" | "道央" | "道南";

/** 道の駅の設備情報（camelCase） */
export type StationFacilities = {
  toilet: boolean;
  evCharger: boolean;
  wifi: boolean;
  restaurant: boolean;
  shop: boolean;
  babyRoom: boolean;
  handicapToilet: boolean;
  atm: boolean;
  information: boolean;
  parking: number | null;
};

/** 道の駅（アプリケーション層 camelCase 型） */
export type Station = {
  id: string;
  name: string;
  nameKana: string | null;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  businessHours: string | null;
  closedDays: string | null;
  websiteUrl: string | null;
  imageUrl: string | null;
  area: string;
  areaGroup: AreaGroup;
  description: string | null;
  facilities: StationFacilities;
  createdAt: string;
  updatedAt: string;
};

/** 一覧表示用の軽量な道の駅データ */
export type StationListItem = Pick<
  Station,
  "id" | "name" | "nameKana" | "address" | "areaGroup" | "imageUrl"
>;

/** 地図表示用の軽量な道の駅データ */
export type StationMapItem = Pick<
  Station,
  "id" | "name" | "latitude" | "longitude" | "areaGroup" | "imageUrl" | "facilities"
>;
