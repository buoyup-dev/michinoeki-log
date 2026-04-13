import { getStationsForMap } from "@/lib/db/queries/stations";
import { getUser } from "@/lib/supabase/auth";
import { getVisitedStationBadges } from "@/lib/db/queries/visits";
import { getMapPinsForMap } from "@/lib/db/queries/map-pins";
import { MapView } from "@/components/features/map/MapView";

export default async function Home(props: {
  searchParams: Promise<{ pin?: string }>;
}) {
  const [stations, user, mapPins, searchParams] = await Promise.all([
    getStationsForMap(),
    getUser(),
    getMapPinsForMap(),
    props.searchParams,
  ]);

  const visitBadges = user ? await getVisitedStationBadges() : undefined;

  return (
    <div className="relative z-0 h-[calc(100vh-64px)]">
      <MapView
        stations={stations}
        visitBadges={visitBadges}
        mapPins={mapPins}
        userId={user?.id}
        initialPinId={searchParams.pin}
      />
    </div>
  );
}
