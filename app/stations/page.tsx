import type { Metadata } from "next";
import { getStationsForList } from "@/lib/db/queries/stations";
import { StationSearchBar } from "@/components/features/station/StationSearchBar";

export const metadata: Metadata = {
  title: "道の駅一覧",
  description: "北海道の道の駅一覧。エリアや名前で検索できます。",
};

export const revalidate = 3600;

export default async function StationsPage() {
  const stations = await getStationsForList();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">道の駅一覧</h1>
      <StationSearchBar stations={stations} />
    </div>
  );
}
