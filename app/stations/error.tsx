"use client";

export default function StationsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center">
      <h2 className="mb-2 text-xl font-semibold text-foreground">
        データの取得に失敗しました
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        しばらくしてからもう一度お試しください。
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        再試行
      </button>
    </div>
  );
}
