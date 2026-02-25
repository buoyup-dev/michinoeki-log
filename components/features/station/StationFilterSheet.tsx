"use client";

import { UtensilsCrossed, Wifi, Zap, Baby } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import type { AreaGroup } from "@/types/station";
import type {
  StationFilters,
  VisitFilter,
  FacilityFilterKey,
} from "@/types/station-filter";
import { FACILITY_FILTER_OPTIONS, createDefaultFilters } from "@/types/station-filter";

type StationFilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: StationFilters;
  onFiltersChange: (filters: StationFilters) => void;
  isLoggedIn: boolean;
};

const AREA_STYLES: { key: AreaGroup; color: string; activeColor: string }[] = [
  { key: "道東", color: "border-[#93aec1]/50 text-[#5d8499]", activeColor: "bg-[#93aec1] text-white border-[#93aec1]" },
  { key: "道北", color: "border-[#9dbdba]/50 text-[#6a9a8d]", activeColor: "bg-[#9dbdba] text-white border-[#9dbdba]" },
  { key: "道央", color: "border-[#f8b042]/50 text-[#b07a1f]", activeColor: "bg-[#f8b042] text-white border-[#f8b042]" },
  { key: "道南", color: "border-[#ec6a52]/50 text-[#c4503a]", activeColor: "bg-[#ec6a52] text-white border-[#ec6a52]" },
];

const VISIT_OPTIONS: { key: VisitFilter; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "unvisited", label: "未訪問" },
  { key: "visited", label: "訪問済" },
];

const FACILITY_ICONS: Record<FacilityFilterKey, React.ReactNode> = {
  restaurant: <UtensilsCrossed className="size-4" />,
  wifi: <Wifi className="size-4" />,
  evCharger: <Zap className="size-4" />,
  babyRoom: <Baby className="size-4" />,
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
        className="max-h-[85vh] overflow-y-auto rounded-t-2xl"
      >
        <SheetHeader className="flex-row items-center justify-between">
          <div>
            <SheetTitle>絞り込み</SheetTitle>
            <SheetDescription className="sr-only">
              表示する道の駅を絞り込みます
            </SheetDescription>
          </div>
          <button
            onClick={handleReset}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            リセット
          </button>
        </SheetHeader>

        <div className="space-y-6 px-4 pb-6">
          {/* エリアフィルタ */}
          <section>
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              エリア
            </h3>
            <div className="flex flex-wrap gap-2" role="group" aria-label="エリアフィルタ">
              {AREA_STYLES.map(({ key, color, activeColor }) => (
                <button
                  key={key}
                  onClick={() => handleAreaToggle(key)}
                  aria-pressed={filters.areas.has(key)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    filters.areas.has(key) ? activeColor : `bg-card ${color}`
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
      </SheetContent>
    </Sheet>
  );
}
