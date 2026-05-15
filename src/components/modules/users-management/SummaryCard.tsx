import type { ReactNode } from 'react'

export default function SummaryCard({
  icon,
  iconBg,
  title,
  value,
  metaLeft,
  metaRight,
  metaLeftClassName,
}: {
  icon: ReactNode
  iconBg: string
  title: string
  value: number
  metaLeft: string
  metaRight: string
  metaLeftClassName?: string
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-surface/80 p-4 shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition-colors hover:bg-surface/90 hover:backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div
          className={[
            'grid size-11 place-items-center rounded-xl ring-1 ring-white/10',
            iconBg,
          ].join(' ')}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-medium text-secondary">{title}</div>
          <div className="mt-1 text-xl font-semibold leading-none text-white">{value}</div>
          <div className="mt-2 flex items-center gap-1 text-[11px]">
            <span className={metaLeftClassName ?? 'text-secondary'}>{metaLeft}</span>
            {metaRight ? <span className="text-secondary">{metaRight}</span> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

