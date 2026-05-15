import Card from './Card'
import DonutChart, { type DonutSegment } from './DonutChart'

export default function RoleDistributionCard({
  totalUsers,
  segments,
  legend,
}: {
  totalUsers: number
  segments: DonutSegment[]
  legend: Array<{ name: string; label: string; color: string; count: number; pct: number }>
}) {
  return (
    <Card className="lg:col-span-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-white">Role Distribution</div>
          <div className="mt-1 text-xs text-secondary">{totalUsers} Total</div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
        <div className="flex items-center justify-center">
          <DonutChart segments={segments} total={totalUsers} />
        </div>

        <div className="space-y-2">
          {legend.length === 0 ? (
            <div className="text-sm text-secondary">No role data yet.</div>
          ) : (
            legend.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block size-2.5 rounded-full"
                    style={{ backgroundColor: s.color }}
                    aria-hidden
                  />
                  <span className="text-sm text-secondary">{s.label}</span>
                </div>
                <span className="text-sm text-white">
                  {s.count} <span className="text-xs text-secondary">({s.pct}%)</span>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  )
}

