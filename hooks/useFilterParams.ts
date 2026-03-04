"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { StationFilters, VisitFilter, FacilityFilterKey } from "@/types/station-filter";
import { ALL_AREAS, FACILITY_FILTER_OPTIONS } from "@/types/station-filter";
import type { AreaGroup } from "@/types/station";
import { AREA_GROUPS } from "@/types/station";

const VALID_AREAS = new Set<string>(AREA_GROUPS);
const VALID_FACILITIES = new Set<string>(
  FACILITY_FILTER_OPTIONS.map((o) => o.key),
);

function parseAreas(raw: string | null): Set<AreaGroup> {
  if (!raw) return new Set<AreaGroup>(ALL_AREAS);
  const parsed = raw
    .split(",")
    .filter((a) => VALID_AREAS.has(a)) as AreaGroup[];
  return parsed.length > 0 ? new Set(parsed) : new Set<AreaGroup>(ALL_AREAS);
}

function parseVisit(raw: string | null): VisitFilter {
  if (raw === "visited" || raw === "unvisited") return raw;
  return "all";
}

function parseFacilities(raw: string | null): Set<FacilityFilterKey> {
  if (!raw) return new Set();
  const parsed = raw
    .split(",")
    .filter((f) => VALID_FACILITIES.has(f)) as FacilityFilterKey[];
  return new Set(parsed);
}

function buildSearchParams(query: string, filters: StationFilters): string {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (filters.areas.size < ALL_AREAS.length) {
    params.set("areas", [...filters.areas].join(","));
  }
  if (filters.visitFilter !== "all") {
    params.set("visit", filters.visitFilter);
  }
  if (filters.facilities.size > 0) {
    params.set("facilities", [...filters.facilities].join(","));
  }
  return params.toString();
}

export function useFilterParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query = searchParams.get("q") ?? "";

  const filters: StationFilters = useMemo(
    () => ({
      areas: parseAreas(searchParams.get("areas")),
      visitFilter: parseVisit(searchParams.get("visit")),
      facilities: parseFacilities(searchParams.get("facilities")),
    }),
    [searchParams],
  );

  const updateURL = useCallback(
    (newQuery: string, newFilters: StationFilters) => {
      const qs = buildSearchParams(newQuery, newFilters);
      router.replace(pathname + (qs ? `?${qs}` : ""), { scroll: false });
    },
    [router, pathname],
  );

  const setQuery = useCallback(
    (newQuery: string) => {
      updateURL(newQuery, filters);
    },
    [updateURL, filters],
  );

  const setFilters = useCallback(
    (newFilters: StationFilters) => {
      updateURL(query, newFilters);
    },
    [updateURL, query],
  );

  return { query, setQuery, filters, setFilters };
}
