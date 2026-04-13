/** 許可する画像MIMEタイプ */
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

/** 最大ファイルサイズ（5MB） */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

/** 画像バリデーション */
export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    return "JPEG、PNG、WebP形式の画像を選択してください";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "画像サイズは5MB以下にしてください";
  }
  return null;
}

/**
 * 画像をリサイズしてJPEG Blobを返す（ブラウザCanvas API使用）
 * @param file - 元画像ファイル
 * @param maxLongEdge - 長辺の最大ピクセル数
 * @param quality - JPEG品質（0-1）
 */
export async function resizeImage(
  file: File,
  maxLongEdge: number,
  quality: number,
): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;

  // 長辺がmaxLongEdge以下なら元画像をそのままJPEGに変換
  const longEdge = Math.max(width, height);
  let newWidth = width;
  let newHeight = height;

  if (longEdge > maxLongEdge) {
    const scale = maxLongEdge / longEdge;
    newWidth = Math.round(width * scale);
    newHeight = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = newWidth;
  canvas.height = newHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Canvas context の取得に失敗しました");
  }

  ctx.drawImage(bitmap, 0, 0, newWidth, newHeight);
  bitmap.close();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("画像の変換に失敗しました"));
        }
      },
      "image/jpeg",
      quality,
    );
  });
}

/** 表示用画像にリサイズ（長辺1200px, 品質80%） */
export function resizeForDisplay(file: File): Promise<Blob> {
  return resizeImage(file, 1200, 0.8);
}

/** サムネイル用にリサイズ（長辺200px, 品質70%） */
export function resizeForThumbnail(file: File): Promise<Blob> {
  return resizeImage(file, 200, 0.7);
}
