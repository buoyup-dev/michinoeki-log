export default function SpotDetailLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 h-5 w-24 animate-pulse rounded bg-muted" />
      <div className="mb-6 aspect-[16/9] animate-pulse rounded-lg bg-muted" />
      <div className="mb-4 flex items-center gap-3">
        <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
        <div className="h-8 w-1/2 animate-pulse rounded bg-muted" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
  );
}
