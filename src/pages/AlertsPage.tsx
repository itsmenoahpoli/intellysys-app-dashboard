import UnderDevelopmentBanner from '@/components/common/UnderDevelopmentBanner'
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout'
import DonutChart, { type DonutSegment } from '@/components/modules/users-management/DonutChart'
import {
  BellOff,
  Calendar,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Eye,
  Info,
  MoreVertical,
  Search,
  Settings2,
  TriangleAlert,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useMemo, useState } from 'react'

type Severity = 'Critical' | 'Warning' | 'Info' | 'Resolved' | 'Muted'
type Status = 'Active' | 'Acknowledged' | 'Resolved'

const ALERTS: Array<{
  time: string
  severity: Severity
  device: string
  deviceIp: string
  message: string
  source: string
  status: Status
  assignedTo: string
}> = [
  {
    time: 'May 25, 2025 12:02 PM',
    severity: 'Critical',
    device: 'Router-01',
    deviceIp: '192.168.1.1',
    message: 'Device is down',
    source: 'Network Monitor',
    status: 'Active',
    assignedTo: 'Network Team',
  },
  {
    time: 'May 25, 2025 11:15 AM',
    severity: 'Warning',
    device: 'Switch-02',
    deviceIp: '192.168.1.2',
    message: 'High latency detected (280ms)',
    source: 'Performance Monitor',
    status: 'Active',
    assignedTo: 'John Doe',
  },
  {
    time: 'May 25, 2025 10:48 AM',
    severity: 'Warning',
    device: 'Firewall-01',
    deviceIp: '192.168.1.3',
    message: 'High bandwidth usage (85%)',
    source: 'Bandwidth Monitor',
    status: 'Active',
    assignedTo: 'Jane Smith',
  },
  {
    time: 'May 25, 2025 09:32 AM',
    severity: 'Info',
    device: 'Server-01',
    deviceIp: '192.168.1.10',
    message: 'Backup completed successfully',
    source: 'Backup System',
    status: 'Resolved',
    assignedTo: 'System',
  },
  {
    time: 'May 24, 2025 11:40 PM',
    severity: 'Critical',
    device: 'AP-01',
    deviceIp: '192.168.1.20',
    message: 'High packet loss (15%)',
    source: 'Network Monitor',
    status: 'Active',
    assignedTo: 'Network Team',
  },
  {
    time: 'May 24, 2025 10:21 PM',
    severity: 'Warning',
    device: 'Internet (8.8.8.8)',
    deviceIp: '8.8.8.8',
    message: 'High latency to external host',
    source: 'Performance Monitor',
    status: 'Active',
    assignedTo: 'John Doe',
  },
  {
    time: 'May 24, 2025 08:55 PM',
    severity: 'Info',
    device: 'Server-Backup',
    deviceIp: '192.168.1.60',
    message: 'Backup verification completed',
    source: 'Backup System',
    status: 'Resolved',
    assignedTo: 'System',
  },
  {
    time: 'May 24, 2025 07:10 PM',
    severity: 'Critical',
    device: 'Firewall-01',
    deviceIp: '192.168.1.3',
    message: 'Multiple failed login attempts detected',
    source: 'Security Monitor',
    status: 'Active',
    assignedTo: 'Security Team',
  },
  {
    time: 'May 24, 2025 05:30 PM',
    severity: 'Warning',
    device: 'Switch-02',
    deviceIp: '192.168.1.2',
    message: 'Port utilization above 80%',
    source: 'Network Monitor',
    status: 'Acknowledged',
    assignedTo: 'Mike Johnson',
  },
  {
    time: 'May 24, 2025 03:18 PM',
    severity: 'Info',
    device: 'AP-01',
    deviceIp: '192.168.1.20',
    message: 'Configuration changed',
    source: 'Configuration Monitor',
    status: 'Resolved',
    assignedTo: 'System',
  },
]

function severityPill(s: Severity) {
  if (s === 'Critical') return 'border-danger/30 bg-danger/10 text-danger'
  if (s === 'Warning') return 'border-warning/30 bg-warning/10 text-warning'
  if (s === 'Info') return 'border-primary/30 bg-primary/10 text-primary'
  if (s === 'Resolved') return 'border-success/30 bg-success/10 text-success'
  return 'border-purple-400/30 bg-purple-400/10 text-purple-300'
}

