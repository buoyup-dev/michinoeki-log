import type { SpotListItem } from "@/types/spot";
import { SpotCard } from "./SpotCard";

type SpotListProps = {
  spots: SpotListItem[];
};

export function SpotList({ spots }: SpotListProps) {
  if (spots.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        該当するスポットが見つかりませんでした
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {spots.map((spot) => (
        <li key={spot.id}>
          <SpotCard spot={spot} />
        </li>
      ))}
    </ul>
  );
}
