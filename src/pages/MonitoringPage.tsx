import UnderDevelopmentBanner from '@/components/common/UnderDevelopmentBanner'
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout'
import DonutChart, { type DonutSegment } from '@/components/modules/users-management/DonutChart'
import {
  Activity,
  Calendar,
  ChevronDown,
  Cpu,
  Gauge,
  HardDrive,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  Signal,
  WifiOff,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useMemo, useState } from 'react'

type Tab = 'overview' | 'devices' | 'performance' | 'bandwidth' | 'snmp'
type DeviceStatus = 'Online' | 'Warning' | 'Critical' | 'Offline'

function tabLabel(t: Tab) {
  if (t === 'overview') return 'Overview'
  if (t === 'devices') return 'Devices'
  if (t === 'performance') return 'Performance'
  if (t === 'bandwidth') return 'Bandwidth'
  return 'SNMP'
}

function statusPill(s: DeviceStatus) {
  if (s === 'Online') return 'border-success/30 bg-success/10 text-success'
  if (s === 'Warning') return 'border-warning/30 bg-warning/10 text-warning'
  if (s === 'Critical') return 'border-danger/30 bg-danger/10 text-danger'
  return 'border-white/15 bg-white/5 text-secondary'
}

function KpiCard({
  title,
  value,
  unit,
  delta,
  deltaClass,
  icon,
  iconBg,
  spark,
  sparkStroke,
}: {
  title: string
  value: string
  unit?: string
  delta: string
  deltaClass: string
  icon: React.ReactNode
  iconBg: string
  spark: string
  sparkStroke: string
}) {
  return (
    <section className="rounded-xl border border-white/15 bg-white/5 p-4 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-secondary">{title}</div>
          <div className="mt-2 flex items-baseline gap-2">
            <div className="text-2xl font-semibold tracking-tight text-white">{value}</div>
            {unit ? <div className="text-sm font-semibold text-secondary">{unit}</div> : null}
          </div>
          <div className={['mt-1 text-[11px] font-semibold', deltaClass].join(' ')}>{delta}</div>
        </div>

        <div className="flex items-center gap-3">
          <div className={['grid size-10 place-items-center rounded-lg ring-1 ring-white/10', iconBg].join(' ')}>
            {icon}
          </div>
          <div className="hidden h-10 w-[110px] sm:block">
            <svg viewBox="0 0 110 40" className="h-full w-full">
              <path
                d={spark}
                fill="none"
                stroke={sparkStroke}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

function Panel({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-white/15 bg-white/5 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="text-sm font-semibold text-white">{title}</div>
        {right ? <div>{right}</div> : null}
      </div>
      <div className="px-4 py-3">{children}</div>
    </section>
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

function AvailabilityChart() {
  return (
    <div className="relative h-[160px] rounded-lg border border-white/10 bg-[#0b0e14]/40">
      <svg viewBox="0 0 600 180" className="h-full w-full">
        <defs>
          <linearGradient id="availArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="rgba(16,185,129,0.28)" />
            <stop offset="1" stopColor="rgba(16,185,129,0.02)" />
          </linearGradient>
        </defs>

        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1={(i + 1) * 90}
            y1="12"
            x2={(i + 1) * 90}
            y2="168"
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
          d="M20,62 C80,52 110,58 170,50 C240,40 280,56 340,44 C410,32 450,54 520,40 C555,33 570,44 580,38 L580,168 L20,168 Z"
          fill="url(#availArea)"
        />
        <path
          d="M20,62 C80,52 110,58 170,50 C240,40 280,56 340,44 C410,32 450,54 520,40 C555,33 570,44 580,38"
          fill="none"
          stroke="rgba(16,185,129,0.95)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

function ResponseTimeChart() {
  return (
    <div className="relative h-[160px] rounded-lg border border-white/10 bg-[#0b0e14]/40">
      <svg viewBox="0 0 600 180" className="h-full w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1={(i + 1) * 90}
            y1="12"
            x2={(i + 1) * 90}
            y2="168"
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
          d="M20,108 C90,92 120,118 180,100 C260,80 290,94 350,88 C420,78 470,98 580,86"
          fill="none"
          stroke="rgba(37,99,235,0.95)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M20,122 C90,112 120,132 180,118 C260,104 290,116 350,112 C420,102 470,120 580,110"
          fill="none"
          stroke="rgba(168,85,247,0.95)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M20,138 C90,132 120,146 180,138 C260,128 290,138 350,136 C420,128 470,140 580,134"
          fill="none"
          stroke="rgba(245,158,11,0.95)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

function BandwidthChart() {
  return (
    <div className="relative h-[170px] rounded-lg border border-white/10 bg-[#0b0e14]/40">
      <svg viewBox="0 0 600 180" className="h-full w-full">
        <defs>
          <linearGradient id="bwDown" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="rgba(37,99,235,0.35)" />
            <stop offset="1" stopColor="rgba(37,99,235,0.02)" />
          </linearGradient>
          <linearGradient id="bwUp" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="rgba(16,185,129,0.28)" />
            <stop offset="1" stopColor="rgba(16,185,129,0.02)" />
          </linearGradient>
        </defs>

        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1={(i + 1) * 90}
            y1="12"
            x2={(i + 1) * 90}
            y2="168"
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
          d="M20,78 C90,70 120,92 180,72 C260,58 290,84 350,68 C420,55 470,86 580,66 L580,168 L20,168 Z"
          fill="url(#bwDown)"
        />
        <path
          d="M20,120 C90,110 120,132 180,118 C260,100 290,122 350,112 C420,102 470,130 580,114 L580,168 L20,168 Z"
          fill="url(#bwUp)"
        />

        <path
          d="M20,78 C90,70 120,92 180,72 C260,58 290,84 350,68 C420,55 470,86 580,66"
          fill="none"
          stroke="rgba(37,99,235,0.95)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M20,120 C90,110 120,132 180,118 C260,100 290,122 350,112 C420,102 470,130 580,114"
          fill="none"
          stroke="rgba(16,185,129,0.95)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default function MonitoringPage() {
  const [tab, setTab] = useState<Tab>('overview')

  const tabs = useMemo(
    () =>
      [
        { id: 'overview', label: 'Overview' },
        { id: 'devices', label: 'Devices' },
        { id: 'performance', label: 'Performance' },
        { id: 'bandwidth', label: 'Bandwidth' },
        { id: 'snmp', label: 'SNMP' },
      ] as const,
    [],
  )

  const kpis = [
    {
      title: 'Average Latency',
      value: '12.4',
      unit: 'ms',
      delta: '↑ 8.8% from last hour',
      deltaClass: 'text-success',
      icon: <Activity className="size-5 text-primary" aria-hidden />,
      iconBg: 'bg-primary/10',
      spark: 'M2,26 L14,18 L26,22 L38,16 L50,24 L62,14 L74,20 L86,12 L98,22 L108,16',
      sparkStroke: 'rgba(37,99,235,0.95)',
    },
    {
      title: 'Packet Loss',
      value: '0.35',
      unit: '%',
      delta: '↑ 0.07% from last hour',
      deltaClass: 'text-danger',
      icon: <WifiOff className="size-5 text-danger" aria-hidden />,
      iconBg: 'bg-danger/10',
      spark: 'M2,20 L14,16 L26,22 L38,18 L50,24 L62,20 L74,28 L86,22 L98,30 L108,24',
      sparkStroke: 'rgba(239,68,68,0.95)',
    },
    {
      title: 'Uptime',
      value: '99.62',
      unit: '%',
      delta: '↑ 0.12% from last hour',
      deltaClass: 'text-success',
      icon: <Signal className="size-5 text-success" aria-hidden />,
      iconBg: 'bg-success/10',
      spark: 'M2,22 L14,20 L26,18 L38,20 L50,16 L62,14 L74,16 L86,12 L98,14 L108,10',
      sparkStroke: 'rgba(16,185,129,0.95)',
    },
    {
      title: 'Active Monitors',
      value: '98',
      delta: 'Total monitors running',
      deltaClass: 'text-secondary',
      icon: <Gauge className="size-5 text-purple-300" aria-hidden />,
      iconBg: 'bg-purple-400/10',
      spark: 'M2,24 L14,26 L26,18 L38,20 L50,14 L62,18 L74,12 L86,16 L98,10 L108,12',
      sparkStroke: 'rgba(168,85,247,0.9)',
    },
  ] as const

  const donutSegments: DonutSegment[] = [
    { name: 'Online', count: 79, color: '#10b981' },
    { name: 'Warning', count: 12, color: '#f59e0b' },
    { name: 'Critical', count: 6, color: '#ef4444' },
    { name: 'Offline', count: 2, color: 'rgba(255,255,255,0.35)' },
  ]
  const donutTotal = 98

  const devices = [
    {
      device: 'Router-01',
      address: '192.168.1.1',
      type: 'Router',
      status: 'Online' as DeviceStatus,
      latency: '5.2 ms',
      loss: '0%',
      uptime: '100%',
      rt: '5.2 ms',
      last: '10s ago',
    },
    {
      device: 'Switch-01',
      address: '192.168.1.2',
      type: 'Switch',
      status: 'Online' as DeviceStatus,
      latency: '2.8 ms',
      loss: '0%',
      uptime: '100%',
      rt: '2.8 ms',
      last: '8s ago',
    },
    {
      device: 'Firewall-01',
      address: '192.168.1.3',
      type: 'Firewall',
      status: 'Warning' as DeviceStatus,
      latency: '28.7 ms',
      loss: '1.2%',
      uptime: '99.8%',
      rt: '28.7 ms',
      last: '12s ago',
    },
    {
      device: 'Server-01',
      address: '192.168.1.10',
      type: 'Server',
      status: 'Online' as DeviceStatus,
      latency: '6.1 ms',
      loss: '0%',
      uptime: '100%',
      rt: '6.1 ms',
      last: '7s ago',
    },
    {
      device: 'AP-01',
      address: '192.168.1.20',
      type: 'Access Point',
      status: 'Critical' as DeviceStatus,
      latency: '—',
      loss: '100%',
      uptime: '0%',
      rt: '—',
      last: '1m ago',
    },
    {
      device: 'Internet (8.8.8.8)',
      address: '8.8.8.8',
      type: 'External',
      status: 'Online' as DeviceStatus,
      latency: '12.4 ms',
      loss: '0%',
      uptime: '100%',
      rt: '12.4 ms',
      last: '9s ago',
    },
  ] as const

  const topIfaces = [
    { name: 'ether1 (Router-01)', inOut: '45.5 Mbps', out: '32.1 Mbps', util: 78 },
    { name: 'ether2 (Router-01)', inOut: '32.4 Mbps', out: '18.7 Mbps', util: 56 },
    { name: 'G0/1 (Switch-01)', inOut: '28.3 Mbps', out: '15.2 Mbps', util: 49 },
    { name: 'wlan0 (AP-01)', inOut: '12.8 Mbps', out: '8.9 Mbps', util: 32 },
    { name: 'eth0 (Server-01)', inOut: '9.8 Mbps', out: '6.1 Mbps', util: 21 },
  ] as const

  const showOverview = tab === 'overview'

  return (
    <DashboardLayout>
      <Helmet>
        <title>Monitoring · WAP INTELLYSYS</title>
      </Helmet>

      <div className="w-full">
        <UnderDevelopmentBanner />

        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="m-0 text-2xl font-semibold tracking-tight text-white">Monitoring</h1>
            <p className="mt-1 text-sm text-secondary">
              Real-time network monitoring and performance overview
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
            <SoftButton>
              <Calendar className="size-4 text-secondary" aria-hidden />
              May 19, 2025 - May 25, 2025
              <ChevronDown className="size-4 text-secondary" aria-hidden />
            </SoftButton>
            <SoftButton>
              <RefreshCw className="size-4 text-secondary" aria-hidden />
              Auto Refresh <span className="text-secondary">10s</span>
              <ChevronDown className="size-4 text-secondary" aria-hidden />
            </SoftButton>
            <PrimaryButton>
              <Plus className="size-4" aria-hidden />
              Add Monitor
            </PrimaryButton>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-6 border-b border-white/10">
          {tabs.map((t) => {
            const active = tab === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={[
                  'relative -mb-px px-1 py-3 text-sm font-semibold transition-colors',
                  active ? 'text-white' : 'text-secondary hover:text-white',
                ].join(' ')}
              >
                {t.label}
                {active ? (
                  <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-primary" aria-hidden />
                ) : null}
              </button>
            )
          })}
        </div>

        {showOverview ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {kpis.map((k) => (
                <KpiCard key={k.title} {...k} />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.25fr_1.25fr_0.9fr]">
              <Panel
                title="Network Availability"
                right={
                  <div className="flex items-center gap-3 text-xs font-semibold text-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-success" aria-hidden />
                      Online
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-white/35" aria-hidden />
                      Offline
                    </span>
                  </div>
                }
              >
                <AvailabilityChart />
                <div className="mt-2 flex items-center justify-between text-[11px] text-secondary">
                  <span>00:00</span>
                  <span>04:00</span>
                  <span>08:00</span>
                  <span>12:00</span>
                  <span>16:00</span>
                  <span>20:00</span>
                  <span>24:00</span>
                </div>
              </Panel>

              <Panel title="Response Time (ms)" right={<GhostSelect value="Last 24 Hours" />}>
                <ResponseTimeChart />
                <div className="mt-2 flex items-center justify-between text-[11px] text-secondary">
                  <span>00:00</span>
                  <span>04:00</span>
                  <span>08:00</span>
                  <span>12:00</span>
                  <span>16:00</span>
                  <span>20:00</span>
                  <span>24:00</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] font-semibold text-secondary">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-primary" aria-hidden />
                    Router-01
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-purple-400" aria-hidden />
                    Switch-01
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-warning" aria-hidden />
                    Server-01
                  </span>
                </div>
              </Panel>

              <Panel title="Monitors Status">
                <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  <DonutChart segments={donutSegments} total={donutTotal} />
                  <div className="space-y-2">
                    {[
                      { name: 'Online', n: 79, color: '#10b981' },
                      { name: 'Warning', n: 12, color: '#f59e0b' },
                      { name: 'Critical', n: 6, color: '#ef4444' },
                      { name: 'Offline', n: 2, color: 'rgba(255,255,255,0.35)' },
                    ].map((s) => (
                      <div key={s.name} className="flex items-center justify-between gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="size-2.5 rounded-full" style={{ background: s.color }} aria-hidden />
                          <span className="font-semibold text-white/90">{s.name}</span>
                        </div>
                        <div className="text-xs text-secondary">
                          {s.n} ({Math.round((s.n / donutTotal) * 1000) / 10}%)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
              <section className="rounded-xl border border-white/15 bg-white/5 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
                <div className="flex flex-col gap-3 border-b border-white/10 p-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="text-sm font-semibold text-white">Monitored Devices</div>
                  <div className="relative w-full lg:max-w-[280px]">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-secondary" aria-hidden />
                    <input
                      placeholder="Search devices..."
                      className="h-9 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white/90 outline-none placeholder:text-secondary/70 focus:border-white/20"
                    />
                  </div>
                </div>

                <div className="overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead className="bg-white/2">
                      <tr className="border-b border-white/10 text-left text-[11px] font-semibold uppercase tracking-wide text-secondary">
                        <th className="px-4 py-3">Device</th>
                        <th className="px-4 py-3">IP Address</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Latency</th>
                        <th className="px-4 py-3">Packet Loss</th>
                        <th className="px-4 py-3">Uptime</th>
                        <th className="px-4 py-3">Response Time</th>
                        <th className="px-4 py-3">Last Check</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {devices.map((d) => (
                        <tr key={d.device} className="border-b border-white/10 hover:bg-white/3">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="grid size-8 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                                <span className="size-3 rounded bg-primary/40" aria-hidden />
                              </div>
                              <div className="min-w-0">
                                <div className="truncate text-sm font-semibold text-white/90">{d.device}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-secondary">{d.address}</td>
                          <td className="px-4 py-3 text-sm text-secondary">{d.type}</td>
                          <td className="px-4 py-3">
                            <span
                              className={[
                                'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
                                statusPill(d.status),
                              ].join(' ')}
                            >
                              {d.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-white/80">{d.latency}</td>
                          <td className="px-4 py-3 text-sm text-white/80">{d.loss}</td>
                          <td className="px-4 py-3 text-sm text-white/80">{d.uptime}</td>
                          <td className="px-4 py-3 text-sm text-white/80">{d.rt}</td>
                          <td className="px-4 py-3 text-sm text-secondary">{d.last}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-2 text-secondary">
                              <button
                                type="button"
                                className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/7 hover:text-white"
                                aria-label="Performance"
                              >
                                <Activity className="size-4" aria-hidden />
                              </button>
                              <button
                                type="button"
                                className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/7 hover:text-white"
                                aria-label="System"
                              >
                                <Cpu className="size-4" aria-hidden />
                              </button>
                              <button
                                type="button"
                                className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/7 hover:text-white"
                                aria-label="Storage"
                              >
                                <HardDrive className="size-4" aria-hidden />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-secondary">Showing 1 to 6 of 98 devices</div>
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
                        17
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

              <div className="space-y-4">
                <Panel title="Alert Summary" right={<a className="text-xs font-semibold text-primary hover:text-primary/80">View All Alerts →</a>}>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-secondary">
                        <ShieldAlert className="size-4 text-danger" aria-hidden />
                        Critical
                      </div>
                      <div className="text-xs font-semibold text-secondary">6</div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-secondary">
                        <ShieldAlert className="size-4 text-warning" aria-hidden />
                        Warning
                      </div>
                      <div className="text-xs font-semibold text-secondary">12</div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-secondary">
                        <ShieldAlert className="size-4 text-primary" aria-hidden />
                        Info
                      </div>
                      <div className="text-xs font-semibold text-secondary">24</div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-secondary">
                        <ShieldAlert className="size-4 text-success" aria-hidden />
                        Resolved Today
                      </div>
                      <div className="text-xs font-semibold text-secondary">18</div>
                    </div>
                  </div>
                </Panel>

                <Panel title="Monitoring Summary" right={<a className="text-xs font-semibold text-primary hover:text-primary/80">View All Monitors →</a>}>
                  <div className="space-y-2 text-sm text-secondary">
                    <div className="flex items-center justify-between gap-3">
                      <span>Total Monitors</span>
                      <span className="text-xs font-semibold text-white/80">98</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Active Monitors</span>
                      <span className="text-xs font-semibold text-white/80">96</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Paused Monitors</span>
                      <span className="text-xs font-semibold text-white/80">2</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Maintenance</span>
                      <span className="text-xs font-semibold text-white/80">0</span>
                    </div>
                  </div>
                </Panel>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.35fr_1fr]">
              <Panel
                title="Bandwidth Usage"
                right={
                  <div className="flex items-center gap-3 text-xs font-semibold text-secondary">
                    <GhostSelect value="All Interfaces" />
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-primary" aria-hidden />
                      Download
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-success" aria-hidden />
                      Upload
                    </span>
                  </div>
                }
              >
                <BandwidthChart />
                <div className="mt-2 flex items-center justify-between text-[11px] text-secondary">
                  <span>00:00</span>
                  <span>04:00</span>
                  <span>08:00</span>
                  <span>12:00</span>
                  <span>16:00</span>
                  <span>20:00</span>
                  <span>24:00</span>
                </div>
              </Panel>

              <Panel title="Top Interfaces by Utilization">
                <div className="grid grid-cols-[1fr_110px_1fr_64px] gap-3 text-[11px] font-semibold uppercase tracking-wide text-secondary">
                  <div>Interface</div>
                  <div>In/Out</div>
                  <div>Utilization</div>
                  <div className="text-right">%</div>
                </div>

                <div className="mt-3 space-y-3">
                  {topIfaces.map((i) => (
                    <div key={i.name} className="grid grid-cols-[1fr_110px_1fr_64px] items-center gap-3">
                      <div className="min-w-0 truncate text-xs font-semibold text-white/80">{i.name}</div>
                      <div className="text-xs font-semibold text-secondary">{i.inOut}</div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/6">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${i.util}%` }} />
                      </div>
                      <div className="text-right text-xs font-semibold text-secondary">{i.util}%</div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>
        ) : (
          <section className="rounded-xl border border-white/15 bg-white/5 p-6 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
            <div className="text-sm font-semibold text-white">{tabLabel(tab)}</div>
            <p className="mt-2 text-sm text-secondary">This tab UI is coming soon.</p>
          </section>
        )}
      </div>
    </DashboardLayout>
  )
}

