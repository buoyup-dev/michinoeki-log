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
  MapFilters,
  VisitFilter,
  FacilityFilterKey,
} from "@/types/map-filter";
import { FACILITY_FILTER_OPTIONS, createDefaultFilters } from "@/types/map-filter";

type MapFilterSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: MapFilters;
  onFiltersChange: (filters: MapFilters) => void;
  isLoggedIn: boolean;
};

const AREA_STYLES: { key: AreaGroup; color: string; activeColor: string }[] = [
  { key: "道東", color: "border-blue-300 text-blue-700", activeColor: "bg-blue-500 text-white border-blue-500" },
  { key: "道北", color: "border-green-300 text-green-700", activeColor: "bg-green-500 text-white border-green-500" },
  { key: "道央", color: "border-orange-300 text-orange-700", activeColor: "bg-orange-500 text-white border-orange-500" },
  { key: "道南", color: "border-purple-300 text-purple-700", activeColor: "bg-purple-500 text-white border-purple-500" },
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

export function MapFilterSheet({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  isLoggedIn,
}: MapFilterSheetProps) {
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
              地図に表示する道の駅を絞り込みます
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
                    filters.areas.has(key) ? activeColor : `bg-white ${color}`
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
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
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
                      ? "border-teal-600 bg-teal-600 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
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
