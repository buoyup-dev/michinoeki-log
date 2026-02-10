import { z } from "zod/v4";

export const signInSchema = z.object({
  email: z.email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .max(128, "パスワードは128文字以内で入力してください"),
});

export const signUpSchema = z.object({
  displayName: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z.string()
        .min(1, "表示名を入力してください")
        .max(50, "表示名は50文字以内で入力してください"),
    ),
  email: z.email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .max(128, "パスワードは128文字以内で入力してください"),
});

export const updateProfileSchema = z.object({
  displayName: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z.string()
        .min(1, "表示名を入力してください")
        .max(50, "表示名は50文字以内で入力してください"),
    ),
});
