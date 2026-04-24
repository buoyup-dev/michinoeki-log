"use client";

import { useState, useEffect, useRef, useDeferredValue, useMemo } from "react";
import type { SpotListItem, SpotCategory } from "@/types/spot";
import { SPOT_CATEGORY_CONFIG } from "@/lib/constants/spot-category";
import { useSpotFilterParams } from "@/hooks/useSpotFilterParams";
import { SpotList } from "./SpotList";

const ALL_TAB = "all" as const;
type TabValue = SpotCategory | typeof ALL_TAB;

type SpotSearchBarProps = {
  spots: SpotListItem[];
};

const CATEGORY_TABS: { value: TabValue; label: string }[] = [
  { value: ALL_TAB, label: "すべて" },
  ...Object.entries(SPOT_CATEGORY_CONFIG).map(([key, config]) => ({
    value: key as SpotCategory,
    label: config.label,
  })),
];

export function SpotSearchBar({ spots }: SpotSearchBarProps) {
  const { query, setQuery, category, setCategory } = useSpotFilterParams();
  const [inputValue, setInputValue] = useState(query);
  const isComposingRef = useRef(false);
  const deferredQuery = useDeferredValue(query);

  // ブラウザの戻る・進むでURLが変わったときにinputを同期する
  useEffect(() => {
    if (!isComposingRef.current) {
      setInputValue(query);
    }
  }, [query]);

  const filtered = useMemo(() => {
    return spots.filter((s) => {
      // テキスト検索（名前・読み仮名・住所の部分一致）
      if (deferredQuery) {
        const matchesText =
          s.name.includes(deferredQuery) ||
          (s.nameKana && s.nameKana.includes(deferredQuery)) ||
          (s.address && s.address.includes(deferredQuery));
        if (!matchesText) return false;
      }
      // カテゴリタブ
      if (category !== ALL_TAB && s.category !== category) return false;
      return true;
    });
  }, [spots, deferredQuery, category]);

  return (
    <div>
      {/* テキスト検索 */}
      <div className="mb-4">
        <input
          type="search"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            // IME変換中はURLを更新しない（日本語入力が崩れるのを防ぐ）
            if (!isComposingRef.current) setQuery(e.target.value);
          }}
          onCompositionStart={() => { isComposingRef.current = true; }}
          onCompositionEnd={(e) => {
            isComposingRef.current = false;
            setQuery(e.currentTarget.value);
          }}
          placeholder="スポット名・住所で検索..."
          aria-label="スポットを検索"
          className="w-full rounded-lg border border-border px-4 py-2.5 text-sm placeholder-muted-foreground/70 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      {/* カテゴリタブ */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setCategory(tab.value)}
            aria-pressed={category === tab.value}
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              category === tab.value
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        {filtered.length}件のスポット
      </p>
      <SpotList spots={filtered} />
    </div>
  );
}
