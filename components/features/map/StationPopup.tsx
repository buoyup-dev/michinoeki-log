"use client";

import Link from "next/link";
import type { StationMapItem } from "@/types/station";

type StationPopupProps = {
  station: StationMapItem;
};

export function StationPopup({ station }: StationPopupProps) {
  return (
    <div className="w-[200px]">
      <div className="mb-2 aspect-[16/9] overflow-hidden rounded-md bg-gray-100">
        {station.imageUrl ? (
          <img
            src={station.imageUrl}
            alt={station.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
              />
            </svg>
          </div>
        )}
      </div>
      <h3 className="mb-1 text-sm font-semibold">{station.name}</h3>
      <Link
        href={`/stations/${station.id}`}
        className="text-xs text-blue-600 hover:underline"
      >
        詳細を見る →
      </Link>
    </div>
  );
}
