import type { VisitStats } from "@/types/visit";

type VisitStatsCardProps = {
  stats: VisitStats;
};

export function VisitStatsCard({ stats }: VisitStatsCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">訪問統計</h2>

      {/* 達成率プログレスバー */}
      <div className="mb-6">
        <div className="mb-1 flex items-baseline justify-between">
          <span className="text-sm font-medium text-gray-700">制覇率</span>
          <span className="text-2xl font-bold text-blue-600">{stats.completionRate}%</span>
        </div>
        <div
          className="h-3 w-full overflow-hidden rounded-full bg-gray-200"
          role="progressbar"
          aria-valuenow={stats.completionRate}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`制覇率 ${stats.completionRate}%`}
        >
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {stats.uniqueStationsVisited} / {stats.totalStations} 駅
        </p>
      </div>

      {/* 統計グリッド */}
      <div className="grid grid-cols-2 gap-4">
        <StatItem label="総訪問回数" value={stats.totalVisits} />
        <StatItem label="今月の訪問" value={stats.thisMonthVisits} />
        <StatItem
          label="ゴールド"
          value={stats.gpsVerifiedCount}
          icon={<span className="text-yellow-500">●</span>}
        />
        <StatItem
          label="シルバー"
          value={stats.selfReportedCount}
          icon={<span className="text-gray-400">●</span>}
        />
      </div>
    </div>
  );
}

function StatItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-md bg-gray-50 p-3">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="flex items-center gap-1 text-xl font-bold text-gray-900">
        {icon}
        {value}
      </p>
    </div>
  );
}
