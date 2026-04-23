import type { Tables } from "@/types/database";
import type { Spot, SpotPhoto, SpotMarker, SpotDetail } from "@/types/spot";

export type SpotRow = Tables<"spots">;
export type SpotPhotoRow = Tables<"spot_photos">;

export function toSpot(row: SpotRow): Spot {
  return {
    id: row.id,
    name: row.name,
    nameKana: row.name_kana,
    category: row.category,
    description: row.description,
    latitude: row.latitude,
    longitude: row.longitude,
    address: row.address,
    phone: row.phone,
    websiteUrl: row.website_url,
    imageUrl: row.image_url,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toSpotPhoto(row: SpotPhotoRow): SpotPhoto {
  return {
    id: row.id,
    spotId: row.spot_id,
    photoUrl: row.photo_url,
    thumbnailUrl: row.thumbnail_url,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

/**
 * 地図マーカー用の軽量型。SpotRow から必要なフィールドだけ Pick することで
 * DB 型（database.ts）が唯一の真実の源になり、カテゴリ追加等の変更が漏れなく伝播する。
 * 代表画像は spots.image_url を使用する（spot_photos JOIN なし）。
 */
export type SpotMarkerRow = Pick<SpotRow, "id" | "name" | "category" | "latitude" | "longitude" | "image_url">;

export function toSpotMarker(row: SpotMarkerRow): SpotMarker {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    latitude: row.latitude,
    longitude: row.longitude,
    thumbnailUrl: row.image_url ?? null,
  };
}

/**
 * スポット詳細用。
 * Phase 1 では Spot と同一。Phase 2 で複数写真等を追加予定。
 */
export function toSpotDetail(row: SpotRow): SpotDetail {
  return toSpot(row);
}
