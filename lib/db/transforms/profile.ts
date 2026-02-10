import type { Tables } from "@/types/database";
import type { Profile } from "@/types/profile";

export type ProfileRow = Tables<"profiles">;

export function toProfile(row: ProfileRow): Profile {
  if (row.role !== "user" && row.role !== "admin") {
    console.warn(`Unexpected profile role: "${row.role}" for user ${row.id}`);
  }

  return {
    id: row.id,
    displayName: row.display_name ?? "",
    avatarUrl: row.avatar_url || null,
    role: row.role === "admin" ? "admin" : "user",
    createdAt: row.created_at,
  };
}
