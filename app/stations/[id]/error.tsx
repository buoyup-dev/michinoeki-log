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
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        道の駅の情報を取得できませんでした
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        しばらくしてからもう一度お試しください。
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={reset}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          再試行
        </button>
        <Link
          href="/stations"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          一覧に戻る
        </Link>
      </div>
    </div>
  );
}
