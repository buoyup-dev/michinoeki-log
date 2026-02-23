import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import { toStation, toMapItem, toListItem, sanitizeSearchTerm } from "@/lib/db/transforms/station";
import type { Station, StationListItem, StationMapItem } from "@/types/station";

type GetStationsOptions = {
  areaGroup?: string;
  search?: string;
};

export async function getStations(options?: GetStationsOptions): Promise<Station[]> {
  const supabase = await createClient();
  let query = supabase.from("stations").select("*").order("name");

  if (options?.areaGroup) {
    query = query.eq("area_group", options.areaGroup);
  }

  if (options?.search) {
    const term = sanitizeSearchTerm(options.search);
    if (term) {
      query = query.or(
        `name.ilike.%${term}%,name_kana.ilike.%${term}%,address.ilike.%${term}%`
      );
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("getStations error:", error.message, error.code);
    throw new Error("Failed to fetch stations");
  }

  return (data ?? []).map(toStation);
}

export async function getStationsForList(): Promise<StationListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stations")
    .select("id, name, name_kana, address, area_group, image_url")
    .order("name");

  if (error) {
    console.error("getStationsForList error:", error.message, error.code);
    throw new Error("Failed to fetch stations for list");
  }

  return (data ?? []).map(toListItem);
}

export async function getStationsForMap(): Promise<StationMapItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stations")
    .select("id, name, latitude, longitude, area_group, image_url, facilities");

  if (error) {
    console.error("getStationsForMap error:", error.message, error.code);
    throw new Error("Failed to fetch stations for map");
  }

  return (data ?? []).map(toMapItem);
}

export const getStationById = cache(async function getStationById(id: string): Promise<Station | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    console.error("getStationById error:", error.message, error.code);
    throw new Error("Failed to fetch station");
  }

  return data ? toStation(data) : null;
});

export async function getAllStationIds(): Promise<string[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase.from("stations").select("id");

  if (error) {
    console.error("getAllStationIds error:", error.message, error.code);
    throw new Error("Failed to fetch station ids");
  }

  return (data ?? []).map((row) => row.id);
}
