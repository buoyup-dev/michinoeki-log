import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStationById, getAllStationIds } from "@/lib/db/queries/stations";
import { getUser } from "@/lib/supabase/auth";
import { getLatestVisitToStation } from "@/lib/db/queries/visits";
import { StationDetail } from "@/components/features/station/StationDetail";
import { VisitRecorder } from "@/components/features/visit/VisitRecorder";

export async function generateStaticParams() {
  const ids = await getAllStationIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const station = await getStationById(id);

  if (!station) {
    return { title: "道の駅が見つかりません" };
  }

  return {
    title: station.name,
    description: station.description ?? `道の駅${station.name}の詳細情報`,
  };
}

export default async function StationDetailPage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ visited?: string }>;
}) {
  const [{ id }, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);
  const [station, user] = await Promise.all([getStationById(id), getUser()]);

  if (!station) {
    notFound();
  }

  const latestVisit = user ? await getLatestVisitToStation(id) : null;
  const justVisited = searchParams.visited === "true";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <StationDetail station={station} />

      {/* 訪問記録成功メッセージ */}
      {justVisited && (
        <div role="alert" className="mt-6 rounded-md bg-green-50 p-4 text-sm text-green-700">
          <p className="font-medium">訪問を記録しました！</p>
          <p className="mt-1">マイページで訪問履歴を確認できます。</p>
        </div>
      )}

      {/* 訪問記録セクション */}
      <div className="mt-8">
        {user ? (
          <VisitRecorder
            stationId={station.id}
            stationName={station.name}
            hasVisited={latestVisit !== null}
          />
        ) : (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="mb-2 text-gray-600">訪問を記録するにはログインが必要です</p>
            <Link
              href={`/auth/login?next=/stations/${id}`}
              className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              ログイン
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
