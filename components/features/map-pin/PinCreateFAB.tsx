"use client";

import { MapPin } from "lucide-react";

type PinCreateFABProps = {
  active: boolean;
  onClick: () => void;
};

export function PinCreateFAB({ active, onClick }: PinCreateFABProps) {
  return (
    <button
      onClick={onClick}
      aria-label={active ? "ピン作成モードを終了" : "ピンを作成"}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium shadow-md backdrop-blur-sm transition-colors ${
        active
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-card/90 text-foreground hover:bg-card"
      }`}
    >
      <MapPin className="size-4" />
      {active ? "作成中" : "ピン作成"}
    </button>
  );
}
