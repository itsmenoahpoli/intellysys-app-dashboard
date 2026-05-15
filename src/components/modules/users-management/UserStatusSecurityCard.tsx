import Card from './Card'
import ProgressRow from './ProgressRow'
import SecurityRow from './SecurityRow'

export default function UserStatusSecurityCard({
  statusSummary,
  totalUsers,
}: {
  statusSummary: {
    active: number
    inactive: number
    locked: number
    activePct: number
    inactivePct: number
    lockedPct: number
  }
  totalUsers: number
}) {
  return (
    <Card className="lg:col-span-4">
      <div className="space-y-4">
        <div>
          <div className="flex items-start justify-between">
            <div className="text-sm font-semibold text-white">User Status</div>
            <button className="text-xs font-medium text-primary hover:underline">View All</button>
          </div>
          <div className="mt-4 space-y-3">
            <ProgressRow
              label="Active Users"
              value={statusSummary.active}
              pct={statusSummary.activePct}
              barClassName="bg-success"
            />
            <ProgressRow
              label="Inactive Users"
              value={statusSummary.inactive}
              pct={statusSummary.inactivePct}
              barClassName="bg-warning"
            />
            <ProgressRow
              label="Locked Users"
              value={statusSummary.locked}
              pct={statusSummary.lockedPct}
              barClassName="bg-danger"
            />
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-white">Security Summary</div>
          <div className="mt-4 space-y-3">
            <SecurityRow
              label="Two-Factor Authentication"
              value={`Enabled for ${Math.max(0, Math.round(totalUsers * 0.86))} users`}
            />
            <SecurityRow label="Password Policy" value="Strong password policy enforced" />
            <SecurityRow label="Last Password Change" value="Average 32 days ago" />
          </div>
        </div>
      </div>
    </Card>
  )
}

