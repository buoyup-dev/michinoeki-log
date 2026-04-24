import { Suspense } from "react";
import type { Metadata } from "next";
import { getSpotsForList } from "@/lib/db/queries/spots";
import { ListTabNav } from "@/components/ui/ListTabNav";
import { SpotSearchBar } from "@/components/features/spot/SpotSearchBar";

export const metadata: Metadata = {
  title: "スポット一覧",
  description: "道の駅周辺のスポット一覧。カテゴリや名前で検索できます。",
};

export default async function SpotsPage() {
  const spots = await getSpotsForList();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <ListTabNav activeHref="/spots" />
      <h1 className="mb-6 text-2xl font-bold text-foreground">スポット一覧</h1>
      <Suspense>
        <SpotSearchBar spots={spots} />
      </Suspense>
    </div>
  );
}
