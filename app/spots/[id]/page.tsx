import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSpotDetail, getAllSpotIds } from "@/lib/db/queries/spots";
import { SpotDetailView } from "@/components/features/spot/SpotDetail";

export async function generateStaticParams() {
  const ids = await getAllSpotIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const spot = await getSpotDetail(id);

  if (!spot) {
    return { title: "スポットが見つかりません" };
  }

  return {
    title: spot.name,
    description: spot.description ?? `${spot.name}の詳細情報`,
  };
}

export default async function SpotDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const spot = await getSpotDetail(id);

  if (!spot) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <SpotDetailView spot={spot} />
    </div>
  );
}
