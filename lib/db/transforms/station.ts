import { z } from "zod/v4";
import { AREA_GROUPS } from "@/types/station";
import type { Station, StationListItem, StationMapItem, StationFacilities, AreaGroup } from "@/types/station";

export const facilitiesSchema = z.object({
  toilet: z.boolean().default(false),
  washlet: z.boolean().default(false),
  handicap_toilet: z.boolean().default(false),
  ostomy: z.boolean().default(false),
  parking: z.boolean().default(false),
  covered_parking: z.boolean().default(false),
  ev_charger: z.boolean().default(false),
  wifi: z.boolean().default(false),
  atm: z.boolean().default(false),
  information: z.boolean().default(false),
  shop: z.boolean().default(false),
  restaurant: z.boolean().default(false),
  cafe: z.boolean().default(false),
  farm_market: z.boolean().default(false),
  nursing_room: z.boolean().default(false),
  diaper_changing: z.boolean().default(false),
  kids_space: z.boolean().default(false),
  onsen: z.boolean().default(false),
  lodging: z.boolean().default(false),
  campground: z.boolean().default(false),
  observatory: z.boolean().default(false),
  dog_run: z.boolean().default(false),
  park: z.boolean().default(false),
  museum: z.boolean().default(false),
  experience: z.boolean().default(false),
  rest_area: z.boolean().default(false),
  credit_card: z.boolean().default(false),
  cashless: z.boolean().default(false),
  aed: z.boolean().default(false),
});

const DEFAULT_FACILITIES: StationFacilities = {
  toilet: false, washlet: false, handicapToilet: false, ostomy: false,
  parking: false, coveredParking: false, evCharger: false, wifi: false,
  atm: false, information: false, shop: false, restaurant: false,
  cafe: false, farmMarket: false, nursingRoom: false, diaperChanging: false,
  kidsSpace: false, onsen: false, lodging: false, campground: false,
  observatory: false, dogRun: false, park: false, museum: false,
  experience: false, restArea: false, creditCard: false, cashless: false,
  aed: false,
};

export function toFacilities(raw: unknown): StationFacilities {
  const parsed = facilitiesSchema.safeParse(raw);
  if (!parsed.success) {
    return { ...DEFAULT_FACILITIES };
  }
  const f = parsed.data;
  return {
    toilet: f.toilet,
    washlet: f.washlet,
    handicapToilet: f.handicap_toilet,
    ostomy: f.ostomy,
    parking: f.parking,
    coveredParking: f.covered_parking,
    evCharger: f.ev_charger,
    wifi: f.wifi,
    atm: f.atm,
    information: f.information,
    shop: f.shop,
    restaurant: f.restaurant,
    cafe: f.cafe,
    farmMarket: f.farm_market,
    nursingRoom: f.nursing_room,
    diaperChanging: f.diaper_changing,
    kidsSpace: f.kids_space,
    onsen: f.onsen,
    lodging: f.lodging,
    campground: f.campground,
    observatory: f.observatory,
    dogRun: f.dog_run,
    park: f.park,
    museum: f.museum,
    experience: f.experience,
    restArea: f.rest_area,
    creditCard: f.credit_card,
    cashless: f.cashless,
    aed: f.aed,
  };
}

function isAreaGroup(value: string): value is AreaGroup {
  return (AREA_GROUPS as readonly string[]).includes(value);
}

export function toAreaGroup(value: string): AreaGroup {
  return isAreaGroup(value) ? value : "道央";
}

/** PostgREST フィルタ構文の特殊文字を除去 */
export function sanitizeSearchTerm(term: string): string {
  return term.replace(/[%_,.()\\]/g, "");
}

/**
 * DBから取得した生の行データ。
 * facilities は unknown 型とし、toFacilities() 内で Zod バリデーション＋デフォルト値
 * フォールバックを行う設計。database.ts の Json | null とは意図的に乖離させている。
 */
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
  "id" | "name" | "name_kana" | "address" | "area_group" | "image_url" | "facilities"
>;

export function toListItem(row: StationListRow): StationListItem {
  return {
    id: row.id,
    name: row.name,
    nameKana: row.name_kana,
    address: row.address,
    areaGroup: toAreaGroup(row.area_group),
    imageUrl: row.image_url,
    facilities: toFacilities(row.facilities),
  };
}
