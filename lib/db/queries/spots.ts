import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import {
  toSpotMarker,
  toSpotDetail,
  type SpotMarkerRow,
  type SpotRow,
} from "@/lib/db/transforms/spot";
import type { SpotMarker, SpotDetail } from "@/types/spot";

/**
 * 地図表示用のスポット一覧（表示中のスポットのみ）。
 * 代表画像は spots.image_url を直接使用し、spot_photos の JOIN は行わない。
 * image_url は toSpotMarker で SpotMarker.thumbnailUrl にマッピングされる。
 * Phase 2 で spot_photos（Supabase Storage）に移行する際はここの select と
 * SpotMarkerRow 型・toSpotMarker を合わせて変更すること。
 */
export const getSpotsForMap = cache(async function getSpotsForMap(): Promise<SpotMarker[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("spots")
    .select("id, name, category, latitude, longitude, image_url")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    console.error("getSpotsForMap error:", error.message, error.code);
    return [];
  }

  return (data as SpotMarkerRow[]).map(toSpotMarker);
});

/** スポット詳細取得 */
export const getSpotDetail = cache(async function getSpotDetail(id: string): Promise<SpotDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("spots")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("getSpotDetail error:", error.message, error.code);
    return null;
  }

  if (!data) return null;

  return toSpotDetail(data as SpotRow);
});
