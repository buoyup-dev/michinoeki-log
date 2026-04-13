"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/auth";
import {
  createMapPinSchema,
  updateMapPinMemoSchema,
  updateMapPinPhotoSchema,
  deleteMapPinSchema,
  toggleMapPinVisibilitySchema,
} from "@/lib/validations/map-pin";
import { getMapPinsForMap, getMapPinDetail } from "@/lib/db/queries/map-pins";
import type { MapPinDetail, MapPinMarker } from "@/types/map-pin";
import type { ActionResult, ActionState } from "@/types/actions";

/** Storage公開URLからバケット内パスを抽出する */
function extractStoragePath(url: string): string | null {
  const match = url.match(/\/map-pin-photos\/(.+)$/);
  return match ? match[1] : null;
}

/** 地図表示用のピン一覧を取得（Client Componentから呼び出し用） */
export async function fetchMapPins(): Promise<MapPinMarker[] | null> {
  try {
    return await getMapPinsForMap();
  } catch (err) {
    console.error("fetchMapPins error:", err);
    return null;
  }
}

/** ピン詳細を取得（Client Componentから呼び出し用） */
export async function fetchMapPinDetail(pinId: string): Promise<MapPinDetail | null> {
  return getMapPinDetail(pinId);
}

type CreatedPin = {
  id: string;
  userId: string;
  latitude: number;
  longitude: number;
  memo: string | null;
  thumbnailUrl: string;
  isPublic: boolean;
};

export async function createMapPin(
  _prevState: ActionState<CreatedPin>,
  formData: FormData,
): Promise<ActionResult<CreatedPin>> {
  const user = await getUser();
  if (!user) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "ログインが必要です" },
    };
  }

  const raw = {
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
    memo: formData.get("memo"),
    isPublic: formData.get("isPublic"),
    photoUrl: formData.get("photoUrl"),
    thumbnailUrl: formData.get("thumbnailUrl"),
  };

  const parsed = createMapPinSchema.safeParse(raw);
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

  const { latitude, longitude, memo, isPublic, photoUrl, thumbnailUrl } = parsed.data;

  const supabase = await createClient();

  // ピンを作成
  const { data: pin, error: pinError } = await supabase
    .from("map_pins")
    .insert({
      user_id: user.id,
      latitude,
      longitude,
      memo: memo || null,
      is_public: isPublic,
    })
    .select("id")
    .single();

  if (pinError || !pin) {
    console.error("createMapPin insert error:", pinError?.message, pinError?.code);
    return {
      success: false,
      error: { code: "INTERNAL_ERROR", message: "ピンの保存に失敗しました" },
    };
  }

  // 写真レコードを作成
  const { error: photoError } = await supabase
    .from("map_pin_photos")
    .insert({
      pin_id: pin.id,
      photo_url: photoUrl,
      thumbnail_url: thumbnailUrl,
      sort_order: 0,
    });

  if (photoError) {
    console.error("createMapPin photo insert error:", photoError.message, photoError.code);
    // ピンは作成済みだが写真の保存に失敗 → ピンも削除
    const { error: rollbackError } = await supabase.from("map_pins").delete().eq("id", pin.id);
    if (rollbackError) {
      console.error("createMapPin rollback error: orphaned pin", pin.id, rollbackError.message);
    }
    return {
      success: false,
      error: { code: "INTERNAL_ERROR", message: "写真の保存に失敗しました" },
    };
  }

  revalidatePath("/");
  return {
    success: true,
    data: {
      id: pin.id,
      userId: user.id,
      latitude,
      longitude,
      memo: memo || null,
      thumbnailUrl,
      isPublic,
    },
  };
}

export async function updateMapPinMemo(
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
    pinId: formData.get("pinId"),
    memo: formData.get("memo"),
  };

  const parsed = updateMapPinMemoSchema.safeParse(raw);
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

  const { data: updatedPins, error } = await supabase
    .from("map_pins")
    .update({ memo: parsed.data.memo || null })
    .eq("id", parsed.data.pinId)
    .eq("user_id", user.id)
    .select("id");

  if (error) {
    console.error("updateMapPinMemo error:", error.message, error.code);
    return {
      success: false,
      error: { code: "INTERNAL_ERROR", message: "メモの更新に失敗しました" },
    };
  }

  if (!updatedPins || updatedPins.length === 0) {
    return {
      success: false,
      error: { code: "NOT_FOUND", message: "ピンが見つかりません" },
    };
  }

  revalidatePath("/");
  return { success: true, data: undefined };
}

