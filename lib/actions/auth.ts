"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { signInSchema, signUpSchema } from "@/lib/validations/auth";
import type { ActionResult, ActionState } from "@/types/actions";

export async function signIn(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = signInSchema.safeParse(raw);
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
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return {
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "メールアドレスまたはパスワードが正しくありません",
      },
    };
  }

  const next = formData.get("next");
  const redirectTo =
    typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? next : "/";

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function signUp(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionResult> {
  const raw = {
    displayName: formData.get("displayName"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = signUpSchema.safeParse(raw);
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
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        name: parsed.data.displayName,
      },
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return {
        success: false,
        error: {
          code: "CONFLICT",
          message: "このメールアドレスは既に登録されています",
        },
      };
    }
    return {
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "アカウントの作成に失敗しました",
      },
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("signOut error:", error.message);
  }
  revalidatePath("/", "layout");
  redirect("/");
}
