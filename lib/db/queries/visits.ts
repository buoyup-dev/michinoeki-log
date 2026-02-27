import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/auth";
import { toVisit, toVisitWithStation, type VisitWithStationRow } from "@/lib/db/transforms/visit";
import type { Visit, VisitWithStation, VisitStats } from "@/types/visit";
import type { StationVisitBadgeRecord } from "@/types/badge";

type VisitBadgeRow = { station_id: string; is_gps_verified: boolean };

/** 道の駅ごとに最良バッジを集計（GPS認証済み=true > 自己申告=false） */
function aggregateBestBadges(visits: VisitBadgeRow[]): Map<string, boolean> {
  const best = new Map<string, boolean>();
  for (const v of visits) {
    const current = best.get(v.station_id);
    if (current === undefined || (!current && v.is_gps_verified)) {
      best.set(v.station_id, v.is_gps_verified);
    }
  }
  return best;
}

const getTotalStationCount = cache(async function getTotalStationCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("stations")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("getTotalStationCount error:", error.message, error.code);
    throw new Error("Failed to count stations");
  }

  return count ?? 0;
});

export const getVisitStats = cache(async function getVisitStats(): Promise<VisitStats | null> {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("visits")
    .select("station_id, is_gps_verified, visited_at");

  if (error) {
    console.error("getVisitStats error:", error.message, error.code);
    throw new Error("Failed to fetch visit stats");
  }

  const totalStations = await getTotalStationCount();
  const visits = data ?? [];
  const bestBadgeByStation = aggregateBestBadges(visits);

  let gpsVerifiedCount = 0;
  let selfReportedCount = 0;
  for (const isGps of bestBadgeByStation.values()) {
    if (isGps) gpsVerifiedCount++;
    else selfReportedCount++;
  }

  const now = new Date();
  const thisMonthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;

  return {
    totalVisits: visits.length,
    uniqueStationsVisited: bestBadgeByStation.size,
    totalStations,
    completionRate: totalStations > 0 ? Math.round((bestBadgeByStation.size / totalStations) * 100) : 0,
    gpsVerifiedCount,
    selfReportedCount,
    thisMonthVisits: visits.filter((v) => v.visited_at >= thisMonthStart).length,
  };
});

export const getVisitCount = cache(async function getVisitCount(): Promise<number> {
  const user = await getUser();
  if (!user) return 0;

  const supabase = await createClient();
  const { count, error } = await supabase
    .from("visits")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("getVisitCount error:", error.message, error.code);
    throw new Error("Failed to count visits");
  }

  return count ?? 0;
});

export const getVisitHistory = cache(async function getVisitHistory(
  limit = 20,
  offset = 0,
): Promise<VisitWithStation[]> {
  const user = await getUser();
  if (!user) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("visits")
    .select("*, stations!inner(id, name, image_url, area_group)")
    .order("visited_at", { ascending: false })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("getVisitHistory error:", error.message, error.code);
    throw new Error("Failed to fetch visit history");
  }

  return ((data ?? []) as VisitWithStationRow[]).map(toVisitWithStation);
});

export const getLatestVisitToStation = cache(async function getLatestVisitToStation(
  stationId: string,
): Promise<Visit | null> {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("visits")
    .select("*")
    .eq("station_id", stationId)
    .order("visited_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("getLatestVisitToStation error:", error.message, error.code);
    throw new Error("Failed to fetch latest visit");
  }

  return data ? toVisit(data) : null;
});

export const getVisitedStationBadges = cache(async function getVisitedStationBadges(): Promise<StationVisitBadgeRecord> {
  const user = await getUser();
  if (!user) return {};

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("visits")
    .select("station_id, is_gps_verified");

  if (error) {
    console.error("getVisitedStationBadges error:", error.message, error.code);
    throw new Error("Failed to fetch visited station badges");
  }

  const visits = data ?? [];
  const bestBadge = aggregateBestBadges(visits);

  const record: StationVisitBadgeRecord = {};
  for (const [stationId, isGps] of bestBadge) {
    record[stationId] = isGps ? "gold" : "silver";
  }
  return record;
});
