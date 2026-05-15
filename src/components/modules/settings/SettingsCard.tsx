import type { ReactNode } from 'react'

type SettingsCardProps = {
  title: string
  subtitle?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export default function SettingsCard({
  title,
  subtitle,
  icon,
  children,
  className,
}: SettingsCardProps) {
  return (
    <section
      className={[
        'rounded-xl border border-white/15 bg-white/5 shadow-[0_12px_24px_rgba(0,0,0,0.22)]',
        className ?? '',
      ].join(' ')}
    >
      <div className="flex items-start gap-3 border-b border-white/10 px-5 py-4">
        <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/5 text-white ring-1 ring-white/10">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-tight text-white">{title}</div>
          {subtitle ? <div className="mt-0.5 text-xs text-secondary">{subtitle}</div> : null}
        </div>
      </div>
      <div className="px-5 py-4">{children}</div>
    </section>
  )
}