function statusPill(s: Status) {
  if (s === 'Resolved') return 'border-success/30 bg-success/10 text-success'
  if (s === 'Acknowledged') return 'border-warning/30 bg-warning/10 text-warning'
  return 'border-danger/30 bg-danger/10 text-danger'
}

function severityDot(s: Severity) {
  if (s === 'Critical') return 'bg-danger'
  if (s === 'Warning') return 'bg-warning'
  if (s === 'Info') return 'bg-primary'
  if (s === 'Resolved') return 'bg-success'
  return 'bg-purple-400'
}

function severityIcon(s: Severity) {
  if (s === 'Critical') return <CircleAlert className="size-5 text-danger" aria-hidden />
  if (s === 'Warning') return <TriangleAlert className="size-5 text-warning" aria-hidden />
  if (s === 'Info') return <Info className="size-5 text-primary" aria-hidden />
  if (s === 'Resolved') return <CheckCircle2 className="size-5 text-success" aria-hidden />
  return <BellOff className="size-5 text-purple-300" aria-hidden />
}

function severityIconBg(s: Severity) {
  if (s === 'Critical') return 'bg-danger/10 ring-danger/25'
  if (s === 'Warning') return 'bg-warning/10 ring-warning/25'
  if (s === 'Info') return 'bg-primary/10 ring-primary/25'
  if (s === 'Resolved') return 'bg-success/10 ring-success/25'
  return 'bg-purple-400/10 ring-purple-400/25'
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

function KpiCard({
  label,
  value,
  severity,
}: {
  label: string
  value: number
  severity: Severity
}) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-4 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-secondary">{label}</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</div>
        </div>
        <div
          className={[
            'grid size-10 place-items-center rounded-lg ring-1',
            severityIconBg(severity),
          ].join(' ')}
          aria-hidden
        >
          {severityIcon(severity)}
        </div>
      </div>
    </div>
  )
}