export async function deleteMapPin(
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

  const raw = { pinId: formData.get("pinId") };
  const parsed = deleteMapPinSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: { code: "VALIDATION_ERROR", message: "無効なリクエストです" },
    };
  }

  const supabase = await createClient();

  // 写真のURLを取得（Storage削除用）
  const { data: photos } = await supabase
    .from("map_pin_photos")
    .select("photo_url, thumbnail_url")
    .eq("pin_id", parsed.data.pinId);

  // ピンを削除（CASCADE DELETEで写真レコードも削除される）
  const { data: deletedPins, error } = await supabase
    .from("map_pins")
    .delete()
    .eq("id", parsed.data.pinId)
    .eq("user_id", user.id)
    .select("id");

  if (error) {
    console.error("deleteMapPin error:", error.message, error.code);
    return {
      success: false,
      error: { code: "INTERNAL_ERROR", message: "ピンの削除に失敗しました" },
    };
  }

  if (!deletedPins || deletedPins.length === 0) {
    return {
      success: false,
      error: { code: "NOT_FOUND", message: "ピンが見つかりません" },
    };
  }

  // Storage上の画像ファイルを削除
  if (photos && photos.length > 0) {
    const filePaths = photos.flatMap((p) => {
      return [
        extractStoragePath(p.photo_url),
        extractStoragePath(p.thumbnail_url),
      ].filter((path): path is string => path !== null);
    });

    if (filePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("map-pin-photos")
        .remove(filePaths);

      if (storageError) {
        // Storage削除失敗はログのみ（DBレコードは削除済み）
        console.error("deleteMapPin storage error:", storageError.message);
      }
    }
  }

  revalidatePath("/");
  return { success: true, data: undefined };
}

/** ピン削除後にリダイレクトするラッパー（ピン詳細ページ用） */
export async function deleteMapPinAndRedirect(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionResult> {
  const result = await deleteMapPin(_prevState, formData);
  if (result.success) {
    redirect("/mypage/pins");
  }
  return result;
}

export async function toggleMapPinVisibility(
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
    pinId: formData.get("pinId"),
    isPublic: formData.get("isPublic"),
  };

  const parsed = toggleMapPinVisibilitySchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: { code: "VALIDATION_ERROR", message: "無効なリクエストです" },
    };
  }

  const supabase = await createClient();

  const { data: updatedPins, error } = await supabase
    .from("map_pins")
    .update({ is_public: parsed.data.isPublic })
    .eq("id", parsed.data.pinId)
    .eq("user_id", user.id)
    .select("id");

  if (error) {
    console.error("toggleMapPinVisibility error:", error.message, error.code);
    return {
      success: false,
      error: { code: "INTERNAL_ERROR", message: "公開設定の変更に失敗しました" },
    };
  }

  if (!updatedPins || updatedPins.length === 0) {
    return {
      success: false,
      error: { code: "NOT_FOUND", message: "ピンが見つかりません" },
    };
  }

  revalidatePath("/");
  return { success: true, data: undefined };
}

export async function updateMapPinPhoto(
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
    pinId: formData.get("pinId"),
    photoUrl: formData.get("photoUrl"),
    thumbnailUrl: formData.get("thumbnailUrl"),
  };

  const parsed = updateMapPinPhotoSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: { code: "VALIDATION_ERROR", message: "入力内容を確認してください" },
    };
  }

  const supabase = await createClient();

  // ピンの所有者チェック
  const { data: pinOwner } = await supabase
    .from("map_pins")
    .select("user_id")
    .eq("id", parsed.data.pinId)
    .single();

  if (!pinOwner || pinOwner.user_id !== user.id) {
    return {
      success: false,
      error: { code: "FORBIDDEN", message: "このピンを編集する権限がありません" },
    };
  }

  // 既存の写真を取得
  const { data: existingPhotos } = await supabase
    .from("map_pin_photos")
    .select("id, photo_url, thumbnail_url")
    .eq("pin_id", parsed.data.pinId);

  if (existingPhotos && existingPhotos.length > 0) {
    const { data: updatedPhotos, error: updateError } = await supabase
      .from("map_pin_photos")
      .update({
        photo_url: parsed.data.photoUrl,
        thumbnail_url: parsed.data.thumbnailUrl,
      })
      .eq("id", existingPhotos[0].id)
      .select("id");

    if (updateError) {
      console.error("updateMapPinPhoto error:", updateError.message);
      return {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "写真の更新に失敗しました" },
      };
    }

    // RLSによりUPDATEが0行の場合（ポリシー不足等）
    if (!updatedPhotos || updatedPhotos.length === 0) {
      console.error("updateMapPinPhoto: 0 rows updated (RLS policy may be missing)");
      return {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "写真の更新に失敗しました" },
      };
    }

    // 古い画像をStorageから削除（DB更新成功後のみ）
    const oldPaths = [
      extractStoragePath(existingPhotos[0].photo_url),
      extractStoragePath(existingPhotos[0].thumbnail_url),
    ].filter((p): p is string => p !== null);

    if (oldPaths.length > 0) {
      await supabase.storage.from("map-pin-photos").remove(oldPaths);
    }
  } else {
    const { error: insertError } = await supabase
      .from("map_pin_photos")
      .insert({
        pin_id: parsed.data.pinId,
        photo_url: parsed.data.photoUrl,
        thumbnail_url: parsed.data.thumbnailUrl,
        sort_order: 0,
      });

    if (insertError) {
      console.error("updateMapPinPhoto insert error:", insertError.message);
      return {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "写真の保存に失敗しました" },
      };
    }
  }

  revalidatePath("/");
  revalidatePath(`/pins/${parsed.data.pinId}`);
  return { success: true, data: undefined };
}
