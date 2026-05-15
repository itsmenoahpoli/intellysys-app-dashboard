type ToggleProps = {
  checked: boolean
  onChange: (next: boolean) => void
  label?: string
  disabled?: boolean
}

export default function Toggle({ checked, onChange, label, disabled }: ToggleProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={[
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors',
        disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
        checked ? 'border-primary/40 bg-primary/80' : 'border-white/15 bg-white/8',
      ].join(' ')}
    >
      <span
        aria-hidden
        className={[
          'inline-block size-5 translate-x-0.5 rounded-full bg-white shadow-[0_8px_18px_rgba(0,0,0,0.35)] transition-transform',
          checked ? 'translate-x-[22px]' : 'translate-x-0.5',
        ].join(' ')}
      />
    </button>
  )
}

