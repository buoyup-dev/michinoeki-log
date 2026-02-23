import { z } from "zod/v4";
import type { Station, StationListItem, StationMapItem, StationFacilities, AreaGroup } from "@/types/station";

const AREA_GROUPS: readonly string[] = ["道東", "道北", "道央", "道南"];

export const facilitiesSchema = z.object({
  toilet: z.boolean().default(false),
  ev_charger: z.boolean().default(false),
  wifi: z.boolean().default(false),
  restaurant: z.boolean().default(false),
  shop: z.boolean().default(false),
  baby_room: z.boolean().default(false),
  handicap_toilet: z.boolean().default(false),
  atm: z.boolean().default(false),
  information: z.boolean().default(false),
  parking: z.number().nullable().default(null),
});

const DEFAULT_FACILITIES: StationFacilities = {
  toilet: false, evCharger: false, wifi: false, restaurant: false,
  shop: false, babyRoom: false, handicapToilet: false, atm: false,
  information: false, parking: null,
};

export function toFacilities(raw: unknown): StationFacilities {
  const parsed = facilitiesSchema.safeParse(raw);
  if (!parsed.success) {
    return { ...DEFAULT_FACILITIES };
  }
  const f = parsed.data;
  return {
    toilet: f.toilet,
    evCharger: f.ev_charger,
    wifi: f.wifi,
    restaurant: f.restaurant,
    shop: f.shop,
    babyRoom: f.baby_room,
    handicapToilet: f.handicap_toilet,
    atm: f.atm,
    information: f.information,
    parking: f.parking,
  };
}

function isAreaGroup(value: string): value is AreaGroup {
  return AREA_GROUPS.includes(value);
}

export function toAreaGroup(value: string): AreaGroup {
  return isAreaGroup(value) ? value : "道央";
}

/** PostgREST フィルタ構文の特殊文字を除去 */
export function sanitizeSearchTerm(term: string): string {
  return term.replace(/[%_,.()\\]/g, "");
}

export type StationRow = {
  id: string;
  name: string;
  name_kana: string | null;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  business_hours: string | null;
  closed_days: string | null;
  website_url: string | null;
  image_url: string | null;
  area: string;
  area_group: string;
  description: string | null;
  facilities: unknown;
  created_at: string;
  updated_at: string;
};

export function toStation(row: StationRow): Station {
  return {
    id: row.id,
    name: row.name,
    nameKana: row.name_kana,
    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,
    phone: row.phone,
    businessHours: row.business_hours,
    closedDays: row.closed_days,
    websiteUrl: row.website_url,
    imageUrl: row.image_url,
    area: row.area,
    areaGroup: toAreaGroup(row.area_group),
    description: row.description,
    facilities: toFacilities(row.facilities),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export type StationMapRow = Pick<
  StationRow,
  "id" | "name" | "latitude" | "longitude" | "area_group" | "image_url" | "facilities"
>;

export function toMapItem(row: StationMapRow): StationMapItem {
  return {
    id: row.id,
    name: row.name,
    latitude: row.latitude,
    longitude: row.longitude,
    areaGroup: toAreaGroup(row.area_group),
    imageUrl: row.image_url,
    facilities: toFacilities(row.facilities),
  };
}

export type StationListRow = Pick<
  StationRow,
  "id" | "name" | "name_kana" | "address" | "area_group" | "image_url"
>;

export function toListItem(row: StationListRow): StationListItem {
  return {
    id: row.id,
    name: row.name,
    nameKana: row.name_kana,
    address: row.address,
    areaGroup: toAreaGroup(row.area_group),
    imageUrl: row.image_url,
  };
}
