export default function StationDetailLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 h-5 w-24 animate-pulse rounded bg-gray-200" />
      <div className="mb-6 aspect-[16/9] animate-pulse rounded-lg bg-gray-200" />
      <div className="mb-6 h-8 w-1/2 animate-pulse rounded bg-gray-200" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        ))}
      </div>
    </div>
  );
}
