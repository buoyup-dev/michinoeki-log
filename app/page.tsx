import { getStationsForMap } from "@/lib/db/queries/stations";
import { getUser } from "@/lib/supabase/auth";
import { getVisitedStationBadges } from "@/lib/db/queries/visits";
import { MapView } from "@/components/features/map/MapView";

export default async function Home() {
  const [stations, user] = await Promise.all([
    getStationsForMap(),
    getUser(),
  ]);

  const visitBadges = user ? await getVisitedStationBadges() : undefined;

  return (
    <div className="relative z-0 h-[calc(100vh-64px)]">
      <MapView stations={stations} visitBadges={visitBadges} />
    </div>
  );
}
