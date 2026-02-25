"use client";

import Link from "next/link";

export default function StationDetailError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h2 className="mb-2 text-xl font-semibold text-foreground">
        道の駅の情報を取得できませんでした
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        しばらくしてからもう一度お試しください。
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={reset}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          再試行
        </button>
        <Link
          href="/stations"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
        >
          一覧に戻る
        </Link>
      </div>
    </div>
  );
}
