"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NAV_KEY = "__michinoeki_nav_count";

/** アプリ内のページ遷移回数を sessionStorage に記録する */
export function NavigationTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const count = Number(sessionStorage.getItem(NAV_KEY) ?? "0");
    sessionStorage.setItem(NAV_KEY, String(count + 1));
  }, [pathname]);

  return null;
}

/** アプリ内で2ページ以上閲覧したか（= router.back() で戻れるか） */
export function hasInAppHistory(): boolean {
  if (typeof window === "undefined") return false;
  return Number(sessionStorage.getItem(NAV_KEY) ?? "0") > 1;
}
