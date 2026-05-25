import type { ReactNode } from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Activity,
  Bell,
  ChevronRight,
  CircleHelp,
  CreditCard,
  FileText,
  Gauge,
  KeyRound,
  Laptop,
  LogOut,
  Menu,
  Settings,
  ShieldOff,
  UserCircle,
  Users,
  Waypoints,
  X,
} from 'lucide-react'
import { useAuthStore } from '@/stores/auth.store'
import { logout } from '@/services/auth.service'
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
  { label: 'License Keys', to: '/dashboard/license-keys', icon: KeyRound },
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

function UserMenuCard({
  userName,
  userRole,
  closeParent,
}: {
  userName: string
  userRole: string
  closeParent?: () => void
}) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const el = rootRef.current
      if (!el) return
      const target = e.target as Node | null
      if (target && el.contains(target)) return
      setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown, { passive: true })

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [open])

  const go = (to: string) => {
    setOpen(false)
    closeParent?.()
    navigate(to)
  }

  const doLogout = () => {
    setOpen(false)
    closeParent?.()
    void (async () => {
      await logout()
      navigate('/signin', { replace: true })
    })()
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-left transition-colors hover:bg-white/7 hover:backdrop-blur-sm"
        aria-label="Open user menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
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

        <ChevronRight
          className={[
            'size-4 shrink-0 text-secondary transition-transform',
            open ? '-rotate-90' : '',
          ].join(' ')}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute bottom-full left-0 right-0 z-50 mb-2 overflow-hidden rounded-xl border border-white/10 bg-[#0b0e14]/95 shadow-[0_18px_50px_rgba(0,0,0,0.65)] backdrop-blur"
        >
          <div
            className="absolute -bottom-1.5 left-8 size-3 rotate-45 border border-white/10 bg-[#0b0e14]/95"
            aria-hidden
          />

          <div className="p-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={() => go('/dashboard/my-account')}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/6 hover:text-white focus:outline-none"
            >
              <UserCircle className="size-4 text-secondary" aria-hidden />
              My Account
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => go('/dashboard/update-password')}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/6 hover:text-white focus:outline-none"
            >
              <KeyRound className="size-4 text-secondary" aria-hidden />
              Update Password
            </button>

            <div className="my-1.5 border-t border-white/10" aria-hidden />

            <button
              type="button"
              role="menuitem"
              onClick={doLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-danger transition-colors hover:bg-danger/10 focus:outline-none"
            >
              <LogOut className="size-4" aria-hidden />
              Log Out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const userName = useAuthStore((s) => s.loginResponse?.user?.name) ?? 'Admin'
  const userRole = formatRole(useAuthStore((s) => s.loginResponse?.user?.userRole?.name))

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <div className="flex min-h-svh w-full bg-[#070A10] text-white">
      {/* Desktop Sidebar - Fixed */}
      <aside
        className="fixed left-0 top-0 z-40 hidden h-screen w-[240px] shrink-0 flex-col border-r border-white/20 bg-[#070A10] shadow-[6px_0_28px_rgba(0,0,0,0.55)] md:flex"
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
          <UserMenuCard userName={userName} userRole={userRole} />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar - Slide-out */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[240px] shrink-0 flex-col border-r border-white/20 bg-[#070A10] shadow-[6px_0_28px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-white/15 px-4 py-4">
          <div className="flex items-center justify-start">
            <img
              src={brandLogo}
              alt="WAP INTELLYSIS"
              className="h-10 w-auto max-w-[180px] select-none object-contain"
              draggable={false}
            />
          </div>
          <button
            type="button"
            onClick={closeMobileMenu}
            className="grid size-8 place-items-center rounded-lg text-secondary hover:bg-white/5 hover:text-white"
            aria-label="Close menu"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <nav className="flex-1 overflow-auto p-3" aria-label="Sidebar navigation">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={closeMobileMenu}
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
          <UserMenuCard userName={userName} userRole={userRole} closeParent={closeMobileMenu} />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="relative flex min-h-svh min-w-0 flex-1 flex-col bg-dark md:pl-[240px]">
        {/* Mobile Header with Toggle */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#070A10]/80 px-4 py-3 backdrop-blur-sm md:hidden">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-secondary hover:bg-white/10 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
            <img
              src={brandLogo}
              alt="WAP INTELLYSIS"
              className="h-8 w-auto max-w-[150px] select-none object-contain"
              draggable={false}
            />
          </div>
        </div>

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
