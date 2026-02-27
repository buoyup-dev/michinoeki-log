"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getUser } from "@/lib/supabase/auth";
import type { ActionResult } from "@/types/actions";

export async function deleteAccount(): Promise<ActionResult> {
  const user = await getUser();

  if (!user) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "ログインが必要です" },
    };
  }

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(user.id);

  if (error) {
    console.error("deleteAccount error:", error.message);
    return {
      success: false,
      error: { code: "INTERNAL_ERROR", message: "アカウントの削除に失敗しました" },
    };
  }

  // セッションをクリア（失敗しても削除は完了しているため続行）
  const supabase = await createClient();
  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError) {
    console.error("deleteAccount signOut error:", signOutError.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
