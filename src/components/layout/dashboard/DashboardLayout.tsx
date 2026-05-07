import type { ReactNode } from 'react'

type DashboardLayoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-svh w-full bg-dark text-white">
      <aside
        className="hidden w-[260px] shrink-0 flex-col border-r border-white/10 bg-sidebar lg:flex"
        aria-label="Main navigation"
      >
        <div className="border-b border-white/10 px-4 py-4">
          <span className="text-sm font-semibold tracking-wide text-secondary">
            WAP INTELLYSIS
          </span>
        </div>
        <nav className="flex-1 p-3" aria-label="Sidebar navigation" />
      </aside>

      <div className="flex min-h-svh min-w-0 flex-1 flex-col">
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
