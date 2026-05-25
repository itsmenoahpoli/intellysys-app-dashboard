import { Plus, KeyRound } from 'lucide-react'

export default function LicenseKeysHeader({
  onAdd,
}: {
  onAdd: () => void
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2">
          <KeyRound className="size-6 text-primary" />
          License Keys
        </h1>
        <p className="mt-1 text-sm text-secondary">
          Issue, manage, and monitor software and device license keys
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:opacity-95 transition-opacity"
        >
          <Plus className="size-4" aria-hidden />
          Add License Key
        </button>
      </div>
    </div>
  )
}
