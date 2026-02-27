/** エリアグループ定数（6区分） — 全てのエリア関連定義の唯一のソース */
export const AREA_GROUPS = ["道央", "道南", "道北", "十勝", "オホーツク", "釧路・根室"] as const;

/** エリアグループ型 */
export type AreaGroup = (typeof AREA_GROUPS)[number];

/** 道の駅の設備情報（camelCase、全29キー boolean） */
export type StationFacilities = {
  toilet: boolean;
  washlet: boolean;
  handicapToilet: boolean;
  ostomy: boolean;
  parking: boolean;
  coveredParking: boolean;
  evCharger: boolean;
  wifi: boolean;
  atm: boolean;
  information: boolean;
  shop: boolean;
  restaurant: boolean;
  cafe: boolean;
  farmMarket: boolean;
  nursingRoom: boolean;
  diaperChanging: boolean;
  kidsSpace: boolean;
  onsen: boolean;
  lodging: boolean;
  campground: boolean;
  observatory: boolean;
  dogRun: boolean;
  park: boolean;
  museum: boolean;
  experience: boolean;
  restArea: boolean;
  creditCard: boolean;
  cashless: boolean;
  aed: boolean;
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
  areaGroup: AreaGroup;
  description: string | null;
  facilities: StationFacilities;
  createdAt: string;
  updatedAt: string;
};

/** 一覧表示用の軽量な道の駅データ */
export type StationListItem = Pick<
  Station,
  "id" | "name" | "nameKana" | "address" | "areaGroup" | "imageUrl" | "facilities"
>;

/** 地図表示用の軽量な道の駅データ */
export type StationMapItem = Pick<
  Station,
  "id" | "name" | "address" | "latitude" | "longitude" | "areaGroup" | "imageUrl" | "facilities"
>;
