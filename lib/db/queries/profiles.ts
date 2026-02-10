import "server-only";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/auth";
import { toProfile } from "@/lib/db/transforms/profile";
import type { Profile } from "@/types/profile";

export async function getMyProfile(): Promise<Profile | null> {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url, role, created_at, updated_at")
    .eq("id", user.id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    console.error("getMyProfile error:", error.message, error.code);
    throw new Error("Failed to fetch profile");
  }

  return data ? toProfile(data) : null;
}

export async function getProfileForHeader(): Promise<{
  displayName: string;
  avatarUrl: string | null;
} | null> {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("display_name, avatar_url")
    .eq("id", user.id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    console.error("getProfileForHeader error:", error.message, error.code);
    return null;
  }

  return data
    ? { displayName: data.display_name ?? "", avatarUrl: data.avatar_url || null }
    : null;
}
