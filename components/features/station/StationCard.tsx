import Image from "next/image";
import Link from "next/link";
import type { StationListItem } from "@/types/station";
import type { StationVisitBadge } from "@/types/badge";
import { areaGroupColors } from "@/lib/utils/area-colors";

type StationCardProps = {
  station: StationListItem;
  isFavorited?: boolean;
  visitBadge?: StationVisitBadge;
};

export function StationCard({ station, isFavorited, visitBadge }: StationCardProps) {
  return (
    <Link
      href={`/stations/${station.id}`}
      className="block rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg bg-gray-100">
        {station.imageUrl ? (
          <Image
            src={station.imageUrl}
            alt={station.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <svg
              className="h-12 w-12"
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
        {visitBadge && (
          <span
            aria-hidden="true"
            className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs font-bold shadow ${
              visitBadge === "gold"
                ? "bg-yellow-400 text-yellow-900"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {visitBadge === "gold" ? "Gold" : "Silver"}
          </span>
        )}
        {isFavorited && (
          <span aria-hidden="true" className="absolute right-2 top-2 drop-shadow">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-base font-semibold text-gray-900">
            {station.name}
          </h3>
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${areaGroupColors[station.areaGroup] ?? "bg-gray-100 text-gray-800"}`}
          >
            {station.areaGroup}
          </span>
        </div>
        <p className="text-sm text-gray-500">{station.address}</p>
      </div>
    </Link>
  );
}
