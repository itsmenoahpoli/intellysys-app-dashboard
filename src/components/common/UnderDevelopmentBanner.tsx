import { AlertTriangle } from 'lucide-react'

export default function UnderDevelopmentBanner() {
  return (
    <div className="mb-4 rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-warning shadow-[0_10px_24px_rgba(0,0,0,0.18)]">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <AlertTriangle className="size-4 shrink-0" aria-hidden />
        <span>This module is stil under development</span>
      </div>
    </div>
  )
}

