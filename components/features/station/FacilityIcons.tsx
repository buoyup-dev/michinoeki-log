import type { StationFacilities } from "@/types/station";

type FacilityIconsProps = {
  facilities: StationFacilities;
};

type FacilityItem = {
  key: keyof Omit<StationFacilities, "parking">;
  label: string;
  icon: string;
};

const facilityItems: FacilityItem[] = [
  { key: "toilet", label: "トイレ", icon: "🚻" },
  { key: "handicapToilet", label: "バリアフリートイレ", icon: "♿" },
  { key: "restaurant", label: "レストラン", icon: "🍽️" },
  { key: "shop", label: "売店", icon: "🛒" },
  { key: "wifi", label: "Wi-Fi", icon: "📶" },
  { key: "evCharger", label: "EV充電器", icon: "🔌" },
  { key: "babyRoom", label: "授乳室", icon: "👶" },
  { key: "atm", label: "ATM", icon: "🏧" },
  { key: "information", label: "案内所", icon: "ℹ️" },
];

export function FacilityIcons({ facilities }: FacilityIconsProps) {
  const available = facilityItems.filter((item) => facilities[item.key]);

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold text-foreground">施設・設備</h2>
      {available.length === 0 && facilities.parking === null ? (
        <p className="text-sm text-muted-foreground">施設情報はまだ登録されていません</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {available.map((item) => (
            <div
              key={item.key}
              className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm text-foreground"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
          {facilities.parking !== null && (
            <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm text-foreground">
              <span>🅿️</span>
              <span>駐車場 {facilities.parking}台</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
