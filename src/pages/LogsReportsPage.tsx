import UnderDevelopmentBanner from '@/components/common/UnderDevelopmentBanner'
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout'
import DonutChart, { type DonutSegment } from '@/components/modules/users-management/DonutChart'
import {
  Bug,
  Calendar,
  ChevronDown,
  CircleAlert,
  Copy,
  Download,
  Eye,
  Filter,
  FileText,
  Info,
  Plus,
  RefreshCw,
  Search,
  TriangleAlert,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'

type Level = 'Error' | 'Warning' | 'Info' | 'Debug'

function levelPill(level: Level) {
  if (level === 'Error') return 'border-danger/30 bg-danger/10 text-danger'
  if (level === 'Warning') return 'border-warning/30 bg-warning/10 text-warning'
  if (level === 'Info') return 'border-primary/30 bg-primary/10 text-primary'
  return 'border-purple-400/30 bg-purple-400/10 text-purple-300'
}

function levelDot(level: Level) {
  if (level === 'Error') return 'bg-danger'
  if (level === 'Warning') return 'bg-warning'
  if (level === 'Info') return 'bg-primary'
  return 'bg-purple-400'
}

function CardShell({
  title,
  right,
  children,
}: {
  title?: string
  right?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-white/15 bg-white/5 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
      {title ? (
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="text-sm font-semibold text-white">{title}</div>
          {right ? <div className="text-xs font-semibold text-primary">{right}</div> : null}
        </div>
      ) : null}
      <div className="px-4 py-3">{children}</div>
    </section>
  )
}

function KpiCard({
  label,
  value,
  sub,
  delta,
  deltaClass,
  icon,
  iconBg,
  iconRing,
}: {
  label: string
  value: string
  sub: string
  delta?: string
  deltaClass?: string
  icon: React.ReactNode
  iconBg: string
  iconRing: string
}) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-4 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-secondary">{label}</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</div>
          <div className="mt-1 text-xs text-secondary">{sub}</div>
          {delta ? (
            <div className={['mt-2 text-[11px] font-semibold', deltaClass ?? 'text-secondary'].join(' ')}>
              {delta}
            </div>
          ) : null}
        </div>
        <div
          className={[
            'grid size-10 place-items-center rounded-lg ring-1',
            iconBg,
            iconRing,
          ].join(' ')}
          aria-hidden
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

function GhostSelect({ value }: { value: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-medium text-white/80 hover:bg-white/7"
    >
      <span className="truncate">{value}</span>
      <ChevronDown className="size-4 text-secondary" aria-hidden />
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

function SoftButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-semibold text-white/90 hover:bg-white/7"
    >
      {children}
    </button>
  )
}

function LineChartCard() {
  return (
    <section className="rounded-xl border border-white/15 bg-white/5 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="text-sm font-semibold text-white">Logs Over Time</div>
        <div className="flex items-center gap-3 text-xs font-semibold text-secondary">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-danger" aria-hidden />
            Error
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-warning" aria-hidden />
            Warning
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-primary" aria-hidden />
            Info
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-purple-400" aria-hidden />
            Debug
          </span>
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="relative h-[170px] rounded-lg border border-white/10 bg-[#0b0e14]/40">
          <svg viewBox="0 0 600 180" className="h-full w-full">
            <defs>
              <linearGradient id="areaInfo" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="rgba(37,99,235,0.35)" />
                <stop offset="1" stopColor="rgba(37,99,235,0.02)" />
              </linearGradient>
              <linearGradient id="areaWarn" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="rgba(245,158,11,0.28)" />
                <stop offset="1" stopColor="rgba(245,158,11,0.02)" />
              </linearGradient>
              <linearGradient id="areaErr" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="rgba(239,68,68,0.25)" />
                <stop offset="1" stopColor="rgba(239,68,68,0.02)" />
              </linearGradient>
              <linearGradient id="areaDbg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="rgba(168,85,247,0.22)" />
                <stop offset="1" stopColor="rgba(168,85,247,0.02)" />
              </linearGradient>
            </defs>

            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={i}
                x1={(i + 1) * 90}
                y1="14"
                x2={(i + 1) * 90}
                y2="166"
                stroke="rgba(255,255,255,0.06)"
              />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <line
                key={i}
                x1="18"
                y1={30 + i * 35}
                x2="582"
                y2={30 + i * 35}
                stroke="rgba(255,255,255,0.06)"
              />
            ))}

            <path
              d="M20,110 C90,85 120,92 180,72 C260,45 290,60 350,48 C420,35 470,55 580,44 L580,166 L20,166 Z"
              fill="url(#areaInfo)"
            />
            <path
              d="M20,128 C90,120 120,125 180,115 C260,110 290,118 350,112 C420,105 470,120 580,110 L580,166 L20,166 Z"
              fill="url(#areaWarn)"
            />
            <path
              d="M20,150 C90,144 120,146 180,140 C260,138 290,142 350,140 C420,138 470,145 580,142 L580,166 L20,166 Z"
              fill="url(#areaErr)"
            />
            <path
              d="M20,160 C90,158 120,159 180,156 C260,154 290,156 350,155 C420,154 470,158 580,156 L580,166 L20,166 Z"
              fill="url(#areaDbg)"
            />

            <path
              d="M20,110 C90,85 120,92 180,72 C260,45 290,60 350,48 C420,35 470,55 580,44"
              fill="none"
              stroke="rgba(37,99,235,0.95)"
              strokeWidth="2.2"
            />
            <path
              d="M20,128 C90,120 120,125 180,115 C260,110 290,118 350,112 C420,105 470,120 580,110"
              fill="none"
              stroke="rgba(245,158,11,0.95)"
              strokeWidth="2"
            />
            <path
              d="M20,150 C90,144 120,146 180,140 C260,138 290,142 350,140 C420,138 470,145 580,142"
              fill="none"
              stroke="rgba(239,68,68,0.95)"
              strokeWidth="2"
            />
            <path
              d="M20,160 C90,158 120,159 180,156 C260,154 290,156 350,155 C420,154 470,158 580,156"
              fill="none"
              stroke="rgba(168,85,247,0.9)"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-secondary">
          <span>May 19</span>
          <span>May 20</span>
          <span>May 21</span>
          <span>May 22</span>
          <span>May 23</span>
          <span>May 24</span>
          <span>May 25</span>
        </div>
      </div>
    </section>
  )
}

