import type { Tables } from "@/types/database";
import type { MapPin, MapPinPhoto, MapPinMarker, MapPinDetail, MapPinListItem } from "@/types/map-pin";

export type MapPinRow = Tables<"map_pins">;
export type MapPinPhotoRow = Tables<"map_pin_photos">;

export function toMapPin(row: MapPinRow): MapPin {
  return {
    id: row.id,
    userId: row.user_id,
    latitude: row.latitude,
    longitude: row.longitude,
    memo: row.memo,
    isPublic: row.is_public,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toMapPinPhoto(row: MapPinPhotoRow): MapPinPhoto {
  return {
    id: row.id,
    pinId: row.pin_id,
    photoUrl: row.photo_url,
    thumbnailUrl: row.thumbnail_url,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

export type MapPinMarkerRow = {
  id: string;
  user_id: string;
  latitude: number;
  longitude: number;
  memo: string | null;
  is_public: boolean;
  map_pin_photos: { thumbnail_url: string }[];
};

export function toMapPinMarker(row: MapPinMarkerRow): MapPinMarker | null {
  const photo = row.map_pin_photos[0];
  if (!photo) return null;

  return {
    id: row.id,
    userId: row.user_id,
    latitude: row.latitude,
    longitude: row.longitude,
    memo: row.memo,
    thumbnailUrl: photo.thumbnail_url,
    isPublic: row.is_public,
  };
}

export type MapPinListRow = {
  id: string;
  memo: string | null;
  is_public: boolean;
  created_at: string;
  map_pin_photos: { thumbnail_url: string }[];
};

export function toMapPinListItem(row: MapPinListRow): MapPinListItem {
  const photo = row.map_pin_photos[0];
  return {
    id: row.id,
    memo: row.memo,
    isPublic: row.is_public,
    createdAt: row.created_at,
    thumbnailUrl: photo?.thumbnail_url ?? null,
  };
}

export type MapPinDetailRow = MapPinRow & {
  map_pin_photos: MapPinPhotoRow[];
};

export function toMapPinDetail(row: MapPinDetailRow): MapPinDetail {
  const photo = row.map_pin_photos[0];
  return {
    ...toMapPin(row),
    photo: photo ? toMapPinPhoto(photo) : null,
  };
}
