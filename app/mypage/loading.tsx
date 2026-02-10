export default function MypageLoading() {
  return (
    <div>
      <div className="mb-8 h-8 w-36 animate-pulse rounded bg-gray-200" />
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 h-6 w-32 animate-pulse rounded bg-gray-200" />
        <div className="mb-6 flex items-center gap-4">
          <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200" />
          <div>
            <div className="mb-2 h-5 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-24 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
