import type { Tables } from "@/types/database";
import type { Visit, VisitWithStation } from "@/types/visit";
import { toAreaGroup } from "@/lib/db/transforms/station";

export type VisitRow = Tables<"visits">;

export function toVisit(row: VisitRow): Visit {
  return {
    id: row.id,
    userId: row.user_id,
    stationId: row.station_id,
    visitedAt: row.visited_at,
    memo: row.memo,
    latitude: row.latitude,
    longitude: row.longitude,
    isGpsVerified: row.is_gps_verified,
    createdAt: row.created_at,
  };
}

export type VisitWithStationRow = VisitRow & {
  stations: {
    id: string;
    name: string;
    image_url: string | null;
    area_group: string;
  };
};

export function toVisitWithStation(row: VisitWithStationRow): VisitWithStation {
  return {
    ...toVisit(row),
    station: {
      id: row.stations.id,
      name: row.stations.name,
      imageUrl: row.stations.image_url,
      areaGroup: toAreaGroup(row.stations.area_group),
    },
  };
}
