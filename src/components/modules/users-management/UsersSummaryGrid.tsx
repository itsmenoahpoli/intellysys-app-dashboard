import { Users as UsersIcon } from 'lucide-react'
import SummaryCard from './SummaryCard'
import { toPct } from './utils'

export default function UsersSummaryGrid({
  totalUsers,
  activeUsers,
  administrators,
  operators,
  viewers,
}: {
  totalUsers: number
  activeUsers: number
  administrators: number
  operators: number
  viewers: number
}) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <SummaryCard
        icon={<UsersIcon className="size-[22px] text-[#60a5fa]" />}
        iconBg="bg-[#2563eb]/15"
        title="Total Users"
        value={totalUsers}
        metaLeft="+0 from last 30 days"
        metaLeftClassName="text-success"
        metaRight=""
      />
      <SummaryCard
        icon={<UsersIcon className="size-[22px] text-[#a78bfa]" />}
        iconBg="bg-[#8b5cf6]/15"
        title="Active Users"
        value={activeUsers}
        metaLeft={totalUsers ? `${toPct(activeUsers, totalUsers)}%` : '0%'}
        metaLeftClassName="text-secondary"
        metaRight="of total users"
      />
      <SummaryCard
        icon={<UsersIcon className="size-[22px] text-[#34d399]" />}
        iconBg="bg-[#10b981]/15"
        title="Administrators"
        value={administrators}
        metaLeft={totalUsers ? `${toPct(administrators, totalUsers)}%` : '0%'}
        metaLeftClassName="text-secondary"
        metaRight="of total users"
      />
      <SummaryCard
        icon={<UsersIcon className="size-[22px] text-[#fbbf24]" />}
        iconBg="bg-[#f59e0b]/15"
        title="Operators"
        value={operators}
        metaLeft={totalUsers ? `${toPct(operators, totalUsers)}%` : '0%'}
        metaLeftClassName="text-secondary"
        metaRight="of total users"
      />
      <SummaryCard
        icon={<UsersIcon className="size-[22px] text-[#60a5fa]" />}
        iconBg="bg-[#2563eb]/15"
        title="Viewers"
        value={viewers}
        metaLeft={totalUsers ? `${toPct(viewers, totalUsers)}%` : '0%'}
        metaLeftClassName="text-secondary"
        metaRight="of total users"
      />
    </div>
  )
}

