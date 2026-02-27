"use client";

import { useActionState, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { updateVisitMemo, deleteVisit } from "@/lib/actions/visit";
import { areaGroupColors } from "@/lib/utils/area-colors";
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
import type { VisitWithStation } from "@/types/visit";
import type { ActionState } from "@/types/actions";

type VisitHistoryItemProps = {
  visit: VisitWithStation;
};

export function VisitHistoryItem({ visit }: VisitHistoryItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memoState, memoAction, isMemoPending] = useActionState<ActionState, FormData>(
    updateVisitMemo,
    null,
  );
  const [deleteState, deleteAction, isDeletePending] = useActionState<ActionState, FormData>(
    deleteVisit,
    null,
  );

  // メモ保存成功時に編集モードを閉じる
  useEffect(() => {
    if (memoState?.success) {
      setIsEditing(false);
    }
  }, [memoState]);

  // 削除成功時にダイアログを閉じる
  useEffect(() => {
    if (deleteState?.success) {
      setDeleteDialogOpen(false);
    }
  }, [deleteState]);

  return (
    <li className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-start gap-4">
        {/* 道の駅画像 */}
        <Link href={`/stations/${visit.station.id}`} className="shrink-0">
          {visit.station.imageUrl ? (
            <Image
              src={visit.station.imageUrl}
              alt={visit.station.name}
              width={80}
              height={60}
              className="rounded-md object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-[60px] w-[80px] items-center justify-center rounded-md bg-muted">
              <svg className="h-6 w-6 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
            </div>
          )}
        </Link>

        {/* 訪問情報 */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link
              href={`/stations/${visit.station.id}`}
              className="font-medium text-foreground hover:text-primary hover:underline"
            >
              {visit.station.name}
            </Link>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${areaGroupColors[visit.station.areaGroup] ?? "bg-muted text-foreground"}`}
            >
              {visit.station.areaGroup}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={visit.visitedAt}>
              {new Date(visit.visitedAt).toLocaleDateString("ja-JP")}
            </time>
            {visit.isGpsVerified ? (
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-yellow-600">
                <span className="text-yellow-500">●</span> Gold
              </span>
            ) : (
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-gray-400">
                <span>●</span> Silver
              </span>
            )}
          </div>

          {/* メモ表示 / 編集 */}
          {isEditing ? (
            <form action={memoAction} className="mt-2">
              <input type="hidden" name="visitId" value={visit.id} />
              <textarea
                name="memo"
                rows={2}
                maxLength={500}
                defaultValue={visit.memo ?? ""}
                className="w-full rounded-md border border-border px-2 py-1.5 text-sm placeholder:text-muted-foreground/70 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="メモを入力"
              />
              {memoState?.success === false && (
                <p className="mt-1 text-xs text-red-600">{memoState.error.message}</p>
              )}
              <div className="mt-1.5 flex gap-2">
                <button
                  type="submit"
                  disabled={isMemoPending}
                  className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {isMemoPending ? "保存中..." : "保存"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-md border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted"
                >
                  キャンセル
                </button>
              </div>
            </form>
          ) : (
            visit.memo && (
              <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">{visit.memo}</p>
            )
          )}

          {/* 操作ボタン */}
          {!isEditing && (
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-xs text-muted-foreground hover:text-primary"
              >
                メモを編集
              </button>

              <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogTrigger
                  disabled={isDeletePending}
                  className="text-xs text-muted-foreground hover:text-red-600 disabled:opacity-50"
                >
                  {isDeletePending ? "削除中..." : "削除"}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>訪問記録を削除しますか？</AlertDialogTitle>
                    <AlertDialogDescription>
                      「{visit.station.name}」の訪問記録を削除します。削除すると達成率やバッジに影響する場合があります。この操作は取り消せません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  {deleteState?.success === false && (
                    <p className="text-sm text-red-600">{deleteState.error.message}</p>
                  )}
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeletePending}>キャンセル</AlertDialogCancel>
                    <form action={deleteAction} className="w-full sm:w-auto">
                      <input type="hidden" name="visitId" value={visit.id} />
                      <AlertDialogAction type="submit" variant="destructive" className="w-full" disabled={isDeletePending}>
                        {isDeletePending ? "削除中..." : "削除する"}
                      </AlertDialogAction>
                    </form>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
