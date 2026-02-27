import type { StationFacilities } from "@/types/station";

type FacilityIconsProps = {
  facilities: StationFacilities;
};

type FacilityItem = {
  key: keyof StationFacilities;
  label: string;
  icon: string;
};

const facilityItems: FacilityItem[] = [
  { key: "toilet", label: "トイレ", icon: "🚻" },
  { key: "washlet", label: "温水洗浄便座", icon: "🚿" },
  { key: "handicapToilet", label: "バリアフリートイレ", icon: "♿" },
  { key: "ostomy", label: "オストメイト", icon: "🏥" },
  { key: "parking", label: "駐車場", icon: "🅿️" },
  { key: "coveredParking", label: "屋根付き駐車場", icon: "🏗️" },
  { key: "evCharger", label: "EV充電器", icon: "🔌" },
  { key: "wifi", label: "Wi-Fi", icon: "📶" },
  { key: "atm", label: "ATM", icon: "🏧" },
  { key: "information", label: "案内所", icon: "ℹ️" },
  { key: "shop", label: "売店", icon: "🛒" },
  { key: "restaurant", label: "レストラン", icon: "🍽️" },
  { key: "cafe", label: "喫茶・軽食", icon: "☕" },
  { key: "farmMarket", label: "産地直売", icon: "🌾" },
  { key: "nursingRoom", label: "授乳室", icon: "👶" },
  { key: "diaperChanging", label: "おむつ交換台", icon: "🍼" },
  { key: "kidsSpace", label: "キッズスペース", icon: "🧒" },
  { key: "onsen", label: "温泉", icon: "♨️" },
  { key: "lodging", label: "宿泊施設", icon: "🏨" },
  { key: "campground", label: "キャンプ場", icon: "⛺" },
  { key: "observatory", label: "展望台", icon: "🔭" },
  { key: "dogRun", label: "ドッグラン", icon: "🐕" },
  { key: "park", label: "公園", icon: "🌳" },
  { key: "museum", label: "博物館・美術館", icon: "🏛️" },
  { key: "experience", label: "体験施設", icon: "🎨" },
  { key: "restArea", label: "無料休憩所", icon: "🪑" },
  { key: "creditCard", label: "クレジットカード", icon: "💳" },
  { key: "cashless", label: "キャッシュレス決済", icon: "📱" },
  { key: "aed", label: "AED", icon: "❤️‍🩹" },
];

export function FacilityIcons({ facilities }: FacilityIconsProps) {
  const available = facilityItems.filter((item) => facilities[item.key]);

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold text-foreground">施設・設備</h2>
      {available.length === 0 ? (
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
        </div>
      )}
    </div>
  );
}
