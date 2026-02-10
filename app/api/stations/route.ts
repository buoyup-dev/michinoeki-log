import { NextResponse } from "next/server";
import { getStations } from "@/lib/db/queries/stations";

export async function GET() {
  try {
    const stations = await getStations();

    return NextResponse.json(
      { data: stations },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stations" },
      { status: 500 }
    );
  }
}
