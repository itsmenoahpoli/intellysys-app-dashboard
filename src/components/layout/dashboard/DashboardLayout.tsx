import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Activity,
  Bell,
  ChevronRight,
  CircleHelp,
  CreditCard,
  FileText,
  Gauge,
  Laptop,
  Settings,
  ShieldOff,
  Users,
  Waypoints,
} from 'lucide-react'
import { useAuthStore } from '@/stores/auth.store'
import brandLogo from '@/assets/brand-logo.png'

type DashboardLayoutProps = {
  children: ReactNode
}

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/dashboard', icon: Gauge },
  { label: 'Devices', to: '/dashboard/devices', icon: Laptop },
  { label: 'Remove Access (SSH)', to: '/dashboard/remove-access', icon: ShieldOff },
  { label: 'Packet Analyzer', to: '/dashboard/packet-analyzer', icon: Waypoints },
  { label: 'Monitoring', to: '/dashboard/monitoring', icon: Activity },
  { label: 'Alerts', to: '/dashboard/alerts', icon: Bell },
  { label: 'Logs & Reports', to: '/dashboard/logs-reports', icon: FileText },
  { label: 'Users', to: '/dashboard/users', icon: Users },
  { label: 'Settings', to: '/dashboard/settings', icon: Settings },
  { label: 'Subscriptions', to: '/dashboard/subscriptions', icon: CreditCard },
  { label: 'Help & Support', to: '/dashboard/help-support', icon: CircleHelp },
] as const

function titleCase(raw: string) {
  return raw
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
    .join(' ')
}

function formatRole(raw?: string) {
  const v = (raw ?? '').trim().toLowerCase()
  if (v === 'super admin') return 'Super Administrator'
  if (v === 'it admin') return 'Administrator'
  if (v === 'manager') return 'Operator'
  if (v === 'employee') return 'Viewer'
  return raw ? titleCase(raw) : 'Super Administrator'
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const userName = useAuthStore((s) => s.loginResponse?.user?.name) ?? 'Admin'
  const userRole = formatRole(useAuthStore((s) => s.loginResponse?.user?.userRole?.name))

  return (
    <div className="flex min-h-svh w-full bg-dark text-white">
      <aside
        className="hidden w-[240px] shrink-0 flex-col border-r border-white/15 bg-sidebar lg:flex"
        aria-label="Main navigation"
      >
        <div className="border-b border-white/15 px-4 py-5">
          <div className="flex items-center justify-start">
            <img
              src={brandLogo}
              alt="WAP INTELLYSIS"
              className="h-12 w-auto max-w-[200px] select-none object-contain"
              draggable={false}
            />
          </div>
        </div>

        <nav className="flex-1 overflow-auto p-3" aria-label="Sidebar navigation">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-white/8 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]'
                        : 'text-secondary hover:bg-white/5 hover:text-white',
                    ].join(' ')
                  }
                >
                  <item.icon
                    className="size-[18px] shrink-0 text-secondary group-hover:text-white"
                    aria-hidden
                  />
                  <span className="min-w-0 truncate">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-3">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-left transition-colors hover:bg-white/7 hover:backdrop-blur-sm"
            aria-label="Open user menu"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative">
                <div className="grid size-10 place-items-center rounded-full bg-white/10 text-sm font-semibold text-white ring-1 ring-white/10">
                  {userName.slice(0, 1).toUpperCase()}
                </div>
                <span
                  className="absolute -bottom-0.5 -left-0.5 size-2.5 rounded-full bg-success ring-2 ring-sidebar"
                  aria-hidden
                />
              </div>

              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-white">{userName}</div>
                <div className="truncate text-[11px] text-secondary">{userRole}</div>
              </div>
            </div>

            <ChevronRight className="size-4 shrink-0 text-secondary" aria-hidden />
          </button>
        </div>
      </aside>

      <div className="relative flex min-h-svh min-w-0 flex-1 flex-col">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          aria-hidden
          style={{
            background:
              "radial-gradient(900px 420px at 20% 10%, rgba(37,99,235,0.18), transparent 60%), radial-gradient(900px 420px at 80% 30%, rgba(0,212,255,0.10), transparent 55%)",
          }}
        />
        <main className="relative flex-1 overflow-auto p-5">{children}</main>
      </div>
    </div>
  )
}
