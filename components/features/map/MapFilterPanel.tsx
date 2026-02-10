"use client";

import type { AreaGroup } from "@/types/station";

type MapFilterPanelProps = {
  activeAreas: Set<AreaGroup>;
  onToggle: (area: AreaGroup) => void;
};

const areas: { key: AreaGroup; color: string; activeColor: string }[] = [
  { key: "道東", color: "border-blue-300 text-blue-700", activeColor: "bg-blue-500 text-white border-blue-500" },
  { key: "道北", color: "border-green-300 text-green-700", activeColor: "bg-green-500 text-white border-green-500" },
  { key: "道央", color: "border-orange-300 text-orange-700", activeColor: "bg-orange-500 text-white border-orange-500" },
  { key: "道南", color: "border-purple-300 text-purple-700", activeColor: "bg-purple-500 text-white border-purple-500" },
];

export function MapFilterPanel({ activeAreas, onToggle }: MapFilterPanelProps) {
  return (
    <div
      role="group"
      aria-label="エリアフィルタ"
      className="absolute right-3 top-3 z-[1000] flex gap-2 rounded-lg bg-white/90 p-2 shadow-md backdrop-blur-sm"
    >
      {areas.map(({ key, color, activeColor }) => (
        <button
          key={key}
          onClick={() => onToggle(key)}
          aria-pressed={activeAreas.has(key)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            activeAreas.has(key) ? activeColor : `bg-white ${color}`
          }`}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
