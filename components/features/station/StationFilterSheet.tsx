"use client";

import {
  UtensilsCrossed, Baby, Zap, CarFront,
  Thermometer, TreePine, Dog, Landmark, X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { AREA_GROUPS } from "@/types/station";
import type { AreaGroup } from "@/types/station";
import type {
  StationFilters,
  VisitFilter,
  FacilityFilterKey,
} from "@/types/station-filter";
import { FACILITY_FILTER_OPTIONS, createDefaultFilters } from "@/types/station-filter";
import { areaStyles } from "@/lib/utils/area-colors";

type StationFilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: StationFilters;
  onFiltersChange: (filters: StationFilters) => void;
  isLoggedIn: boolean;
};

const AREA_FILTER_ITEMS = AREA_GROUPS.map((key) => ({
  key,
  inactive: areaStyles[key].filterInactive,
  active: areaStyles[key].filterActive,
}));

const VISIT_OPTIONS: { key: VisitFilter; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "unvisited", label: "未訪問" },
  { key: "visited", label: "訪問済" },
];

const FACILITY_ICONS: Record<FacilityFilterKey, React.ReactNode> = {
  dining: <UtensilsCrossed className="size-4" />,
  kids: <Baby className="size-4" />,
  evCharger: <Zap className="size-4" />,
  coveredParking: <CarFront className="size-4" />,
  onsenLodging: <Thermometer className="size-4" />,
  leisure: <TreePine className="size-4" />,
  dogRun: <Dog className="size-4" />,
  museum: <Landmark className="size-4" />,
};

export function StationFilterSheet({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  isLoggedIn,
}: StationFilterSheetProps) {
  function handleAreaToggle(area: AreaGroup) {
    const next = new Set(filters.areas);
    if (next.has(area)) {
      if (next.size > 1) next.delete(area);
    } else {
      next.add(area);
    }
    onFiltersChange({ ...filters, areas: next });
  }

  function handleVisitChange(visit: VisitFilter) {
    onFiltersChange({ ...filters, visitFilter: visit });
  }

  function handleFacilityToggle(key: FacilityFilterKey) {
    const next = new Set(filters.facilities);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    onFiltersChange({ ...filters, facilities: next });
  }

  function handleReset() {
    onFiltersChange(createDefaultFilters());
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="flex max-h-[85vh] flex-col gap-0 rounded-t-2xl"
      >
        <SheetHeader className="flex-row items-center justify-between">
          <div>
            <SheetTitle>絞り込み</SheetTitle>
            <SheetDescription className="sr-only">
              表示する道の駅を絞り込みます
            </SheetDescription>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="閉じる"
          >
            <X className="size-5" />
          </button>
        </SheetHeader>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-2">
          {/* エリアフィルタ */}
          <section>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              エリア
            </h3>
            <div className="flex flex-wrap gap-2" role="group" aria-label="エリアフィルタ">
              {AREA_FILTER_ITEMS.map(({ key, inactive, active }) => (
                <button
                  key={key}
                  onClick={() => handleAreaToggle(key)}
                  aria-pressed={filters.areas.has(key)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    filters.areas.has(key) ? active : `bg-card ${inactive}`
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </section>

          {/* 訪問状況フィルタ（ログイン時のみ） */}
          {isLoggedIn && (
            <section>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                訪問状況
              </h3>
              <div className="flex gap-2" role="radiogroup" aria-label="訪問状況フィルタ">
                {VISIT_OPTIONS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => handleVisitChange(key)}
                    role="radio"
                    aria-checked={filters.visitFilter === key}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                      filters.visitFilter === key
                        ? "border-[#45496a] bg-[#45496a] text-white"
                        : "border-border bg-card text-foreground hover:border-border"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* 施設フィルタ */}
          <section>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              施設・設備
            </h3>
            <div className="flex flex-wrap gap-2" role="group" aria-label="施設フィルタ">
              {FACILITY_FILTER_OPTIONS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleFacilityToggle(key)}
                  aria-pressed={filters.facilities.has(key)}
                  className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    filters.facilities.has(key)
                      ? "border-[#45496a] bg-[#45496a] text-white"
                      : "border-border bg-card text-foreground hover:border-border"
                  }`}
                >
                  {FACILITY_ICONS[key]}
                  {label}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* フッター */}
        <div className="border-t border-border px-4 py-3">
          <div className="mx-auto flex max-w-md gap-3">
            <button
              onClick={handleReset}
              className="flex-1 rounded-lg border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              リセット
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              結果を見る
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
