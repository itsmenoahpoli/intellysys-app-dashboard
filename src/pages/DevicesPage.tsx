import DashboardLayout from '@/components/layout/dashboard/DashboardLayout'
import {
  ChevronDown,
  HardDrive,
  Laptop,
  MoreVertical,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  Trash2,
  WifiOff,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useMemo, useState } from 'react'

type DeviceStatus = 'Online' | 'Offline' | 'Unreachable'
type DeviceTab = 'all' | 'online' | 'offline' | 'unreachable' | 'groups'

type DeviceRow = {
  id: string
  name: string
  subtitle: string
  ip: string
  type: string
  os: string
  status: DeviceStatus
  lastSeen: string
  group: string
}

function statusPillClass(s: DeviceStatus) {
  if (s === 'Online') return 'border-success/30 bg-success/10 text-success'
  if (s === 'Offline') return 'border-danger/30 bg-danger/10 text-danger'
  return 'border-warning/30 bg-warning/10 text-warning'
}

function typeIcon(type: string) {
  const t = type.toLowerCase()
  if (t.includes('router')) return <Laptop className="size-4 text-primary" aria-hidden />
  if (t.includes('switch')) return <HardDrive className="size-4 text-success" aria-hidden />
  if (t.includes('firewall')) return <ShieldAlert className="size-4 text-danger" aria-hidden />
  if (t.includes('access point') || t.includes('ap')) return <WifiOff className="size-4 text-warning" aria-hidden />
  return <Laptop className="size-4 text-secondary" aria-hidden />
}

function SoftButton({
  children,
  onClick,
  className,
  ariaLabel,
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  ariaLabel?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        'inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-semibold text-white/90 hover:bg-white/7',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(37,99,235,0.28)] transition-colors hover:bg-primary/90"
    >
      {children}
    </button>
  )
}

function StatCard({
  title,
  value,
  meta,
  iconBg,
  icon,
}: {
  title: string
  value: string
  meta: string
  iconBg: string
  icon: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-surface/70 p-4 shadow-[0_14px_28px_rgba(0,0,0,0.28)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-secondary">{title}</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</div>
          <div className="mt-1 text-[11px] font-semibold text-secondary">{meta}</div>
        </div>
        <div className={['grid size-10 place-items-center rounded-lg ring-1 ring-white/10', iconBg].join(' ')}>
          {icon}
        </div>
      </div>
    </section>
  )
}

function TabButton({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'relative -mb-px px-1 py-3 text-sm font-semibold transition-colors',
        active ? 'text-white' : 'text-secondary hover:text-white',
      ].join(' ')}
    >
      {label}
      {active ? <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-primary" aria-hidden /> : null}
    </button>
  )
}

