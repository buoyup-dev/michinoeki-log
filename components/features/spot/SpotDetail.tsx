import Image from "next/image";
import { MapPin, Phone, Globe } from "lucide-react";
import type { SpotDetail } from "@/types/spot";
import { SPOT_CATEGORY_CONFIG } from "@/lib/constants/spot-category";
import { BackButton } from "@/components/ui/BackButton";

type SpotDetailProps = {
  spot: SpotDetail;
};

export function SpotDetail({ spot }: SpotDetailProps) {
  const config = SPOT_CATEGORY_CONFIG[spot.category];

  return (
    <div>
      <BackButton fallbackHref="/spots" label="戻る" />

      <div className="mt-4">
        {spot.imageUrl ? (
          <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={spot.imageUrl}
              alt={spot.name}
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
              aria-hidden="true"
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

        <div className="mb-6 flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">{spot.name}</h1>
          <span
            className="inline-block shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
            style={{ backgroundColor: config.color }}
          >
            {config.label}
          </span>
        </div>

        {spot.description && (
          <p className="mb-6 leading-relaxed text-foreground">{spot.description}</p>
        )}

        <div className="mb-8 space-y-3">
          {spot.address && (
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span className="text-sm text-foreground">{spot.address}</span>
            </div>
          )}
          {spot.phone && (
            <div className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-muted-foreground" />
              <a
                href={`tel:${spot.phone}`}
                className="text-sm text-primary hover:underline"
              >
                {spot.phone}
              </a>
            </div>
          )}
          {/* DB の CHECK 制約と二重になるが、外部 URL を <a href> に渡す直前の防御的チェックとして残す */}
          {spot.websiteUrl && /^https?:\/\//.test(spot.websiteUrl) && (
            <div className="flex items-center gap-3">
              <Globe className="size-4 shrink-0 text-muted-foreground" />
              <a
                href={spot.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                公式サイト
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
