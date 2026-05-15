import type { ReactNode } from 'react'

export default function PageButton({
  children,
  onClick,
  disabled,
  active,
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  active?: boolean
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={[
        'grid h-8 min-w-8 place-items-center rounded-md border px-2 text-sm font-medium transition-colors',
        active
          ? 'border-primary bg-primary text-white'
          : 'border-white/10 bg-dark/40 text-secondary hover:bg-white/5 hover:text-white',
        disabled ? 'cursor-not-allowed opacity-50 hover:bg-dark/40' : '',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

