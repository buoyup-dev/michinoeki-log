import { getStationsForMap } from "@/lib/db/queries/stations";
import { MapView } from "@/components/features/map/MapView";

export const revalidate = 3600;

export default async function Home() {
  const stations = await getStationsForMap();

  return (
    <div className="relative z-0 h-[calc(100vh-64px)]">
      <MapView stations={stations} />
    </div>
  );
}
