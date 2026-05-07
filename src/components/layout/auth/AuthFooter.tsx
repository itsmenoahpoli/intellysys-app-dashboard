import { ShieldCheck } from 'lucide-react'

export default function AuthFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="shrink-0 border-t border-white/10 bg-dark px-6 py-4 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-center text-sm text-secondary sm:text-left">
          © {year} WAP INTELLYSIS. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-sm font-medium text-success">
          <ShieldCheck className="size-5 shrink-0" aria-hidden />
          <span>Secure Connection</span>
        </div>
      </div>
    </footer>
  )
}
