"use client";

export default function MypageError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-16 text-center">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        データの取得に失敗しました
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        しばらくしてからもう一度お試しください。
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        再試行
      </button>
    </div>
  );
}
