"use client";

import { useState, useDeferredValue, useMemo, useCallback } from "react";
import type { StationListItem } from "@/types/station";
import type { StationVisitBadgeRecord } from "@/types/badge";
import { createDefaultFilters, countActiveFilters } from "@/types/station-filter";
import type { StationFilters } from "@/types/station-filter";
import { StationList } from "./StationList";
import { StationFilterButton } from "./StationFilterButton";
import { StationFilterSheet } from "./StationFilterSheet";

type StationSearchBarProps = {
  stations: StationListItem[];
  favoriteIds?: string[];
  visitBadges?: StationVisitBadgeRecord;
};

export function StationSearchBar({ stations, favoriteIds, visitBadges }: StationSearchBarProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [filters, setFilters] = useState<StationFilters>(createDefaultFilters);
  const [sheetOpen, setSheetOpen] = useState(false);

  const isLoggedIn = visitBadges !== undefined;

  const favoriteIdsSet = useMemo(
    () => (favoriteIds ? new Set(favoriteIds) : undefined),
    [favoriteIds]
  );

  const activeCount = useMemo(() => countActiveFilters(filters), [filters]);

  const filtered = useMemo(() => {
    return stations.filter((s) => {
      // 1. テキスト検索
      if (deferredQuery) {
        const matchesText =
          s.name.includes(deferredQuery) ||
          (s.nameKana && s.nameKana.includes(deferredQuery)) ||
          s.address.includes(deferredQuery);
        if (!matchesText) return false;
      }

      // 2. エリアフィルタ
      if (!filters.areas.has(s.areaGroup)) return false;

      // 3. 訪問状況フィルタ（ログイン時のみ適用）
      if (isLoggedIn && filters.visitFilter !== "all") {
        const hasVisit = s.id in visitBadges;
        if (filters.visitFilter === "visited" && !hasVisit) return false;
        if (filters.visitFilter === "unvisited" && hasVisit) return false;
      }

      // 4. 施設フィルタ（AND条件）
      if (filters.facilities.size > 0) {
        for (const key of filters.facilities) {
          if (!s.facilities[key]) return false;
        }
      }

      return true;
    });
  }, [stations, deferredQuery, filters, isLoggedIn, visitBadges]);

  const handleOpenSheet = useCallback(() => setSheetOpen(true), []);

  return (
    <div>
      <div className="mb-6 flex gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="道の駅名・住所で検索..."
          aria-label="道の駅を検索"
          className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm placeholder-muted-foreground/70 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <StationFilterButton activeCount={activeCount} onClick={handleOpenSheet} />
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        {filtered.length}件の道の駅
      </p>
      <StationList stations={filtered} favoriteIds={favoriteIdsSet} visitBadges={visitBadges} />
      <StationFilterSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        filters={filters}
        onFiltersChange={setFilters}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
