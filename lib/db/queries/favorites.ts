import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/auth";
import { toFavoriteWithStation, type FavoriteWithStationRow } from "@/lib/db/transforms/favorite";
import type { FavoriteWithStation } from "@/types/favorite";

export const getFavorites = cache(async function getFavorites(): Promise<FavoriteWithStation[]> {
  const user = await getUser();
  if (!user) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .select("*, stations!inner(id, name, image_url, area_group, address)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getFavorites error:", error.message, error.code);
    throw new Error("Failed to fetch favorites");
  }

  return ((data ?? []) as FavoriteWithStationRow[]).map(toFavoriteWithStation);
});

export const isFavorited = cache(async function isFavorited(stationId: string): Promise<boolean> {
  const user = await getUser();
  if (!user) return false;

  const supabase = await createClient();
  const { count, error } = await supabase
    .from("favorites")
    .select("*", { count: "exact", head: true })
    .eq("station_id", stationId);

  if (error) {
    console.error("isFavorited error:", error.message, error.code);
    throw new Error("Failed to check favorite status");
  }

  return (count ?? 0) > 0;
});

export const getFavoriteStationIds = cache(async function getFavoriteStationIds(): Promise<string[]> {
  const user = await getUser();
  if (!user) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .select("station_id");

  if (error) {
    console.error("getFavoriteStationIds error:", error.message, error.code);
    throw new Error("Failed to fetch favorite station IDs");
  }

  return (data ?? []).map((row) => row.station_id);
});

export const getFavoriteCount = cache(async function getFavoriteCount(): Promise<number> {
  const user = await getUser();
  if (!user) return 0;

  const supabase = await createClient();
  const { count, error } = await supabase
    .from("favorites")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("getFavoriteCount error:", error.message, error.code);
    throw new Error("Failed to count favorites");
  }

  return count ?? 0;
});
