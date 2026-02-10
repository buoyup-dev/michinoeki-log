import type { StationListItem } from "@/types/station";
import { StationCard } from "./StationCard";

type StationListProps = {
  stations: StationListItem[];
};

export function StationList({ stations }: StationListProps) {
  if (stations.length === 0) {
    return (
      <p className="py-12 text-center text-gray-500">
        該当する道の駅が見つかりませんでした
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stations.map((station) => (
        <li key={station.id}>
          <StationCard station={station} />
        </li>
      ))}
    </ul>
  );
}
