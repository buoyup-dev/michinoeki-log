import { describe, it, expect } from "vitest";
import {
  matchesFacilityFilter,
  matchesStationFilters,
  createDefaultFilters,
  countActiveFilters,
} from "@/types/station-filter";
import type { StationFacilities, AreaGroup } from "@/types/station";

const baseFacilities: StationFacilities = {
  toilet: false, washlet: false, handicapToilet: false, ostomy: false,
  parking: false, coveredParking: false, evCharger: false, wifi: false,
  atm: false, information: false, shop: false, restaurant: false,
  cafe: false, farmMarket: false, nursingRoom: false, diaperChanging: false,
  kidsSpace: false, onsen: false, lodging: false, campground: false,
  observatory: false, dogRun: false, park: false, museum: false,
  experience: false, restArea: false, creditCard: false, cashless: false,
  aed: false,
};

function withFacilities(overrides: Partial<StationFacilities>): StationFacilities {
  return { ...baseFacilities, ...overrides };
}

function makeStation(overrides: {
  id?: string;
  areaGroup?: AreaGroup;
  facilities?: Partial<StationFacilities>;
}) {
  return {
    id: overrides.id ?? "test-id",
    areaGroup: overrides.areaGroup ?? "道央" as AreaGroup,
    facilities: withFacilities(overrides.facilities ?? {}),
  };
}

describe("matchesFacilityFilter", () => {
  describe("dining フィルタ", () => {
    it("restaurant=true でマッチ", () => {
      expect(matchesFacilityFilter("dining", withFacilities({ restaurant: true }))).toBe(true);
    });

    it("cafe=true でもマッチ（OR条件）", () => {
      expect(matchesFacilityFilter("dining", withFacilities({ cafe: true }))).toBe(true);
    });

    it("farmMarket=true でもマッチ（OR条件）", () => {
      expect(matchesFacilityFilter("dining", withFacilities({ farmMarket: true }))).toBe(true);
    });

    it("全て false でマッチしない", () => {
      expect(matchesFacilityFilter("dining", baseFacilities)).toBe(false);
    });
  });

  describe("kids フィルタ", () => {
    it("nursingRoom=true でマッチ", () => {
      expect(matchesFacilityFilter("kids", withFacilities({ nursingRoom: true }))).toBe(true);
    });

    it("diaperChanging=true でマッチ", () => {
      expect(matchesFacilityFilter("kids", withFacilities({ diaperChanging: true }))).toBe(true);
    });

    it("kidsSpace=true でマッチ", () => {
      expect(matchesFacilityFilter("kids", withFacilities({ kidsSpace: true }))).toBe(true);
    });

    it("3つ全て false でマッチしない", () => {
      expect(matchesFacilityFilter("kids", baseFacilities)).toBe(false);
    });
  });

  describe("onsenLodging フィルタ", () => {
    it("onsen=true でマッチ", () => {
      expect(matchesFacilityFilter("onsenLodging", withFacilities({ onsen: true }))).toBe(true);
    });

    it("lodging=true でマッチ", () => {
      expect(matchesFacilityFilter("onsenLodging", withFacilities({ lodging: true }))).toBe(true);
    });

    it("両方 false でマッチしない", () => {
      expect(matchesFacilityFilter("onsenLodging", baseFacilities)).toBe(false);
    });
  });

  describe("leisure フィルタ", () => {
    it("park=true でマッチ", () => {
      expect(matchesFacilityFilter("leisure", withFacilities({ park: true }))).toBe(true);
    });

    it("observatory=true でマッチ", () => {
      expect(matchesFacilityFilter("leisure", withFacilities({ observatory: true }))).toBe(true);
    });

    it("campground=true でマッチ", () => {
      expect(matchesFacilityFilter("leisure", withFacilities({ campground: true }))).toBe(true);
    });

    it("全て false でマッチしない", () => {
      expect(matchesFacilityFilter("leisure", baseFacilities)).toBe(false);
    });
  });

  describe("単一キーフィルタ", () => {
    it("evCharger=true でマッチ", () => {
      expect(matchesFacilityFilter("evCharger", withFacilities({ evCharger: true }))).toBe(true);
    });

    it("coveredParking=true でマッチ", () => {
      expect(matchesFacilityFilter("coveredParking", withFacilities({ coveredParking: true }))).toBe(true);
    });

    it("dogRun=true でマッチ", () => {
      expect(matchesFacilityFilter("dogRun", withFacilities({ dogRun: true }))).toBe(true);
    });

    it("museum=true でマッチ", () => {
      expect(matchesFacilityFilter("museum", withFacilities({ museum: true }))).toBe(true);
    });
  });
});

describe("matchesStationFilters", () => {
  it("デフォルトフィルタは全てマッチ", () => {
    const filters = createDefaultFilters();
    expect(matchesStationFilters(makeStation({}), filters)).toBe(true);
  });

  it("エリアフィルタで除外", () => {
    const filters = createDefaultFilters();
    filters.areas.delete("道央");
    expect(matchesStationFilters(makeStation({ areaGroup: "道央" }), filters)).toBe(false);
    expect(matchesStationFilters(makeStation({ areaGroup: "道北" }), filters)).toBe(true);
  });

  it("訪問済みフィルタ（visitBadges なし = 未ログイン時はフィルタ無視）", () => {
    const filters = createDefaultFilters();
    filters.visitFilter = "visited";
    // visitBadges を渡さない → ログイン判定なし → フィルタ無視
    expect(matchesStationFilters(makeStation({}), filters)).toBe(true);
  });

  it("訪問済みフィルタ（ログイン中）", () => {
    const filters = createDefaultFilters();
    filters.visitFilter = "visited";
    const visitBadges = { "visited-id": {} };

    expect(matchesStationFilters(makeStation({ id: "visited-id" }), filters, visitBadges)).toBe(true);
    expect(matchesStationFilters(makeStation({ id: "unvisited-id" }), filters, visitBadges)).toBe(false);
  });

  it("未訪問フィルタ（ログイン中）", () => {
    const filters = createDefaultFilters();
    filters.visitFilter = "unvisited";
    const visitBadges = { "visited-id": {} };

    expect(matchesStationFilters(makeStation({ id: "visited-id" }), filters, visitBadges)).toBe(false);
    expect(matchesStationFilters(makeStation({ id: "unvisited-id" }), filters, visitBadges)).toBe(true);
  });

  it("施設フィルタ（AND条件）", () => {
    const filters = createDefaultFilters();
    filters.facilities.add("evCharger");
    filters.facilities.add("dining");

    // evCharger のみ → false
    expect(matchesStationFilters(
      makeStation({ facilities: { evCharger: true } }), filters
    )).toBe(false);

    // 両方 → true（dining は cafe でもOK）
    expect(matchesStationFilters(
      makeStation({ facilities: { evCharger: true, cafe: true } }), filters
    )).toBe(true);
  });
});

describe("countActiveFilters", () => {
  it("デフォルトは0", () => {
    expect(countActiveFilters(createDefaultFilters())).toBe(0);
  });

  it("エリア未全選択で+1", () => {
    const filters = createDefaultFilters();
    filters.areas.delete("道央");
    expect(countActiveFilters(filters)).toBe(1);
  });

  it("訪問フィルタで+1", () => {
    const filters = createDefaultFilters();
    filters.visitFilter = "visited";
    expect(countActiveFilters(filters)).toBe(1);
  });

  it("施設フィルタは選択数", () => {
    const filters = createDefaultFilters();
    filters.facilities.add("dining");
    filters.facilities.add("dogRun");
    expect(countActiveFilters(filters)).toBe(2);
  });
});
