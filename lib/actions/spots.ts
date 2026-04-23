"use server";

import { z } from "zod";
import { getSpotsForMap, getSpotDetail } from "@/lib/db/queries/spots";
import type { SpotMarker, SpotDetail } from "@/types/spot";

const SpotIdSchema = z.string().uuid();

/** 地図表示用のスポット一覧を取得（Client Componentから呼び出し用） */
export async function fetchSpots(): Promise<SpotMarker[] | null> {
  try {
    return await getSpotsForMap();
  } catch (err) {
    console.error("fetchSpots error:", err);
    return null;
  }
}

/** スポット詳細を取得（Client Componentから呼び出し用） */
export async function fetchSpotDetail(spotId: string): Promise<SpotDetail | null> {
  const parsed = SpotIdSchema.safeParse(spotId);
  if (!parsed.success) return null;
  try {
    return await getSpotDetail(parsed.data);
  } catch (err) {
    console.error("fetchSpotDetail error:", err);
    return null;
  }
}
