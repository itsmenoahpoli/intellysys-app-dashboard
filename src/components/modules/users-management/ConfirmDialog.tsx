export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  confirmDanger,
  busy,
  onClose,
  onConfirm,
}: {
  open: boolean
  title: string
  description: string
  confirmLabel: string
  confirmDanger?: boolean
  busy?: boolean
  onClose: () => void
  onConfirm: () => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-surface p-5 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="mt-2 text-sm text-secondary">{description}</div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-white/10 bg-dark/40 px-4 text-sm font-medium text-white hover:bg-white/5"
            disabled={busy}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={[
              'inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60',
              confirmDanger ? 'bg-danger' : 'bg-primary',
            ].join(' ')}
            disabled={busy}
          >
            {busy ? 'Please wait...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

