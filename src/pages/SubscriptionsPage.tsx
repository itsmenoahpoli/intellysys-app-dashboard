import UnderDevelopmentBanner from '@/components/common/UnderDevelopmentBanner'
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout'
import DonutChart, { type DonutSegment } from '@/components/modules/users-management/DonutChart'
import {
  BadgeCheck,
  Calendar,
  ChevronDown,
  CreditCard,
  Crown,
  Download,
  FileText,
  History,
  Receipt,
  Search,
  Server,
  Settings2,
  Trash2,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'

function Panel({
  title,
  right,
  children,
}: {
  title: string
  right?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-white/15 bg-white/5 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="text-sm font-semibold text-white">{title}</div>
        {right ? <div className="text-xs font-semibold text-secondary">{right}</div> : null}
      </div>
      <div className="px-4 py-4">{children}</div>
    </section>
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

function KpiCard({
  label,
  value,
  sub,
  badge,
  badgeClass,
  icon,
  iconBg,
}: {
  label: string
  value: string
  sub: string
  badge?: string
  badgeClass?: string
  icon: React.ReactNode
  iconBg: string
}) {
  return (
    <section className="rounded-xl border border-white/15 bg-white/5 p-4 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="text-xs font-semibold text-secondary">{label}</div>
            {badge ? (
              <span
                className={[
                  'rounded-full border px-2 py-0.5 text-[11px] font-semibold',
                  badgeClass ?? 'border-success/25 bg-success/10 text-success',
                ].join(' ')}
              >
                {badge}
              </span>
            ) : null}
          </div>
          <div className="mt-2 text-xl font-semibold tracking-tight text-white">{value}</div>
          <div className="mt-1 text-xs text-secondary">{sub}</div>
        </div>
        <div className={['grid size-10 place-items-center rounded-lg ring-1 ring-white/10', iconBg].join(' ')}>
          {icon}
        </div>
      </div>
    </section>
  )
}

function Progress({
  value,
  color,
}: {
  value: number
  color: string
}) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/6">
      <div className={['h-full rounded-full', color].join(' ')} style={{ width: `${value}%` }} />
    </div>
  )
}

function StatusPill({ text }: { text: string }) {
  const cls =
    text === 'Active'
      ? 'border-success/25 bg-success/10 text-success'
      : 'border-primary/25 bg-primary/10 text-primary'
  return (
    <span className={['inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold', cls].join(' ')}>
      {text}
    </span>
  )
}

export default function SubscriptionsPage() {
  const licensed = 1000
  const used = 542
  const usedPct = Math.round((used / licensed) * 1000) / 10

  const donutSegments: DonutSegment[] = [
    { name: 'Monitoring', count: 198, color: '#10b981' },
    { name: 'Packet Analyzer', count: 132, color: '#2563eb' },
    { name: 'Remote Access (SSH)', count: 98, color: '#7c3aed' },
    { name: 'Network Devices', count: 78, color: '#f59e0b' },
    { name: 'Others', count: 36, color: 'rgba(255,255,255,0.35)' },
  ]

  const deviceGroups = [
    { group: 'Network Infrastructure', licensed: 400, used: 218, status: 'Active' },
    { group: 'Servers & Data Center', licensed: 250, used: 156, status: 'Active' },
    { group: 'Remote Offices', licensed: 200, used: 112, status: 'Active' },
    { group: 'Security Devices', licensed: 100, used: 56, status: 'Active' },
    { group: 'Others', licensed: 50, used: 0, status: 'Available' },
  ] as const

  return (
    <DashboardLayout>
      <Helmet>
        <title>Subscriptions · WAP INTELLYSYS</title>
      </Helmet>

      <div className="w-full">
        <UnderDevelopmentBanner />

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="m-0 text-2xl font-semibold tracking-tight text-white">Subscriptions</h1>
            <p className="mt-1 text-sm text-secondary">
              Manage your licenses, plans, usage, and billing.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
            <SoftButton>
              <History className="size-4 text-secondary" aria-hidden />
              Billing History
            </SoftButton>
            <PrimaryButton>
              <Settings2 className="size-4" aria-hidden />
              Upgrade Plan
            </PrimaryButton>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <KpiCard
            label="Current Plan"
            value="Enterprise"
            sub="Annual Plan"
            badge="Active"
            icon={<Crown className="size-5 text-purple-300" aria-hidden />}
            iconBg="bg-purple-400/10"
          />
          <KpiCard
            label="License Status"
            value="Active"
            sub="Valid until Dec 31, 2025"
            icon={<BadgeCheck className="size-5 text-success" aria-hidden />}
            iconBg="bg-success/10"
          />
          <KpiCard
            label="Total Licensed Devices"
            value="1,000"
            sub="Includes all modules"
            icon={<Server className="size-5 text-primary" aria-hidden />}
            iconBg="bg-primary/10"
          />
          <KpiCard
            label="Used Devices"
            value="542"
            sub={`${usedPct}% of total`}
            icon={<FileText className="size-5 text-warning" aria-hidden />}
            iconBg="bg-warning/10"
          />
          <KpiCard
            label="Next Billing Date"
            value="Dec 31, 2025"
            sub="565 days remaining"
            icon={<Calendar className="size-5 text-cyan-300" aria-hidden />}
            iconBg="bg-cyan-400/10"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1.35fr]">
          <Panel title="Current Plan Details">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
              <div>
                <div className="flex items-start gap-3">
                  <div className="grid size-10 place-items-center rounded-lg bg-purple-400/10 ring-1 ring-white/10">
                    <Crown className="size-5 text-purple-300" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white">Enterprise Plan</div>
                    <div className="mt-0.5 text-xs text-secondary">
                      The complete solution for advanced network management.
                    </div>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-secondary">
                  {[
                    'All modules included',
                    'Up to 1,000 devices',
                    'Unlimited users',
                    'Advanced monitoring & analytics',
                    'Priority support',
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-success" aria-hidden />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/4 p-4 text-sm">
                <div className="space-y-2 text-secondary">
                  <div className="flex items-center justify-between gap-3">
                    <span>Plan Type</span>
                    <span className="text-xs font-semibold text-white/90">Annual</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Billing Cycle</span>
                    <span className="text-xs font-semibold text-white/90">Yearly</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Start Date</span>
                    <span className="text-xs font-semibold text-white/90">Jan 1, 2025</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>End Date</span>
                    <span className="text-xs font-semibold text-white/90">Dec 31, 2025</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Auto-Renewal</span>
                    <span className="rounded-full border border-success/25 bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
                      Enabled
                    </span>
                  </div>
                  <div className="pt-2 text-[11px] text-secondary/80">
                    Last Updated &nbsp; May 19, 2025 10:30 AM
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-semibold text-secondary hover:bg-white/7 hover:text-white"
            >
              <Settings2 className="size-4" aria-hidden />
              Change Plan
            </button>
          </Panel>

          <Panel title="Usage Overview" right={<span className="inline-flex items-center gap-2">This Month <ChevronDown className="size-4" aria-hidden /></span>}>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_1fr]">
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold text-secondary">Device Usage</div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <div className="text-xl font-semibold text-white">{used}</div>
                    <div className="text-sm font-semibold text-secondary">/ {licensed}</div>
                    <div className="ml-2 text-xs font-semibold text-secondary">{usedPct}% used</div>
                  </div>
                  <div className="mt-3">
                    <Progress value={usedPct} color="bg-primary" />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-secondary">
                    <span>{used}</span>
                    <span>{licensed}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-secondary">User Seats</div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <div className="text-xl font-semibold text-white">18</div>
                    <div className="text-sm font-semibold text-secondary">/ Unlimited</div>
                    <div className="ml-auto text-xs font-semibold text-secondary">&amp; Active users</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-secondary">Storage Used</div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <div className="text-xl font-semibold text-white">126.5</div>
                    <div className="text-sm font-semibold text-secondary">GB / 500 GB</div>
                  </div>
                  <div className="mt-3">
                    <Progress value={25.2} color="bg-success" />
                  </div>
                  <div className="mt-1 text-right text-[11px] text-secondary">25.2% used</div>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-secondary">Usage by Module</div>
                <div className="mt-3 grid grid-cols-1 items-center gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <DonutChart segments={donutSegments} total={used} />
                  <div className="space-y-2">
                    {donutSegments.map((s) => {
                      const pct = used ? Math.round((s.count / used) * 1000) / 10 : 0
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

                <button type="button" className="mt-3 text-sm font-semibold text-primary hover:text-primary/80">
                  View Detailed Usage Report →
                </button>
              </div>
            </div>
          </Panel>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_360px]">
          <section className="rounded-xl border border-white/15 bg-white/5 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
            <div className="flex flex-col gap-3 border-b border-white/10 p-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="text-sm font-semibold text-white">Licensed Devices</div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative w-full sm:w-[240px]">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-secondary" aria-hidden />
                  <input
                    placeholder="Search devices..."
                    className="h-9 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white/90 outline-none placeholder:text-secondary/70 focus:border-white/20"
                  />
                </div>
                <SoftButton>
                  All Status <ChevronDown className="size-4 text-secondary" aria-hidden />
                </SoftButton>
                <SoftButton>
                  All Locations <ChevronDown className="size-4 text-secondary" aria-hidden />
                </SoftButton>
                <SoftButton>
                  <Download className="size-4 text-secondary" aria-hidden />
                  Export
                </SoftButton>
              </div>
            </div>

            <div className="overflow-hidden">
              <table className="w-full border-collapse">
                <thead className="bg-white/2">
                  <tr className="border-b border-white/10 text-left text-[11px] font-semibold uppercase tracking-wide text-secondary">
                    <th className="px-4 py-3">Device Group</th>
                    <th className="px-4 py-3">Licensed</th>
                    <th className="px-4 py-3">Used</th>
                    <th className="px-4 py-3">Available</th>
                    <th className="px-4 py-3">Usage (%)</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deviceGroups.map((g) => {
                    const avail = g.licensed - g.used
                    const pct = g.licensed ? Math.round((g.used / g.licensed) * 1000) / 10 : 0
                    const barColor = pct >= 80 ? 'bg-danger' : pct >= 60 ? 'bg-warning' : 'bg-success'
                    return (
                      <tr key={g.group} className="border-b border-white/10 hover:bg-white/3">
                        <td className="px-4 py-3 text-sm font-semibold text-white/90">{g.group}</td>
                        <td className="px-4 py-3 text-sm text-secondary">{g.licensed}</td>
                        <td className="px-4 py-3 text-sm text-secondary">{g.used}</td>
                        <td className="px-4 py-3 text-sm text-secondary">{avail}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-[140px]">
                              <Progress value={pct} color={barColor} />
                            </div>
                            <div className="text-xs font-semibold text-secondary">{pct}%</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <StatusPill text={g.status} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2 text-secondary">
                            <button
                              type="button"
                              className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/7 hover:text-white"
                              aria-label="Usage"
                            >
                              <Receipt className="size-4" aria-hidden />
                            </button>
                            <button
                              type="button"
                              className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/7 hover:text-white"
                              aria-label="Details"
                            >
                              <FileText className="size-4" aria-hidden />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                  <tr className="border-t border-white/10 bg-white/2">
                    <td className="px-4 py-3 text-sm font-semibold text-white/90">Total</td>
                    <td className="px-4 py-3 text-sm text-secondary">{licensed.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{used.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-secondary">{(licensed - used).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-[140px]">
                          <Progress value={usedPct} color="bg-primary" />
                        </div>
                        <div className="text-xs font-semibold text-secondary">{usedPct}%</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill text="Active" />
                    </td>
                    <td className="px-4 py-3" />
                  </tr>
                </tbody>
              </table>

              <div className="flex items-center justify-between px-4 py-3">
                <div className="text-xs text-secondary">Showing 1 to 5 of 5 groups</div>
                <div className="flex items-center gap-2 text-xs text-secondary">
                  <button type="button" className="rounded-md bg-primary/20 px-2.5 py-1 font-semibold text-white">
                    1
                  </button>
                </div>
              </div>
            </div>
          </section>

          <Panel title="Payment & Renewal">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold text-secondary">Subscription Fee</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <div className="text-2xl font-semibold text-white">$9,999.00</div>
                  <div className="text-sm font-semibold text-secondary">/ year</div>
                </div>
                <div className="mt-0.5 text-xs text-secondary">Billed annually</div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/4 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-secondary">Payment Method</div>
                    <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-white/90">
                      <CreditCard className="size-4 text-primary" aria-hidden />
                      Visa •••• 4242
                    </div>
                  </div>
                  <button type="button" className="text-xs font-semibold text-primary hover:text-primary/80">
                    Manage
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-secondary">Billing Contact</div>
                    <div className="mt-2 text-sm font-semibold text-white/90">admin@wapintellysis.com</div>
                  </div>
                  <button type="button" className="text-xs font-semibold text-primary hover:text-primary/80">
                    Manage
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-primary/35 bg-primary/10 px-3 text-sm font-semibold text-primary hover:bg-primary/15"
              >
                <Receipt className="size-4" aria-hidden />
                View Invoice
              </button>

              <button
                type="button"
                className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-danger/30 bg-danger/10 px-3 text-sm font-semibold text-danger hover:bg-danger/15"
              >
                <Trash2 className="size-4" aria-hidden />
                Cancel Subscription
              </button>
            </div>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  )
}

