import { CheckCircle2 } from 'lucide-react'

export default function SecurityRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-dark/40 px-3 py-2">
      <div className="min-w-0">
        <div className="text-xs font-semibold text-white">{label}</div>
      </div>
      <div className="flex items-center gap-2 text-xs text-secondary">
        <span className="whitespace-nowrap">{value}</span>
        <CheckCircle2 className="size-4 shrink-0 text-success" aria-hidden />
      </div>
    </div>
  )
}

