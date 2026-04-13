/** マップピン（アプリケーション層 camelCase 型） */
export type MapPin = {
  id: string;
  userId: string;
  latitude: number;
  longitude: number;
  memo: string | null;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
};

/** マップピン写真 */
export type MapPinPhoto = {
  id: string;
  pinId: string;
  photoUrl: string;
  thumbnailUrl: string;
  sortOrder: number;
  createdAt: string;
};

/** 地図表示用の軽量マップピン型（サムネイル付き） */
export type MapPinMarker = {
  id: string;
  userId: string;
  latitude: number;
  longitude: number;
  memo: string | null;
  thumbnailUrl: string;
  isPublic: boolean;
};

/** ピン一覧表示用 */
export type MapPinListItem = {
  id: string;
  memo: string | null;
  isPublic: boolean;
  createdAt: string;
  thumbnailUrl: string | null;
};

/** ピン詳細表示用（写真情報付き） */
export type MapPinDetail = MapPin & {
  photo: MapPinPhoto | null;
};