function LineChartCard() {
  return (
    <section className="rounded-xl border border-white/15 bg-white/5 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="text-sm font-semibold text-white">Alerts Over Time</div>
        <div className="flex items-center gap-3 text-xs font-semibold text-secondary">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-danger" aria-hidden />
            Critical
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
            <span className="size-2 rounded-full bg-success" aria-hidden />
            Resolved
          </span>
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="relative h-[170px] rounded-lg border border-white/10 bg-[#0b0e14]/40">
          <svg viewBox="0 0 600 180" className="h-full w-full">
            <defs>
              <linearGradient id="aCritical" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="rgba(239,68,68,0.24)" />
                <stop offset="1" stopColor="rgba(239,68,68,0.02)" />
              </linearGradient>
              <linearGradient id="aWarning" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="rgba(245,158,11,0.22)" />
                <stop offset="1" stopColor="rgba(245,158,11,0.02)" />
              </linearGradient>
              <linearGradient id="aInfo" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="rgba(37,99,235,0.26)" />
                <stop offset="1" stopColor="rgba(37,99,235,0.02)" />
              </linearGradient>
              <linearGradient id="aResolved" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="rgba(16,185,129,0.22)" />
                <stop offset="1" stopColor="rgba(16,185,129,0.02)" />
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
              d="M20,112 C90,88 120,104 180,84 C260,58 290,70 350,62 C420,48 470,78 580,60 L580,166 L20,166 Z"
              fill="url(#aInfo)"
            />
            <path
              d="M20,130 C90,120 120,132 180,122 C260,112 290,126 350,120 C420,110 470,128 580,118 L580,166 L20,166 Z"
              fill="url(#aWarning)"
            />
            <path
              d="M20,142 C90,138 120,144 180,140 C260,132 290,140 350,136 C420,128 470,140 580,134 L580,166 L20,166 Z"
              fill="url(#aCritical)"
            />
            <path
              d="M20,154 C90,150 120,156 180,154 C260,148 290,154 350,152 C420,146 470,154 580,150 L580,166 L20,166 Z"
              fill="url(#aResolved)"
            />

            <path
              d="M20,142 C90,138 120,144 180,140 C260,132 290,140 350,136 C420,128 470,140 580,134"
              fill="none"
              stroke="rgba(239,68,68,0.95)"
              strokeWidth="2"
            />
            <path
              d="M20,130 C90,120 120,132 180,122 C260,112 290,126 350,120 C420,110 470,128 580,118"
              fill="none"
              stroke="rgba(245,158,11,0.95)"
              strokeWidth="2"
            />
            <path
              d="M20,112 C90,88 120,104 180,84 C260,58 290,70 350,62 C420,48 470,78 580,60"
              fill="none"
              stroke="rgba(37,99,235,0.95)"
              strokeWidth="2.2"
            />
            <path
              d="M20,154 C90,150 120,156 180,154 C260,148 290,154 350,152 C420,146 470,154 580,150"
              fill="none"
              stroke="rgba(16,185,129,0.95)"
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

export default function AlertsPage() {
  const [tab, setTab] = useState<'all' | 'active' | 'ack' | 'resolved' | 'muted'>('all')

  const tabs = useMemo(
    () => [
      { id: 'all', label: 'All Alerts', count: 79 },
      { id: 'active', label: 'Active', count: 37 },
      { id: 'ack', label: 'Acknowledged', count: 22 },
      { id: 'resolved', label: 'Resolved', count: 20 },
      { id: 'muted', label: 'Muted', count: 8 },
    ] as const,
    [],
  )

  const kpis = [
    { label: 'Critical', value: 25, severity: 'Critical' as const },
    { label: 'Warning', value: 12, severity: 'Warning' as const },
    { label: 'Info', value: 24, severity: 'Info' as const },
    { label: 'Resolved', value: 18, severity: 'Resolved' as const },
    { label: 'Muted', value: 8, severity: 'Muted' as const },
  ] as const

  const filtered = useMemo(() => {
    if (tab === 'all') return ALERTS
    if (tab === 'active') return ALERTS.filter((a) => a.status === 'Active')
    if (tab === 'ack') return ALERTS.filter((a) => a.status === 'Acknowledged')
    if (tab === 'resolved') return ALERTS.filter((a) => a.status === 'Resolved')
    return ALERTS.filter((a) => a.severity === 'Muted')
  }, [tab])

  const donutTotal = 79
  const donutSegments: DonutSegment[] = [
    { name: 'Critical', count: 25, color: '#ef4444' },
    { name: 'Warning', count: 12, color: '#f59e0b' },
    { name: 'Info', count: 24, color: '#2563eb' },
    { name: 'Resolved', count: 18, color: '#10b981' },
  ]

  const sources = [
    { name: 'Network Monitor', n: 28, pct: 35.4, color: 'bg-danger' },
    { name: 'Performance Monitor', n: 18, pct: 22.8, color: 'bg-warning' },
    { name: 'Bandwidth Monitor', n: 12, pct: 15.2, color: 'bg-primary' },
    { name: 'Security Monitor', n: 9, pct: 11.4, color: 'bg-purple-400' },
    { name: 'Backup System', n: 7, pct: 8.9, color: 'bg-success' },
    { name: 'Configuration Monitor', n: 5, pct: 6.3, color: 'bg-white/40' },
  ] as const

  return (
    <DashboardLayout>
      <Helmet>
        <title>Alerts · WAP INTELLYSYS</title>
      </Helmet>

      <div className="w-full">
        <UnderDevelopmentBanner />

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="m-0 text-2xl font-semibold tracking-tight text-white">Alerts</h1>
            <p className="mt-1 text-sm text-secondary">
              View and manage system alerts and notifications
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
            <SoftButton>
              <CheckCheck className="size-4 text-secondary" aria-hidden />
              Mark All Read
            </SoftButton>
            <SoftButton>
              <Settings2 className="size-4 text-secondary" aria-hidden />
              Alert Rules
            </SoftButton>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {kpis.map((k) => (
              <KpiCard key={k.label} label={k.label} value={k.value} severity={k.severity} />
            ))}
          </div>

          <section className="rounded-xl border border-white/15 bg-white/5 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
            <div className="flex flex-col gap-3 border-b border-white/10 p-3">
              <div className="flex flex-wrap items-center gap-2">
                {tabs.map((t) => {
                  const active = tab === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTab(t.id)}
                      className={[
                        'relative px-2 py-1.5 text-sm font-semibold transition-colors',
                        active ? 'text-primary' : 'text-secondary hover:text-white',
                      ].join(' ')}
                    >
                      {t.label} <span className="text-secondary">({t.count})</span>
                      {active ? (
                        <span className="absolute inset-x-1 -bottom-1 h-[2px] rounded-full bg-primary" aria-hidden />
                      ) : null}
                    </button>
                  )
                })}

                <div className="ml-auto flex flex-wrap items-center gap-2">
                  <GhostSelect value="All Severities" />
                  <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-semibold text-white/90 hover:bg-white/7"
                  >
                    <Calendar className="size-4 text-secondary" aria-hidden />
                    May 19, 2025 - May 25, 2025
                    <ChevronDown className="size-4 text-secondary" aria-hidden />
                  </button>
                  <GhostSelect value="Filters" />
                  <div className="relative w-full sm:w-[240px]">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-secondary" aria-hidden />
                    <input
                      placeholder="Search alerts..."
                      className="h-9 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white/90 outline-none placeholder:text-secondary/70 focus:border-white/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              <table className="w-full border-collapse">
                <thead className="bg-white/2">
                  <tr className="border-b border-white/10 text-left text-[11px] font-semibold uppercase tracking-wide text-secondary">
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Severity</th>
                    <th className="px-4 py-3">Device</th>
                    <th className="px-4 py-3">Message</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Assigned To</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a) => (
                    <tr key={`${a.time}-${a.device}-${a.message}`} className="border-b border-white/10 hover:bg-white/3">
                      <td className="px-4 py-3 text-sm text-white/80">{a.time}</td>
                      <td className="px-4 py-3">
                        <span
                          className={[
                            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
                            severityPill(a.severity),
                          ].join(' ')}
                        >
                          <span className={['size-1.5 rounded-full', severityDot(a.severity)].join(' ')} aria-hidden />
                          {a.severity}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="grid size-8 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                            <span className="size-3 rounded bg-primary/40" aria-hidden />
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-white/90">{a.device}</div>
                            <div className="truncate text-xs text-secondary">{a.deviceIp}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-white/80">{a.message}</td>
                      <td className="px-4 py-3 text-sm text-secondary">{a.source}</td>
                      <td className="px-4 py-3">
                        <span
                          className={[
                            'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
                            statusPill(a.status),
                          ].join(' ')}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary">{a.assignedTo}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-secondary hover:bg-white/7 hover:text-white"
                            aria-label="View alert"
                          >
                            <Eye className="size-4" aria-hidden />
                          </button>
                          <button
                            type="button"
                            className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-secondary hover:bg-white/7 hover:text-white"
                            aria-label="More actions"
                          >
                            <MoreVertical className="size-4" aria-hidden />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-secondary">Showing 1 to 10 of 79 alerts</div>
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
                  <span className="px-1">…</span>
                  <button type="button" className="rounded-md px-2.5 py-1 hover:bg-white/5">
                    8
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

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <section className="rounded-xl border border-white/15 bg-white/5 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
              <div className="border-b border-white/10 px-4 py-3">
                <div className="text-sm font-semibold text-white">Alerts by Severity</div>
              </div>
              <div className="px-4 py-3">
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
              </div>
            </section>

            <LineChartCard />

            <section className="rounded-xl border border-white/15 bg-white/5 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
              <div className="border-b border-white/10 px-4 py-3">
                <div className="text-sm font-semibold text-white">Top Alert Sources</div>
              </div>
              <div className="px-4 py-3">
                <div className="space-y-3">
                  {sources.map((s) => (
                    <div key={s.name} className="grid grid-cols-[1fr_160px_72px] items-center gap-3">
                      <div className="min-w-0 truncate text-xs font-semibold text-white/80">{s.name}</div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/6">
                        <div className={['h-full rounded-full', s.color].join(' ')} style={{ width: `${s.pct}%` }} />
                      </div>
                      <div className="text-right text-xs font-semibold text-secondary">
                        {s.n} ({s.pct}%)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