export default function LogsReportsPage() {
  const kpis = [
    {
      label: 'Total Logs',
      value: '125,428',
      sub: '100% of total logs',
      icon: <FileText className="size-5 text-primary" aria-hidden />,
      iconBg: 'bg-primary/10',
      iconRing: 'ring-primary/25',
    },
    {
      label: 'Error Logs',
      value: '2,345',
      sub: 'in last 7 days',
      delta: '↓ 12.4% vs last 7 days',
      deltaClass: 'text-danger',
      icon: <CircleAlert className="size-5 text-danger" aria-hidden />,
      iconBg: 'bg-danger/10',
      iconRing: 'ring-danger/25',
    },
    {
      label: 'Warning Logs',
      value: '8,732',
      sub: 'in last 7 days',
      delta: '↑ 8.6% vs last 7 days',
      deltaClass: 'text-success',
      icon: <TriangleAlert className="size-5 text-warning" aria-hidden />,
      iconBg: 'bg-warning/10',
      iconRing: 'ring-warning/25',
    },
    {
      label: 'Info Logs',
      value: '98,351',
      sub: 'in last 7 days',
      delta: '↑ 5.2% vs last 7 days',
      deltaClass: 'text-success',
      icon: <Info className="size-5 text-primary" aria-hidden />,
      iconBg: 'bg-primary/10',
      iconRing: 'ring-primary/25',
    },
    {
      label: 'Debug Logs',
      value: '12,845',
      sub: 'in last 7 days',
      delta: '↑ 3.1% vs last 7 days',
      deltaClass: 'text-success',
      icon: <Bug className="size-5 text-purple-300" aria-hidden />,
      iconBg: 'bg-purple-400/10',
      iconRing: 'ring-purple-400/25',
    },
  ] as const

  const logs: Array<{
    time: string
    level: Level
    source: string
    device: string
    deviceIp: string
    message: string
  }> = [
    {
      time: 'May 25, 2025 12:02:15 PM',
      level: 'Error',
      source: 'Network Monitor',
      device: 'Router-01',
      deviceIp: '192.168.1.1',
      message: 'Device interface eth0 is down',
    },
    {
      time: 'May 25, 2025 12:01:48 PM',
      level: 'Warning',
      source: 'Performance Monitor',
      device: 'Switch-02',
      deviceIp: '192.168.1.2',
      message: 'High latency detected on interface G0/1 (280ms)',
    },
    {
      time: 'May 25, 2025 12:01:22 PM',
      level: 'Info',
      source: 'Authentication',
      device: 'AP-01',
      deviceIp: '192.168.1.20',
      message: 'User admin logged in successfully',
    },
    {
      time: 'May 25, 2025 12:00:59 PM',
      level: 'Info',
      source: 'System',
      device: 'Server-01',
      deviceIp: '192.168.1.10',
      message: 'Configuration backup completed',
    },
    {
      time: 'May 25, 2025 12:00:36 PM',
      level: 'Error',
      source: 'Security Monitor',
      device: 'Firewall-01',
      deviceIp: '192.168.1.3',
      message: 'Multiple failed login attempts detected from 203.0.113.25',
    },
    {
      time: 'May 25, 2025 11:59:57 AM',
      level: 'Warning',
      source: 'Bandwidth Monitor',
      device: 'Router-01',
      deviceIp: '192.168.1.1',
      message: 'Bandwidth usage is above 85% on interface eth1',
    },
    {
      time: 'May 25, 2025 11:59:31 AM',
      level: 'Info',
      source: 'Device Manager',
      device: 'Switch-02',
      deviceIp: '192.168.1.2',
      message: 'Firmware update available: Version 15.2(2)E',
    },
    {
      time: 'May 25, 2025 11:58:44 AM',
      level: 'Debug',
      source: 'Packet Analyzer',
      device: 'Server-02',
      deviceIp: '192.168.1.11',
      message: 'Captured packet: TCP 192.168.1.10:443 → 172.217.16.14:51532',
    },
    {
      time: 'May 25, 2025 11:58:12 AM',
      level: 'Info',
      source: 'System',
      device: 'AP-01',
      deviceIp: '192.168.1.20',
      message: 'Device rebooted successfully',
    },
    {
      time: 'May 25, 2025 11:57:48 AM',
      level: 'Warning',
      source: 'Configuration',
      device: 'Firewall-01',
      deviceIp: '192.168.1.3',
      message: 'Configuration change detected by user John Doe',
    },
  ]

  const sources = [
    { name: 'System', count: '45,231', color: 'bg-emerald-400' },
    { name: 'Network Monitor', count: '28,451', color: 'bg-primary' },
    { name: 'Security Monitor', count: '18,739', color: 'bg-danger' },
    { name: 'Authentication', count: '12,845', color: 'bg-purple-400' },
    { name: 'Performance Monitor', count: '8,732', color: 'bg-warning' },
    { name: 'Device Manager', count: '6,345', color: 'bg-cyan-400' },
    { name: 'Packet Analyzer', count: '4,231', color: 'bg-fuchsia-400' },
    { name: 'Configuration', count: '980', color: 'bg-white/40' },
  ] as const

  const reports = [
    { name: 'System Health Report', when: 'May 25, 2025 12:00 PM', status: 'Scheduled' },
    { name: 'Security Report', when: 'May 25, 2025 11:59 AM', status: 'Scheduled' },
    { name: 'Bandwidth Usage Report', when: 'May 25, 2025 11:30 AM', status: 'Scheduled' },
    { name: 'Device Inventory Report', when: 'May 25, 2025 10:00 AM', status: 'Scheduled' },
    { name: 'Alerts Summary Report', when: 'May 25, 2025 09:00 AM', status: 'Scheduled' },
  ] as const

  const donutTotal = 125_428
  const donutSegments: DonutSegment[] = [
    { name: 'Info', count: 98_351, color: '#2563eb' },
    { name: 'Warning', count: 8_732, color: '#f59e0b' },
    { name: 'Error', count: 2_345, color: '#ef4444' },
    { name: 'Debug', count: 12_845, color: '#a855f7' },
  ]

  return (
    <DashboardLayout>
      <Helmet>
        <title>Logs &amp; Reports · WAP INTELLYSYS</title>
      </Helmet>

      <div className="w-full">
        <UnderDevelopmentBanner />

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="m-0 text-2xl font-semibold tracking-tight text-white">Logs &amp; Reports</h1>
            <p className="mt-1 text-sm text-secondary">View, search and analyze system logs and reports</p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-semibold text-white/90 hover:bg-white/7"
            >
              <Calendar className="size-4 text-secondary" aria-hidden />
              May 19, 2025 - May 25, 2025
              <ChevronDown className="size-4 text-secondary" aria-hidden />
            </button>
            <SoftButton>
              <Download className="size-4 text-secondary" aria-hidden />
              Export Logs
            </SoftButton>
            <PrimaryButton>
              <Plus className="size-4" aria-hidden />
              New Report
            </PrimaryButton>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {kpis.map((k) => (
                <KpiCard key={k.label} {...k} />
              ))}
            </div>

            <section className="rounded-xl border border-white/15 bg-white/5 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
              <div className="flex flex-col gap-3 border-b border-white/10 p-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full lg:max-w-[320px]">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-secondary" aria-hidden />
                  <input
                    placeholder="Search logs..."
                    className="h-9 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white/90 outline-none placeholder:text-secondary/70 focus:border-white/20"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <GhostSelect value="All Sources" />
                  <GhostSelect value="All Levels" />
                  <GhostSelect value="All Devices" />
                  <SoftButton>
                    <Filter className="size-4 text-secondary" aria-hidden />
                    More Filters
                    <ChevronDown className="size-4 text-secondary" aria-hidden />
                  </SoftButton>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button type="button" className="h-9 px-3 text-sm font-semibold text-secondary hover:text-white">
                    Clear
                  </button>
                  <PrimaryButton>Apply Filters</PrimaryButton>
                  <button
                    type="button"
                    className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-secondary hover:bg-white/7 hover:text-white"
                    aria-label="Refresh"
                  >
                    <RefreshCw className="size-4" aria-hidden />
                  </button>
                </div>
              </div>

              <div className="overflow-hidden">
                <table className="w-full border-collapse">
                  <thead className="bg-white/2">
                    <tr className="border-b border-white/10 text-left text-[11px] font-semibold uppercase tracking-wide text-secondary">
                      <th className="px-4 py-3">Time</th>
                      <th className="px-4 py-3">Level</th>
                      <th className="px-4 py-3">Source</th>
                      <th className="px-4 py-3">Device</th>
                      <th className="px-4 py-3">Message</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((l) => (
                      <tr key={`${l.time}-${l.message}`} className="border-b border-white/10 hover:bg-white/3">
                        <td className="px-4 py-3 text-sm text-white/80">{l.time}</td>
                        <td className="px-4 py-3">
                          <span
                            className={[
                              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
                              levelPill(l.level),
                            ].join(' ')}
                          >
                            <span className={['size-1.5 rounded-full', levelDot(l.level)].join(' ')} aria-hidden />
                            {l.level}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-secondary">{l.source}</td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-semibold text-white/90">{l.device}</div>
                          <div className="text-xs text-secondary">{l.deviceIp}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-white/80">{l.message}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-secondary hover:bg-white/7 hover:text-white"
                              aria-label="View log"
                            >
                              <Eye className="size-4" aria-hidden />
                            </button>
                            <button
                              type="button"
                              className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-secondary hover:bg-white/7 hover:text-white"
                              aria-label="Copy log"
                            >
                              <Copy className="size-4" aria-hidden />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-secondary">Showing 1 to 10 of 125,428 logs</div>
                  <div className="flex items-center gap-2 text-xs text-secondary">
                    <button type="button" className="rounded-md px-2 py-1 hover:bg-white/5">
                      ‹
                    </button>
                    <button type="button" className="rounded-md bg-primary/20 px-2.5 py-1 font-semibold text-white">
                      1
                    </button>
                    <button type="button" className="rounded-md px-2.5 py-1 hover:bg-white/5">
                      2
                    </button>
                    <button type="button" className="rounded-md px-2.5 py-1 hover:bg-white/5">
                      3
                    </button>
                    <button type="button" className="rounded-md px-2.5 py-1 hover:bg-white/5">
                      4
                    </button>
                    <button type="button" className="rounded-md px-2.5 py-1 hover:bg-white/5">
                      5
                    </button>
                    <span className="px-1">…</span>
                    <button type="button" className="rounded-md px-2.5 py-1 hover:bg-white/5">
                      12,543
                    </button>
                    <button type="button" className="rounded-md px-2 py-1 hover:bg-white/5">
                      ›
                    </button>
                    <span className="ml-3">Rows per page</span>
                    <GhostSelect value="10" />
                  </div>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
              <LineChartCard />

              <CardShell title="Logs by Level">
                <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
                  <DonutChart segments={donutSegments} total={donutTotal} />
                  <div className="space-y-2">
                    {donutSegments.map((s) => {
                      const pct = donutTotal ? Math.round((s.count / donutTotal) * 1000) / 10 : 0
                      return (
                        <div key={s.name} className="flex items-center justify-between gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="size-2.5 rounded-full" style={{ background: s.color }} aria-hidden />
                            <span className="font-semibold text-white/90">{s.name}</span>
                          </div>
                          <div className="text-xs text-secondary">
                            {s.count.toLocaleString()} ({pct}%)
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardShell>
            </div>
          </div>

          <div className="space-y-4">
            <CardShell
              title="Log Sources"
              right={<button className="text-xs font-semibold text-primary hover:text-primary/80">View All</button>}
            >
              <div className="space-y-2">
                {sources.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/4 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={['size-2.5 rounded', s.color].join(' ')} aria-hidden />
                      <div className="text-sm font-semibold text-white/90">{s.name}</div>
                    </div>
                    <div className="text-xs font-semibold text-secondary">{s.count}</div>
                  </div>
                ))}
              </div>
            </CardShell>

            <CardShell
              title="Reports"
              right={<button className="text-xs font-semibold text-primary hover:text-primary/80">View All</button>}
            >
              <div className="space-y-2">
                {reports.map((r) => (
                  <div
                    key={r.name}
                    className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/4 px-3 py-2.5"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-white/90">{r.name}</div>
                      <div className="truncate text-xs text-secondary">{r.when}</div>
                    </div>
                    <span className="rounded-full border border-success/25 bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 border-t border-white/10 pt-3">
                <button
                  type="button"
                  className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-primary/35 bg-primary/10 px-3 text-sm font-semibold text-primary hover:bg-primary/15"
                >
                  <Plus className="size-4" aria-hidden />
                  New Report
                </button>
              </div>
            </CardShell>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

