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

describe("toFacilities", () => {
  it("正常な facilities オブジェクトを変換する", () => {
    const raw = {
      toilet: true,
      ev_charger: false,
      wifi: true,
      restaurant: true,
      shop: false,
      baby_room: false,
      handicap_toilet: true,
      atm: false,
      information: true,
      parking: 50,
    };

    const result = toFacilities(raw);

    expect(result).toEqual({
      toilet: true,
      evCharger: false,
      wifi: true,
      restaurant: true,
      shop: false,
      babyRoom: false,
      handicapToilet: true,
      atm: false,
      information: true,
      parking: 50,
    });
  });

  it("null の場合はデフォルト値を返す", () => {
    const result = toFacilities(null);

    expect(result.toilet).toBe(false);
    expect(result.evCharger).toBe(false);
    expect(result.parking).toBeNull();
  });

  it("不正な値の場合はデフォルト値を返す", () => {
    const result = toFacilities("invalid");

    expect(result.toilet).toBe(false);
    expect(result.parking).toBeNull();
  });

  it("一部のフィールドが欠けている場合はデフォルト値で埋める", () => {
    const raw = { toilet: true };
    const result = toFacilities(raw);

    expect(result.toilet).toBe(true);
    expect(result.wifi).toBe(false);
    expect(result.parking).toBeNull();
  });

  it("parking が null の場合はそのまま null を返す", () => {
    const raw = { parking: null };
    const result = toFacilities(raw);

    expect(result.parking).toBeNull();
  });
});

describe("toAreaGroup", () => {
  it("有効なエリアグループをそのまま返す", () => {
    expect(toAreaGroup("道東")).toBe("道東");
    expect(toAreaGroup("道北")).toBe("道北");
    expect(toAreaGroup("道央")).toBe("道央");
    expect(toAreaGroup("道南")).toBe("道南");
  });

  it("無効な値の場合は道央をデフォルトとして返す", () => {
    expect(toAreaGroup("unknown")).toBe("道央");
    expect(toAreaGroup("")).toBe("道央");
    expect(toAreaGroup("東京")).toBe("道央");
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
    area: "テスト振興局",
    area_group: "道東",
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
    expect(result.areaGroup).toBe("道東");
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
      latitude: 43.0,
      longitude: 143.0,
      area_group: "道北",
      image_url: "https://example.com/image.jpg",
      facilities: { toilet: true, ev_charger: false, wifi: true, restaurant: false, shop: false, baby_room: false, handicap_toilet: false, atm: false, information: false, parking: null },
    };

    const result = toMapItem(row);

    expect(result).toEqual({
      id: "test-id",
      name: "道の駅テスト",
      latitude: 43.0,
      longitude: 143.0,
      areaGroup: "道北",
      imageUrl: "https://example.com/image.jpg",
      facilities: { toilet: true, evCharger: false, wifi: true, restaurant: false, shop: false, babyRoom: false, handicapToilet: false, atm: false, information: false, parking: null },
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
      area_group: "道南",
      image_url: null,
      facilities: { toilet: true, ev_charger: false, wifi: true, restaurant: false, shop: false, baby_room: false, handicap_toilet: false, atm: false, information: false, parking: null },
    };

    const result = toListItem(row);

    expect(result).toEqual({
      id: "test-id",
      name: "道の駅テスト",
      nameKana: "みちのえきてすと",
      address: "北海道テスト市1-1",
      areaGroup: "道南",
      imageUrl: null,
      facilities: { toilet: true, evCharger: false, wifi: true, restaurant: false, shop: false, babyRoom: false, handicapToilet: false, atm: false, information: false, parking: null },
    });
  });
});
