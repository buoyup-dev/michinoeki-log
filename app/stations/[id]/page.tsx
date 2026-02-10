import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStationById, getAllStationIds } from "@/lib/db/queries/stations";
import { StationDetail } from "@/components/features/station/StationDetail";

export const revalidate = 3600;

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
}) {
  const { id } = await props.params;
  const station = await getStationById(id);

  if (!station) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <StationDetail station={station} />
    </div>
  );
}
