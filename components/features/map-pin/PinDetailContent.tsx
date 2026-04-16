"use client";

import { useState, useEffect, useActionState } from "react";
import { Pencil, Trash2, Globe, Lock } from "lucide-react";
import { MemoTextarea } from "@/components/features/map-pin/MemoTextarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteMapPinAndRedirect, updateMapPinMemo, toggleMapPinVisibility } from "@/lib/actions/map-pin";
import type { MapPinDetail } from "@/types/map-pin";
import type { ActionState } from "@/types/actions";

type PinDetailContentProps = {
  pin: MapPinDetail;
  isOwn: boolean;
};

export function PinDetailContent({ pin: initialPin, isOwn }: PinDetailContentProps) {
  const [pin, setPin] = useState(initialPin);
  const [editing, setEditing] = useState(false);
  const [editMemo, setEditMemo] = useState("");

  // メモ更新
  const [memoState, memoAction, isSavingMemo] = useActionState<ActionState, FormData>(
    updateMapPinMemo,
    null,
  );
  useEffect(() => {
    if (memoState?.success) {
      setPin((prev) => ({ ...prev, memo: editMemo.trim() || null }));
      setEditing(false);
    }
  }, [memoState]); // eslint-disable-line react-hooks/exhaustive-deps

  // 公開設定
  const [toggleState, toggleAction, isToggling] = useActionState<ActionState, FormData>(
    toggleMapPinVisibility,
    null,
  );
  useEffect(() => {
    if (toggleState?.success) {
      setPin((prev) => ({ ...prev, isPublic: !prev.isPublic }));
    }
  }, [toggleState]);

  return (
    <div>
      {/* メモ */}
      <div className="mb-6">
        <h2 className="mb-2 text-sm font-medium text-muted-foreground">メモ</h2>
        {editing ? (
          <form action={memoAction}>
            <input type="hidden" name="pinId" value={pin.id} />
            <MemoTextarea name="memo" value={editMemo} onChange={setEditMemo} rows={4} />
            <div className="mt-2">
              <button
                type="submit"
                disabled={isSavingMemo || editMemo.length > 200}
                className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {isSavingMemo ? "更新中..." : "更新"}
              </button>
            </div>
            {memoState?.success === false && (
              <p className="mt-1 text-xs text-red-500">{memoState.error.message}</p>
            )}
          </form>
        ) : (
          <div>
            <div className="min-h-[100px] rounded-lg border border-input bg-background px-4 py-3">
              <p className="whitespace-pre-wrap text-sm">
                {pin.memo || <span className="text-muted-foreground">メモなし</span>}
              </p>
            </div>
            {isOwn && (
              <button
                type="button"
                onClick={() => {
                  setEditMemo(pin.memo || "");
                  setEditing(true);
                }}
                className="mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <Pencil className="size-3.5" />
                編集
              </button>
            )}
          </div>
        )}
      </div>

      {/* 登録日 */}
      <p className="mb-8 text-xs text-muted-foreground">
        登録日：{new Date(pin.createdAt).toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* 公開/非公開バッジ + トグル */}
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
            pin.isPublic ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"
          }`}
        >
          {pin.isPublic ? <><Globe className="h-3.5 w-3.5" />公開</> : <><Lock className="h-3.5 w-3.5" />非公開</>}
        </span>
        {isOwn && (
          <form action={toggleAction}>
            <input type="hidden" name="pinId" value={pin.id} />
            <input type="hidden" name="isPublic" value={String(!pin.isPublic)} />
            <button
              type="submit"
              disabled={isToggling}
              role="switch"
              aria-checked={pin.isPublic}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                pin.isPublic ? "bg-blue-500" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block size-4 rounded-full bg-white transition-transform ${
                  pin.isPublic ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </form>
        )}
        {toggleState?.success === false && (
          <p className="text-xs text-red-500">{toggleState.error.message}</p>
        )}
      </div>

      {/* 削除ボタン（視覚的に分離） */}
      {isOwn && (
        <div className="mt-12 border-t border-border pt-6">
          <DeleteWithRedirect pinId={pin.id} />
        </div>
      )}
    </div>
  );
}

/**
 * ピン詳細ページ専用の削除ボタン。
 * サーバーアクション内で redirect("/mypage/pins") を実行するため、
 * revalidatePath による404表示より先に確実に遷移する。
 */
function DeleteWithRedirect({ pinId }: { pinId: string }) {
  const [open, setOpen] = useState(false);
  const [deleteState, deleteAction, isDeleting] = useActionState<ActionState, FormData>(
    deleteMapPinAndRedirect,
    null,
  );

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-red-600 transition-colors"
        >
          <Trash2 className="size-4" />
          ピンを削除
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>本当にピンを削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            この操作は取り消せません。写真とメモも完全に削除されます。
          </AlertDialogDescription>
        </AlertDialogHeader>
        {deleteState?.success === false && (
          <p className="text-sm text-red-600">{deleteState.error.message}</p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>キャンセル</AlertDialogCancel>
          <form action={deleteAction}>
            <input type="hidden" name="pinId" value={pinId} />
            <AlertDialogAction type="submit" variant="destructive" disabled={isDeleting}>
              {isDeleting ? "削除中..." : "削除する"}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
