"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/auth";
import { recordVisitSchema, updateVisitMemoSchema, deleteVisitSchema } from "@/lib/validations/visit";
import { haversineDistance } from "@/lib/utils/geo";
import type { ActionResult, ActionState } from "@/types/actions";

const GPS_THRESHOLD_METERS = 1000;

export async function recordVisit(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionResult> {
  const user = await getUser();
  if (!user) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "ログインが必要です" },
    };
  }

  const raw = {
    stationId: formData.get("stationId"),
    memo: formData.get("memo"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
  };

  const parsed = recordVisitSchema.safeParse(raw);
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

  const { stationId, memo, latitude, longitude } = parsed.data;

  const supabase = await createClient();

  // 道の駅の座標を取得
  const { data: station, error: stationError } = await supabase
    .from("stations")
    .select("id, latitude, longitude")
    .eq("id", stationId)
    .single();

  if (stationError || !station) {
    return {
      success: false,
      error: { code: "NOT_FOUND", message: "道の駅が見つかりません" },
    };
  }

  // GPS 検証（サーバー側で実施）
  let isGpsVerified = false;
  if (latitude != null && longitude != null) {
    const distance = haversineDistance(
      latitude,
      longitude,
      station.latitude,
      station.longitude,
    );
    isGpsVerified = distance <= GPS_THRESHOLD_METERS;
  }

  // 訪問記録を挿入
  const { error: insertError } = await supabase.from("visits").insert({
    user_id: user.id,
    station_id: stationId,
    memo: memo || null,
    latitude,
    longitude,
    is_gps_verified: isGpsVerified,
  });

  if (insertError) {
    console.error("recordVisit insert error:", insertError.message, insertError.code);
    return {
      success: false,
      error: { code: "INTERNAL_ERROR", message: "訪問記録の保存に失敗しました" },
    };
  }

  revalidatePath(`/stations/${stationId}`);
  revalidatePath("/mypage");
  redirect(`/stations/${stationId}?visited=true`);
}

export async function updateVisitMemo(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionResult> {
  const user = await getUser();
  if (!user) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "ログインが必要です" },
    };
  }

  const raw = {
    visitId: formData.get("visitId"),
    memo: formData.get("memo"),
  };

  const parsed = updateVisitMemoSchema.safeParse(raw);
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

  const { data: updatedVisits, error } = await supabase
    .from("visits")
    .update({ memo: parsed.data.memo || null })
    .eq("id", parsed.data.visitId)
    .eq("user_id", user.id)
    .select("id");

  if (error) {
    console.error("updateVisitMemo error:", error.message, error.code);
    return {
      success: false,
      error: { code: "INTERNAL_ERROR", message: "メモの更新に失敗しました" },
    };
  }

  if (!updatedVisits || updatedVisits.length === 0) {
    return {
      success: false,
      error: { code: "NOT_FOUND", message: "訪問記録が見つかりません" },
    };
  }

  revalidatePath("/mypage");
  revalidatePath("/mypage/history");
  return { success: true, data: undefined };
}

export async function deleteVisit(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionResult> {
  const user = await getUser();
  if (!user) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "ログインが必要です" },
    };
  }

  const raw = { visitId: formData.get("visitId") };
  const parsed = deleteVisitSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: { code: "VALIDATION_ERROR", message: "無効なリクエストです" },
    };
  }

  const supabase = await createClient();

  // 削除と所有権検証を1クエリで実施
  const { data: deletedVisits, error } = await supabase
    .from("visits")
    .delete()
    .eq("id", parsed.data.visitId)
    .eq("user_id", user.id)
    .select("station_id");

  if (error) {
    console.error("deleteVisit error:", error.message, error.code);
    return {
      success: false,
      error: { code: "INTERNAL_ERROR", message: "訪問記録の削除に失敗しました" },
    };
  }

  if (!deletedVisits || deletedVisits.length === 0) {
    return {
      success: false,
      error: { code: "NOT_FOUND", message: "訪問記録が見つかりません" },
    };
  }

  revalidatePath("/mypage");
  revalidatePath("/mypage/history");
  revalidatePath(`/stations/${deletedVisits[0].station_id}`);
  return { success: true, data: undefined };
}
