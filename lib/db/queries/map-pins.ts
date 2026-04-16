import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/auth";
import { toMapPinMarker, toMapPinDetail, toMapPinListItem, type MapPinMarkerRow, type MapPinDetailRow, type MapPinListRow } from "@/lib/db/transforms/map-pin";
import type { MapPinMarker, MapPinDetail, MapPinListItem } from "@/types/map-pin";

/** 地図表示用のピン一覧（サムネイル付き） */
export const getMapPinsForMap = cache(async function getMapPinsForMap(): Promise<MapPinMarker[]> {
  const supabase = await createClient();
  const user = await getUser();

  // RLSでもフィルタされるが、意図を明示的にする
  let query = supabase
    .from("map_pins")
    .select("id, user_id, latitude, longitude, memo, is_public, map_pin_photos(thumbnail_url)")
    .order("created_at", { ascending: false });

  if (user) {
    query = query.or(`is_public.eq.true,user_id.eq.${user.id}`);
  } else {
    query = query.eq("is_public", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("getMapPinsForMap error:", error.message, error.code);
    return [];
  }

  return (data as MapPinMarkerRow[])
    .map(toMapPinMarker)
    .filter((pin): pin is MapPinMarker => pin !== null);
});

/** 自分のピン一覧（ページネーション付き） */
export const getMyMapPins = cache(async function getMyMapPins(limit: number, offset: number): Promise<MapPinListItem[]> {
  const user = await getUser();
  if (!user) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("map_pins")
    .select("id, memo, is_public, created_at, map_pin_photos(thumbnail_url)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("getMyMapPins error:", error.message, error.code);
    return [];
  }

  return (data as MapPinListRow[]).map(toMapPinListItem);
});

/** 自分のピン総数 */
export const getMyMapPinCount = cache(async function getMyMapPinCount(): Promise<number> {
  const user = await getUser();
  if (!user) return 0;

  const supabase = await createClient();
  const { count, error } = await supabase
    .from("map_pins")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (error) {
    console.error("getMyMapPinCount error:", error.message, error.code);
    return 0;
  }

  return count ?? 0;
});

/** ピン詳細取得（写真情報付き） */
export const getMapPinDetail = cache(async function getMapPinDetail(id: string): Promise<MapPinDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("map_pins")
    .select("*, map_pin_photos(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getMapPinDetail error:", error.message, error.code);
    return null;
  }

  if (!data) return null;

  return toMapPinDetail(data as MapPinDetailRow);
});
