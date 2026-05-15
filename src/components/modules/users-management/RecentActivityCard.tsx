import Card from './Card'
import { formatLastLogin } from './utils'
import type React from 'react'

export default function RecentActivityCard({
  items,
}: {
  items: Array<{
    id: number
    name: string
    action: string
    at: string
    ip: string
    icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  }>
}) {
  return (
    <Card className="lg:col-span-4">
      <div className="flex items-start justify-between">
        <div className="text-sm font-semibold text-white">Recent User Activity</div>
        <button className="text-xs font-medium text-primary hover:underline">View All</button>
      </div>

      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-dark/40 px-3 py-10 text-center text-sm text-secondary">
            No activity yet.
          </div>
        ) : (
          items.map((a) => (
            <div key={a.id} className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <div className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-dark/40 ring-1 ring-white/10">
                  <a.icon className="size-4 text-secondary" aria-hidden />
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-white">
                    <span className="font-medium">{a.name}</span>
                  </div>
                  <div className="mt-0.5 text-xs text-secondary">{a.action}</div>
                </div>
              </div>

              <div className="shrink-0 text-right text-xs text-secondary">
                <div className="whitespace-nowrap">{formatLastLogin(a.at)}</div>
                <div className="mt-1 whitespace-nowrap">{a.ip}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}

