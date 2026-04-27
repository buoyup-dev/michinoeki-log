import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import {
  toSpotMarker,
  toSpotDetail,
  toSpotListItem,
  type SpotMarkerRow,
  type SpotListRow,
  type SpotRow,
} from "@/lib/db/transforms/spot";
import type { SpotMarker, SpotDetail, SpotListItem } from "@/types/spot";

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
    // 地図本体の表示を妨げないよう、スポット取得失敗時は空配列にフォールバックする
    // （getSpotsForList / getSpotDetail とは意図的に挙動を分けている）
    console.error("getSpotsForMap error:", error.message, error.code);
    return [];
  }

  return (data as SpotMarkerRow[]).map(toSpotMarker);
});

/** 一覧表示用スポット取得 */
export const getSpotsForList = cache(async function getSpotsForList(): Promise<SpotListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("spots")
    .select("id, name, name_kana, category, address, image_url")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    console.error("getSpotsForList error:", error.message, error.code);
    throw new Error("Failed to fetch spots for list");
  }

  return (data as SpotListRow[]).map(toSpotListItem);
});

/** generateStaticParams 用：全スポットID取得（ビルド時に実行されるため cookies 不要の staticClient を使用） */
export async function getAllSpotIds(): Promise<string[]> {
  const supabase = createStaticClient();

  const { data, error } = await supabase
    .from("spots")
    .select("id")
    .eq("is_active", true);

  if (error) {
    console.error("getAllSpotIds error:", error.message, error.code);
    throw new Error("Failed to fetch spot ids");
  }

  return (data ?? []).map((row) => row.id);
}

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
    throw new Error("Failed to fetch spot detail");
  }

  if (!data) return null;

  return toSpotDetail(data as SpotRow);
});
