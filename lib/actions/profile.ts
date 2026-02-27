"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { updateProfileSchema } from "@/lib/validations/auth";
import type { ActionResult, ActionState } from "@/types/actions";

export async function updateProfile(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    displayName: formData.get("displayName"),
  };

  const parsed = updateProfileSchema.safeParse(raw);
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

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "ログインが必要です" },
    };
  }

  const [profileResult, authResult] = await Promise.all([
    supabase
      .from("profiles")
      .update({ display_name: parsed.data.displayName })
      .eq("id", user.id),
    supabase.auth.updateUser({
      data: { name: parsed.data.displayName },
    }),
  ]);

  if (profileResult.error) {
    console.error("updateProfile error:", profileResult.error.message, profileResult.error.code);
    return {
      success: false,
      error: { code: "INTERNAL_ERROR", message: "プロフィールの更新に失敗しました" },
    };
  }

  if (authResult.error) {
    console.error("updateUser metadata error:", authResult.error.message);
  }

  revalidatePath("/mypage");
  revalidatePath("/mypage/settings");
  revalidatePath("/", "layout");
  return { success: true, data: undefined };
}
