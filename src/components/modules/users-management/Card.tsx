import type { ReactNode } from 'react'

export default function Card({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        'rounded-xl border border-white/10 bg-surface/80 p-4 shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition-colors hover:bg-surface/90 hover:backdrop-blur-sm',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

