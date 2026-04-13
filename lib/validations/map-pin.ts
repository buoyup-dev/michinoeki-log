import { z } from "zod/v4";

/** 北海道の地図表示範囲（MapContainer.tsx の maxBounds に準拠） */
const HOKKAIDO_BOUNDS = {
  lat: { min: 41.1, max: 45.8 },
  lng: { min: 139.0, max: 146.5 },
} as const;

/** Supabase Storage ホストに限定した URL バリデーション */
const supabaseImageUrl = (errorMessage: string) =>
  z.url(errorMessage).refine(
    (url) => {
      try {
        const host = new URL(url).host;
        const allowedHost = process.env.NEXT_PUBLIC_SUPABASE_URL
          ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).host
          : "";
        return host === allowedHost;
      } catch { return false; }
    },
    "許可されていないURLです",
  );

export const createMapPinSchema = z.object({
  latitude: z
    .string()
    .transform((v) => parseFloat(v))
    .pipe(
      z
        .number({ error: "緯度が不正です" })
        .min(HOKKAIDO_BOUNDS.lat.min, "北海道の範囲外です")
        .max(HOKKAIDO_BOUNDS.lat.max, "北海道の範囲外です"),
    ),
  longitude: z
    .string()
    .transform((v) => parseFloat(v))
    .pipe(
      z
        .number({ error: "経度が不正です" })
        .min(HOKKAIDO_BOUNDS.lng.min, "北海道の範囲外です")
        .max(HOKKAIDO_BOUNDS.lng.max, "北海道の範囲外です"),
    ),
  memo: z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().max(200, "メモは200文字以内で入力してください"))
    .optional()
    .default(""),
  isPublic: z
    .string()
    .transform((v) => v === "true")
    .pipe(z.boolean()),
  photoUrl: supabaseImageUrl("画像URLが不正です"),
  thumbnailUrl: supabaseImageUrl("サムネイルURLが不正です"),
});

export const updateMapPinMemoSchema = z.object({
  pinId: z.uuid("無効なピンIDです"),
  memo: z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().max(200, "メモは200文字以内で入力してください")),
});

export const deleteMapPinSchema = z.object({
  pinId: z.uuid("無効なピンIDです"),
});

export const updateMapPinPhotoSchema = z.object({
  pinId: z.uuid("無効なピンIDです"),
  photoUrl: supabaseImageUrl("画像URLが不正です"),
  thumbnailUrl: supabaseImageUrl("サムネイルURLが不正です"),
});

export const toggleMapPinVisibilitySchema = z.object({
  pinId: z.uuid("無効なピンIDです"),
  isPublic: z
    .string()
    .transform((v) => v === "true")
    .pipe(z.boolean()),
});