export default function DevicesPage() {
  const [tab, setTab] = useState<DeviceTab>('all')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState<10 | 25 | 50>(10)
  const [menuId, setMenuId] = useState<string | null>(null)

  const allRows: DeviceRow[] = useMemo(
    () => [
      {
        id: 'router-01',
        name: 'Router-01',
        subtitle: 'Core Router',
        ip: '192.168.1.1',
        type: 'Router',
        os: 'MikroTik RouterOS 7.13',
        status: 'Online',
        lastSeen: '2 mins ago',
        group: 'Network Core',
      },
      {
        id: 'switch-01',
        name: 'Switch-01',
        subtitle: 'Main Switch',
        ip: '192.168.1.2',
        type: 'Switch',
        os: 'Cisco IOS 15.2',
        status: 'Online',
        lastSeen: '1 min ago',
        group: 'Network Core',
      },
      {
        id: 'firewall-01',
        name: 'Firewall-01',
        subtitle: 'Security Firewall',
        ip: '192.168.1.3',
        type: 'Firewall',
        os: 'FortiOS 7.2.4',
        status: 'Offline',
        lastSeen: '15 mins ago',
        group: 'Security',
      },
      {
        id: 'server-01',
        name: 'Server-01',
        subtitle: 'Application Server',
        ip: '192.168.1.10',
        type: 'Server',
        os: 'Ubuntu 22.04 LTS',
        status: 'Online',
        lastSeen: 'Just now',
        group: 'Servers',
      },
      {
        id: 'ap-01',
        name: 'AP-01',
        subtitle: 'Access Point',
        ip: '192.168.1.20',
        type: 'Access Point',
        os: 'Ubiquiti UniFi OS 3.2',
        status: 'Online',
        lastSeen: '3 mins ago',
        group: 'Wireless',
      },
      {
        id: 'pc-admin',
        name: 'PC-Admin',
        subtitle: 'Admin Workstation',
        ip: '192.168.1.50',
        type: 'PC',
        os: 'Windows 10 Pro',
        status: 'Online',
        lastSeen: '1 min ago',
        group: 'Workstations',
      },
      {
        id: 'server-backup',
        name: 'Server-Backup',
        subtitle: 'Backup Server',
        ip: '192.168.1.60',
        type: 'Server',
        os: 'Windows Server 2019',
        status: 'Online',
        lastSeen: '4 mins ago',
        group: 'Servers',
      },
      {
        id: 'camera-01',
        name: 'Camera-01',
        subtitle: 'IP Camera',
        ip: '192.168.1.70',
        type: 'IP Camera',
        os: 'Dahua 4.2.1',
        status: 'Unreachable',
        lastSeen: '1 hour ago',
        group: 'Surveillance',
      },
    ],
    [],
  )

  const counts = useMemo(() => {
    const total = 128
    const online = 98
    const offline = 30
    const unreachable = 12
    const groups = 8
    return { total, online, offline, unreachable, groups }
  }, [])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return allRows.filter((r) => {
      if (tab === 'online' && r.status !== 'Online') return false
      if (tab === 'offline' && r.status !== 'Offline') return false
      if (tab === 'unreachable' && r.status !== 'Unreachable') return false

      if (!needle) return true
      const hay = [r.name, r.subtitle, r.ip, r.type, r.os, r.status, r.group].join(' ').toLowerCase()
      return hay.includes(needle)
    })
  }, [allRows, q, tab])

  const total = tab === 'all' ? counts.total : filtered.length
  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * rowsPerPage
  const pageRows = filtered.slice(start, start + rowsPerPage)
  const showingFrom = filtered.length ? start + 1 : 0
  const showingTo = filtered.length ? Math.min(filtered.length, start + rowsPerPage) : 0

  return (
    <DashboardLayout>
      <Helmet>
        <title>Devices · WAP INTELLYSYS</title>
      </Helmet>

      <div className="w-full">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="m-0 text-2xl font-semibold tracking-tight text-white">Devices</h1>
            <p className="mt-1 text-sm text-secondary">Manage and monitor your network devices</p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end lg:w-auto">
            <div className="relative w-full sm:w-[260px]">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-secondary"
                aria-hidden
              />
              <input
                value={q}
                onChange={(e) => {
                  setPage(1)
                  setQ(e.target.value)
                }}
                placeholder="Search devices..."
                className="h-9 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white/90 outline-none placeholder:text-secondary/70 focus:border-white/20"
              />
            </div>

            <SoftButton ariaLabel="Filters">
              Filters <ChevronDown className="size-4 text-secondary" aria-hidden />
            </SoftButton>
            <SoftButton ariaLabel="Import devices">Import</SoftButton>
            <PrimaryButton>
              <Plus className="size-4" aria-hidden />
              Add Device
            </PrimaryButton>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Total Devices"
            value={`${counts.total}`}
            meta="All Devices"
            iconBg="bg-primary/10"
            icon={<Laptop className="size-5 text-primary" aria-hidden />}
          />
          <StatCard
            title="Online"
            value={`${counts.online}`}
            meta={`${Math.round((counts.online / counts.total) * 10000) / 100}% of total`}
            iconBg="bg-success/10"
            icon={<Laptop className="size-5 text-success" aria-hidden />}
          />
          <StatCard
            title="Offline"
            value={`${counts.offline}`}
            meta={`${Math.round((counts.offline / counts.total) * 10000) / 100}% of total`}
            iconBg="bg-danger/10"
            icon={<WifiOff className="size-5 text-danger" aria-hidden />}
          />
          <StatCard
            title="Unreachable"
            value={`${counts.unreachable}`}
            meta={`${Math.round((counts.unreachable / counts.total) * 10000) / 100}% of total`}
            iconBg="bg-warning/10"
            icon={<WifiOff className="size-5 text-warning" aria-hidden />}
          />
          <StatCard
            title="Groups"
            value={`${counts.groups}`}
            meta="Device Groups"
            iconBg="bg-purple-400/10"
            icon={<HardDrive className="size-5 text-purple-300" aria-hidden />}
          />
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-surface/80 shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
          <div className="flex flex-col gap-2 border-b border-white/10 px-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-6">
                <TabButton
                  active={tab === 'all'}
                  label={`All Devices (${counts.total})`}
                  onClick={() => {
                    setPage(1)
                    setTab('all')
                  }}
                />
                <TabButton
                  active={tab === 'online'}
                  label={`Online (${counts.online})`}
                  onClick={() => {
                    setPage(1)
                    setTab('online')
                  }}
                />
                <TabButton
                  active={tab === 'offline'}
                  label={`Offline (${counts.offline})`}
                  onClick={() => {
                    setPage(1)
                    setTab('offline')
                  }}
                />
                <TabButton
                  active={tab === 'unreachable'}
                  label={`Unreachable (${counts.unreachable})`}
                  onClick={() => {
                    setPage(1)
                    setTab('unreachable')
                  }}
                />
                <TabButton
                  active={tab === 'groups'}
                  label={`Groups (${counts.groups})`}
                  onClick={() => {
                    setPage(1)
                    setTab('groups')
                  }}
                />
              </div>

              <div className="flex items-center gap-2 py-2 text-secondary">
                <SoftButton className="h-8 px-2 text-xs" ariaLabel="Refresh">
                  <RefreshCw className="size-4" aria-hidden />
                </SoftButton>
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="overflow-auto">
              <table className="min-w-[1050px] w-full border-collapse text-left text-sm">
                <thead className="bg-transparent text-[11px] font-semibold uppercase tracking-wide text-secondary">
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3">Device Name</th>
                    <th className="px-4 py-3">IP Address</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">OS</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Last Seen</th>
                    <th className="px-4 py-3">Group</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tab === 'groups' ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-center text-secondary">
                        Group view is coming soon.
                      </td>
                    </tr>
                  ) : pageRows.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-center text-secondary">
                        No devices found.
                      </td>
                    </tr>
                  ) : (
                    pageRows.map((d) => (
                      <tr
                        key={d.id}
                        className="border-t border-white/5 hover:bg-white/4 hover:backdrop-blur-sm"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="grid size-9 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                              {typeIcon(d.type)}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate font-medium text-white">{d.name}</div>
                              <div className="truncate text-xs text-secondary">{d.subtitle}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-secondary">{d.ip}</td>
                        <td className="px-4 py-3 text-secondary">{d.type}</td>
                        <td className="px-4 py-3 text-secondary">{d.os}</td>
                        <td className="px-4 py-3">
                          <span
                            className={[
                              'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
                              statusPillClass(d.status),
                            ].join(' ')}
                          >
                            {d.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-secondary">{d.lastSeen}</td>
                        <td className="px-4 py-3 text-secondary">{d.group}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {}}
                              className="inline-flex size-9 items-center justify-center rounded-lg text-secondary hover:bg-white/5 hover:text-white"
                              aria-label="Edit device"
                            >
                              <Pencil className="size-4" aria-hidden />
                            </button>
                            <div className="relative">
                              <button
                                onClick={() => setMenuId((prev) => (prev === d.id ? null : d.id))}
                                className="inline-flex size-9 items-center justify-center rounded-lg text-secondary hover:bg-white/5 hover:text-white"
                                aria-label="More actions"
                              >
                                <MoreVertical className="size-4" aria-hidden />
                              </button>
                              {menuId === d.id ? (
                                <div className="absolute right-0 top-10 z-20 w-40 overflow-hidden rounded-lg border border-white/10 bg-surface shadow-[0_12px_24px_rgba(0,0,0,0.3)]">
                                  <button
                                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-danger hover:bg-white/5"
                                    onClick={() => setMenuId(null)}
                                  >
                                    <Trash2 className="size-4" aria-hidden />
                                    Remove
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-2 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-secondary">
                Showing {showingFrom} to {showingTo} of {total} devices
              </div>

              <div className="flex items-center gap-2 text-xs text-secondary">
                <button
                  type="button"
                  className="rounded-md px-2 py-1 hover:bg-white/5 disabled:opacity-40"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage <= 1}
                >
                  ‹
                </button>

                {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => {
                  const p = i + 1
                  const active = p === safePage
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPage(p)}
                      className={[
                        'rounded-md px-2.5 py-1',
                        active ? 'bg-primary/20 font-semibold text-white' : 'hover:bg-white/5',
                      ].join(' ')}
                    >
                      {p}
                    </button>
                  )
                })}

                {totalPages > 4 ? <span className="px-1">…</span> : null}

                {totalPages > 3 ? (
                  <button
                    type="button"
                    onClick={() => setPage(totalPages)}
                    className="rounded-md px-2.5 py-1 hover:bg-white/5"
                  >
                    {totalPages}
                  </button>
                ) : null}

                <button
                  type="button"
                  className="rounded-md px-2 py-1 hover:bg-white/5 disabled:opacity-40"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage >= totalPages}
                >
                  ›
                </button>

                <span className="ml-3">Rows per page</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    const v = Number(e.target.value) as 10 | 25 | 50
                    setPage(1)
                    setRowsPerPage(v)
                  }}
                  className="h-8 rounded-lg border border-white/10 bg-white/5 px-2 text-xs font-semibold text-white/90 outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

