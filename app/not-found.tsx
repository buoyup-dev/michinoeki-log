export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">ページが見つかりません</h2>
        <p className="mt-2 text-gray-600">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
      </div>
    </div>
  );
}
