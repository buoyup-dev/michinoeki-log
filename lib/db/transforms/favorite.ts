import type { Tables } from "@/types/database";
import type { Favorite, FavoriteWithStation } from "@/types/favorite";
import { toAreaGroup } from "@/lib/db/transforms/station";

export type FavoriteRow = Tables<"favorites">;

export function toFavorite(row: FavoriteRow): Favorite {
  return {
    id: row.id,
    userId: row.user_id,
    stationId: row.station_id,
    createdAt: row.created_at,
  };
}

export type FavoriteWithStationRow = FavoriteRow & {
  stations: {
    id: string;
    name: string;
    image_url: string | null;
    area_group: string;
    address: string;
  };
};

export function toFavoriteWithStation(row: FavoriteWithStationRow): FavoriteWithStation {
  return {
    ...toFavorite(row),
    station: {
      id: row.stations.id,
      name: row.stations.name,
      imageUrl: row.stations.image_url,
      areaGroup: toAreaGroup(row.stations.area_group),
      address: row.stations.address,
    },
  };
}
