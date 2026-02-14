import { z } from "zod/v4";

export const recordVisitSchema = z.object({
  stationId: z.uuid("無効な道の駅IDです"),
  memo: z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().max(500, "メモは500文字以内で入力してください"))
    .optional()
    .default(""),
  latitude: z
    .string()
    .transform((v) => (v === "" ? null : parseFloat(v)))
    .pipe(z.number().min(-90).max(90).nullable()),
  longitude: z
    .string()
    .transform((v) => (v === "" ? null : parseFloat(v)))
    .pipe(z.number().min(-180).max(180).nullable()),
}).refine(
  (d) => (d.latitude == null) === (d.longitude == null),
  { message: "緯度と経度は両方指定してください", path: ["latitude"] },
);

export const updateVisitMemoSchema = z.object({
  visitId: z.uuid("無効な訪問IDです"),
  memo: z
    .string()
    .transform((v) => v.trim())
    .pipe(z.string().max(500, "メモは500文字以内で入力してください")),
});

export const deleteVisitSchema = z.object({
  visitId: z.uuid("無効な訪問IDです"),
});
