"use client";

import { useState, useEffect, useActionState } from "react";
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
import { deleteMapPin } from "@/lib/actions/map-pin";
import type { ActionState } from "@/types/actions";

type PinDeleteButtonProps = {
  pinId: string;
  onDeleted?: () => void;
  /** トリガーボタンのカスタム表示 */
  children?: React.ReactNode;
  /** ダイアログの開閉状態を親に通知（外部クリック制御等に使用） */
  onOpenChange?: (open: boolean) => void;
};

export function PinDeleteButton({ pinId, onDeleted, children, onOpenChange: onOpenChangeProp }: PinDeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [deleteState, deleteAction, isDeleting] = useActionState<ActionState, FormData>(
    deleteMapPin,
    null,
  );

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    onOpenChangeProp?.(v);
  };

  useEffect(() => {
    if (deleteState?.success) {
      handleOpenChange(false);
      onDeleted?.();
    }
  }, [deleteState]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      {children ? (
        <AlertDialogTrigger asChild disabled={isDeleting}>
          {children}
        </AlertDialogTrigger>
      ) : (
        <AlertDialogTrigger
          disabled={isDeleting}
          className="text-xs text-muted-foreground hover:text-red-600 disabled:opacity-50"
        >
          {isDeleting ? "削除中..." : "削除"}
        </AlertDialogTrigger>
      )}
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
