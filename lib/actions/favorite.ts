"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/auth";
import { toggleFavoriteSchema } from "@/lib/validations/favorite";
import type { ActionResult, ActionState } from "@/types/actions";

export async function toggleFavorite(
  _prevState: ActionState<{ isFavorited: boolean }>,
  formData: FormData,
): Promise<ActionResult<{ isFavorited: boolean }>> {
  const user = await getUser();
  if (!user) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "ログインが必要です" },
    };
  }

  const raw = { stationId: formData.get("stationId") };
  const parsed = toggleFavoriteSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      fieldErrors[key] = fieldErrors[key] ?? [];
      fieldErrors[key].push(issue.message);
    }
    return {
      success: false,
      error: { code: "VALIDATION_ERROR", message: "入力内容を確認してください", fieldErrors },
    };
  }

  const { stationId } = parsed.data;
  const supabase = await createClient();

  // INSERT を試み、ユニーク制約違反なら既存 → DELETE（レースコンディション防止）
  let isFavorited: boolean;

  const { error: insertError } = await supabase
    .from("favorites")
    .insert({ user_id: user.id, station_id: stationId });

  if (insertError?.code === "23505") {
    // ユニーク制約違反 = 既に存在 → 解除
    const { error: deleteError } = await supabase
      .from("favorites")
      .delete()
      .eq("station_id", stationId);

    if (deleteError) {
      console.error("toggleFavorite delete error:", deleteError.message, deleteError.code);
      return {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "お気に入りの解除に失敗しました" },
      };
    }
    isFavorited = false;
  } else if (insertError) {
    console.error("toggleFavorite insert error:", insertError.message, insertError.code);
    return {
      success: false,
      error: { code: "INTERNAL_ERROR", message: "お気に入りの追加に失敗しました" },
    };
  } else {
    isFavorited = true;
  }

  revalidatePath(`/stations/${stationId}`);
  revalidatePath("/mypage");
  revalidatePath("/mypage/favorites");

  return { success: true, data: { isFavorited } };
}
