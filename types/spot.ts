/** スポットカテゴリ */
export type SpotCategory =
  | "souvenir"
  | "restaurant"
  | "park"
  | "attraction"
  | "accommodation"
  | "other";

/** スポット（アプリケーション層 camelCase 型） */
export type Spot = {
  id: string;
  name: string;
  nameKana: string | null;
  category: SpotCategory;
  description: string | null;
  latitude: number;
  longitude: number;
  address: string | null;
  phone: string | null;
  websiteUrl: string | null;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

/** スポット写真 */
export type SpotPhoto = {
  id: string;
  spotId: string;
  photoUrl: string;
  thumbnailUrl: string;
  sortOrder: number;
  createdAt: string;
};

/** 地図表示用の軽量スポット型 */
export type SpotMarker = {
  id: string;
  name: string;
  category: SpotCategory;
  latitude: number;
  longitude: number;
  /**
   * Phase 1 では spots.image_url を使用。
   * Phase 2 で spot_photos.thumbnail_url（Supabase Storage）に移行予定。
   */
  thumbnailUrl: string | null;
};

/**
 * スポット詳細表示用
 * Phase 2 で複数写真・レビュー等のフィールドを追加予定。
 * 代表画像は Spot.imageUrl を使用する。
 */
export type SpotDetail = Spot;

/** 一覧表示用の軽量なスポットデータ */
export type SpotListItem = Pick<
  Spot,
  "id" | "name" | "nameKana" | "category" | "address" | "imageUrl"
>;
