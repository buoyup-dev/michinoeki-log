export default function StationsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* ListTabNav */}
      <div className="mb-6 flex gap-0 border-b border-border">
        <div className="h-9 w-20 animate-pulse rounded bg-muted" />
        <div className="ml-2 h-9 w-24 animate-pulse rounded bg-muted" />
      </div>
      <div className="mb-6 h-8 w-32 animate-pulse rounded bg-muted" />
      <div className="mb-6 h-11 w-full animate-pulse rounded-lg bg-muted" />
      <div className="mb-4 h-5 w-24 animate-pulse rounded bg-muted" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-border">
            <div className="aspect-[16/9] animate-pulse bg-muted" />
            <div className="p-4">
              <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
