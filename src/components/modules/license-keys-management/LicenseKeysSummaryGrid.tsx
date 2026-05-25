import { KeyRound, ShieldAlert, ShieldCheck, Ticket } from 'lucide-react'
import SummaryCard from '../users-management/SummaryCard'
import { toPct } from '../users-management/utils'

export default function LicenseKeysSummaryGrid({
  total,
  unused,
  used,
  revoked,
}: {
  total: number
  unused: number
  used: number
  revoked: number
}) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        icon={<KeyRound className="size-[22px] text-primary" />}
        iconBg="bg-primary/15"
        title="Total Keys"
        value={total}
        metaLeft="Configured keys"
        metaLeftClassName="text-secondary"
        metaRight=""
      />
      <SummaryCard
        icon={<Ticket className="size-[22px] text-success" />}
        iconBg="bg-success/15"
        title="Unused Keys"
        value={unused}
        metaLeft={total ? `${toPct(unused, total)}%` : '0%'}
        metaLeftClassName="text-success"
        metaRight="available"
      />
      <SummaryCard
        icon={<ShieldCheck className="size-[22px] text-warning" />}
        iconBg="bg-warning/15"
        title="Used Keys"
        value={used}
        metaLeft={total ? `${toPct(used, total)}%` : '0%'}
        metaLeftClassName="text-warning"
        metaRight="active"
      />
      <SummaryCard
        icon={<ShieldAlert className="size-[22px] text-danger" />}
        iconBg="bg-danger/15"
        title="Revoked Keys"
        value={revoked}
        metaLeft={total ? `${toPct(revoked, total)}%` : '0%'}
        metaLeftClassName="text-danger"
        metaRight="invalidated"
      />
    </div>
  )
}
