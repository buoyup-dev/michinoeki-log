import { describe, it, expect } from "vitest";
import {
  toFacilities,
  toAreaGroup,
  sanitizeSearchTerm,
  toStation,
  toMapItem,
  toListItem,
} from "@/lib/db/transforms/station";
import type { StationRow } from "@/lib/db/transforms/station";

const FULL_FACILITIES_SNAKE = {
  toilet: true,
  washlet: false,
  handicap_toilet: true,
  ostomy: false,
  parking: true,
  covered_parking: false,
  ev_charger: false,
  wifi: true,
  atm: false,
  information: true,
  shop: false,
  restaurant: true,
  cafe: false,
  farm_market: false,
  nursing_room: false,
  diaper_changing: false,
  kids_space: false,
  onsen: false,
  lodging: false,
  campground: false,
  observatory: false,
  dog_run: false,
  park: false,
  museum: false,
  experience: false,
  rest_area: false,
  credit_card: false,
  cashless: false,
  aed: false,
};

const FULL_FACILITIES_CAMEL = {
  toilet: true,
  washlet: false,
  handicapToilet: true,
  ostomy: false,
  parking: true,
  coveredParking: false,
  evCharger: false,
  wifi: true,
  atm: false,
  information: true,
  shop: false,
  restaurant: true,
  cafe: false,
  farmMarket: false,
  nursingRoom: false,
  diaperChanging: false,
  kidsSpace: false,
  onsen: false,
  lodging: false,
  campground: false,
  observatory: false,
  dogRun: false,
  park: false,
  museum: false,
  experience: false,
  restArea: false,
  creditCard: false,
  cashless: false,
  aed: false,
};

describe("toFacilities", () => {
  it("正常な facilities オブジェクトを変換する", () => {
    const result = toFacilities(FULL_FACILITIES_SNAKE);

    expect(result).toEqual(FULL_FACILITIES_CAMEL);
  });

  it("null の場合はデフォルト値を返す", () => {
    const result = toFacilities(null);

    expect(result.toilet).toBe(false);
    expect(result.evCharger).toBe(false);
    expect(result.parking).toBe(false);
  });

  it("不正な値の場合はデフォルト値を返す", () => {
    const result = toFacilities("invalid");

    expect(result.toilet).toBe(false);
    expect(result.parking).toBe(false);
  });

  it("一部のフィールドが欠けている場合はデフォルト値で埋める", () => {
    const raw = { toilet: true };
    const result = toFacilities(raw);

    expect(result.toilet).toBe(true);
    expect(result.wifi).toBe(false);
    expect(result.parking).toBe(false);
  });
});

describe("toAreaGroup", () => {
  it("有効なエリアグループをそのまま返す", () => {
    expect(toAreaGroup("道央")).toBe("道央");
    expect(toAreaGroup("道南")).toBe("道南");
    expect(toAreaGroup("道北")).toBe("道北");
    expect(toAreaGroup("十勝")).toBe("十勝");
    expect(toAreaGroup("オホーツク")).toBe("オホーツク");
    expect(toAreaGroup("釧路・根室")).toBe("釧路・根室");
  });

  it("無効な値の場合は道央をデフォルトとして返す", () => {
    expect(toAreaGroup("unknown")).toBe("道央");
    expect(toAreaGroup("")).toBe("道央");
    expect(toAreaGroup("東京")).toBe("道央");
    expect(toAreaGroup("道東")).toBe("道央");
  });
});

describe("sanitizeSearchTerm", () => {
  it("通常のテキストはそのまま返す", () => {
    expect(sanitizeSearchTerm("道の駅")).toBe("道の駅");
    expect(sanitizeSearchTerm("阿寒")).toBe("阿寒");
  });

  it("PostgREST 特殊文字を除去する", () => {
    expect(sanitizeSearchTerm("test%")).toBe("test");
    expect(sanitizeSearchTerm("test_value")).toBe("testvalue");
    expect(sanitizeSearchTerm("a,b.c(d)e\\f")).toBe("abcdef");
  });

  it("空文字列はそのまま返す", () => {
    expect(sanitizeSearchTerm("")).toBe("");
  });

  it("特殊文字のみの場合は空文字列を返す", () => {
    expect(sanitizeSearchTerm("%_,.()\\")).toBe("");
  });
});

describe("toStation", () => {
  const baseRow: StationRow = {
    id: "test-id",
    name: "道の駅テスト",
    name_kana: "みちのえきてすと",
    address: "北海道テスト市1-1",
    latitude: 43.0,
    longitude: 143.0,
    phone: "0123-45-6789",
    business_hours: "9:00-18:00",
    closed_days: "年末年始",
    website_url: "https://example.com",
    image_url: null,
    area_group: "十勝",
    description: "テスト用の道の駅",
    facilities: { toilet: true, wifi: true },
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  };

  it("snake_case を camelCase に変換する", () => {
    const result = toStation(baseRow);

    expect(result.id).toBe("test-id");
    expect(result.name).toBe("道の駅テスト");
    expect(result.nameKana).toBe("みちのえきてすと");
    expect(result.businessHours).toBe("9:00-18:00");
    expect(result.closedDays).toBe("年末年始");
    expect(result.websiteUrl).toBe("https://example.com");
    expect(result.imageUrl).toBeNull();
    expect(result.areaGroup).toBe("十勝");
    expect(result.createdAt).toBe("2024-01-01T00:00:00Z");
  });

  it("facilities を正しく変換する", () => {
    const result = toStation(baseRow);

    expect(result.facilities.toilet).toBe(true);
    expect(result.facilities.wifi).toBe(true);
    expect(result.facilities.restaurant).toBe(false);
  });

  it("無効な area_group はデフォルトに変換する", () => {
    const row = { ...baseRow, area_group: "invalid" };
    const result = toStation(row);

    expect(result.areaGroup).toBe("道央");
  });
});

describe("toMapItem", () => {
  it("地図用の軽量データに変換する", () => {
    const row = {
      id: "test-id",
      name: "道の駅テスト",
      address: "北海道テスト市1-1",
      latitude: 43.0,
      longitude: 143.0,
      area_group: "オホーツク",
      image_url: "https://example.com/image.jpg",
      facilities: FULL_FACILITIES_SNAKE,
    };

    const result = toMapItem(row);

    expect(result).toEqual({
      id: "test-id",
      name: "道の駅テスト",
      address: "北海道テスト市1-1",
      latitude: 43.0,
      longitude: 143.0,
      areaGroup: "オホーツク",
      imageUrl: "https://example.com/image.jpg",
      facilities: FULL_FACILITIES_CAMEL,
    });
  });
});

describe("toListItem", () => {
  it("一覧用の軽量データに変換する", () => {
    const row = {
      id: "test-id",
      name: "道の駅テスト",
      name_kana: "みちのえきてすと",
      address: "北海道テスト市1-1",
      area_group: "釧路・根室",
      image_url: null,
      facilities: FULL_FACILITIES_SNAKE,
    };

    const result = toListItem(row);

    expect(result).toEqual({
      id: "test-id",
      name: "道の駅テスト",
      nameKana: "みちのえきてすと",
      address: "北海道テスト市1-1",
      areaGroup: "釧路・根室",
      imageUrl: null,
      facilities: FULL_FACILITIES_CAMEL,
    });
  });
});
