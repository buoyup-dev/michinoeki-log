import { describe, it, expect } from "vitest";
import { haversineDistance } from "@/lib/utils/geo";

describe("haversineDistance", () => {
  it("同一地点で 0m を返す", () => {
    const d = haversineDistance(43.0687, 141.3508, 43.0687, 141.3508);
    expect(d).toBe(0);
  });

  it("札幌駅 → 新千歳空港 の距離が約 42km", () => {
    // 札幌駅: 43.0687, 141.3508
    // 新千歳空港: 42.7752, 141.6925
    const d = haversineDistance(43.0687, 141.3508, 42.7752, 141.6925);
    expect(d).toBeGreaterThan(40_000);
    expect(d).toBeLessThan(45_000);
  });

  it("近距離（約 500m）を正確に計算する", () => {
    // 札幌駅付近の2点（約 500m）
    const d = haversineDistance(43.0687, 141.3508, 43.0732, 141.3508);
    expect(d).toBeGreaterThan(400);
    expect(d).toBeLessThan(600);
  });

  it("GPS 検証しきい値（1km）付近の距離を正確に判定できる", () => {
    // 約 900m（1km 以内）
    const d = haversineDistance(43.0687, 141.3508, 43.0768, 141.3508);
    expect(d).toBeLessThan(1000);

    // 約 1100m（1km 超）
    const d2 = haversineDistance(43.0687, 141.3508, 43.0787, 141.3508);
    expect(d2).toBeGreaterThan(1000);
  });
});
