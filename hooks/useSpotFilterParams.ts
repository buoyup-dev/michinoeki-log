"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { SpotCategory } from "@/types/spot";
import { SPOT_CATEGORIES } from "@/types/map-filter";

function parseCategory(raw: string | null): SpotCategory | "all" {
  const found = SPOT_CATEGORIES.find((c) => c === raw);
  return found ?? "all";
}

export function useSpotFilterParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query = searchParams.get("q") ?? "";
  const category = useMemo(
    () => parseCategory(searchParams.get("category")),
    [searchParams],
  );

  const updateURL = useCallback(
    (newQuery: string, newCategory: SpotCategory | "all") => {
      const params = new URLSearchParams();
      if (newQuery) params.set("q", newQuery);
      if (newCategory !== "all") params.set("category", newCategory);
      const qs = params.toString();
      router.replace(pathname + (qs ? `?${qs}` : ""), { scroll: false });
    },
    [router, pathname],
  );

  const setQuery = useCallback(
    (newQuery: string) => updateURL(newQuery, category),
    [updateURL, category],
  );

  const setCategory = useCallback(
    (newCategory: SpotCategory | "all") => updateURL(query, newCategory),
    [updateURL, query],
  );

  return { query, setQuery, category, setCategory };
}
