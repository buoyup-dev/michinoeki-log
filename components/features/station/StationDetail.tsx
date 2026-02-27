import Image from "next/image";
import Link from "next/link";
import type { Station } from "@/types/station";
import { areaGroupColors } from "@/lib/utils/area-colors";
import { FacilityIcons } from "./FacilityIcons";

type StationDetailProps = {
  station: Station;
  actions?: React.ReactNode;
};

export function StationDetail({ station, actions }: StationDetailProps) {
  return (
    <div>
      <Link
        href="/stations"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        一覧に戻る
      </Link>

      <div className="mt-4">
        {station.imageUrl ? (
          <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={station.imageUrl}
              alt={station.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              unoptimized
            />
          </div>
        ) : (
          <div className="mb-6 flex aspect-[16/9] items-center justify-center rounded-lg bg-muted">
            <svg
              className="h-16 w-16 text-muted-foreground/50"
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

        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{station.name}</h1>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${areaGroupColors[station.areaGroup] ?? "bg-muted text-foreground"}`}
            >
              {station.areaGroup}
            </span>
          </div>
          {actions}
        </div>

        {station.description && (
          <p className="mb-6 text-foreground">{station.description}</p>
        )}

        <div className="mb-8 space-y-3">
          <InfoRow label="住所" value={station.address} />
          {station.phone && <InfoRow label="電話" value={station.phone} />}
          {station.businessHours && (
            <InfoRow label="営業時間" value={station.businessHours} />
          )}
          {station.closedDays && (
            <InfoRow label="定休日" value={station.closedDays} />
          )}
          <InfoRow label="エリア" value={station.areaGroup} />
          {station.websiteUrl && /^https?:\/\//.test(station.websiteUrl) && (
            <div className="flex gap-4">
              <span className="w-20 shrink-0 text-sm font-medium text-muted-foreground">
                Web
              </span>
              <a
                href={station.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                公式サイト
              </a>
            </div>
          )}
        </div>

        <FacilityIcons facilities={station.facilities} />
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <span className="w-20 shrink-0 text-sm font-medium text-muted-foreground">
        {label}
      </span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  );
}
