"use client";

import { useState, useDeferredValue, useMemo } from "react";
import type { StationListItem } from "@/types/station";
import { StationList } from "./StationList";

type StationSearchBarProps = {
  stations: StationListItem[];
};

export function StationSearchBar({ stations }: StationSearchBarProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(
    () =>
      deferredQuery
        ? stations.filter(
            (s) =>
              s.name.includes(deferredQuery) ||
              (s.nameKana && s.nameKana.includes(deferredQuery)) ||
              s.address.includes(deferredQuery)
          )
        : stations,
    [stations, deferredQuery]
  );

  return (
    <div>
      <div className="mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="道の駅名・住所で検索..."
          aria-label="道の駅を検索"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <p className="mb-4 text-sm text-gray-500">
        {filtered.length}件の道の駅
      </p>
      <StationList stations={filtered} />
    </div>
  );
}
