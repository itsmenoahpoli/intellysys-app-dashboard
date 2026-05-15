import UnderDevelopmentBanner from '@/components/common/UnderDevelopmentBanner'
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout'
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Download,
  FileText,
  Headphones,
  MessageSquare,
  PhoneCall,
  PlayCircle,
  Search,
  Ticket,
  Users,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'

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
        {right ? <div className="text-xs font-semibold text-primary">{right}</div> : null}
      </div>
      <div className="px-4 py-4">{children}</div>
    </section>
  )
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(37,99,235,0.28)] transition-colors hover:bg-primary/90"
    >
      {children}
    </button>
  )
}

function HelpCard({
  title,
  desc,
  cta,
  icon,
  iconBg,
}: {
  title: string
  desc: string
  cta: string
  icon: React.ReactNode
  iconBg: string
}) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-5 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-xs text-secondary">{desc}</div>
        </div>
        <div className={['grid size-12 place-items-center rounded-xl ring-1 ring-white/10', iconBg].join(' ')}>
          {icon}
        </div>
      </div>
      <button type="button" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
        {cta}
        <ArrowRight className="size-4" aria-hidden />
      </button>
    </div>
  )
}

function TopicRow({ title, desc }: { title: string; desc: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/4 px-3 py-3 text-left hover:bg-white/6"
    >
      <div className="min-w-0">
        <div className="text-sm font-semibold text-white/90">{title}</div>
        <div className="mt-0.5 truncate text-xs text-secondary">{desc}</div>
      </div>
      <ChevronRight className="size-4 shrink-0 text-secondary" aria-hidden />
    </button>
  )
}

function DocRow({
  title,
  desc,
}: {
  title: string
  desc: string
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/4 px-3 py-3 text-left hover:bg-white/6"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid size-9 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
          <FileText className="size-4 text-secondary" aria-hidden />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white/90">{title}</div>
          <div className="truncate text-xs text-secondary">{desc}</div>
        </div>
      </div>
      <div className="text-xs font-semibold text-secondary">PDF</div>
    </button>
  )
}

function FaqRow({
  q,
  a,
  open,
  onToggle,
}: {
  q: string
  a: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/4">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left"
      >
        <div className="text-sm font-semibold text-white/90">{q}</div>
        <ChevronDown
          className={['size-4 shrink-0 text-secondary transition-transform', open ? 'rotate-180' : ''].join(' ')}
          aria-hidden
        />
      </button>
      {open ? <div className="px-3 pb-3 text-sm text-secondary">{a}</div> : null}
    </div>
  )
}

export default function HelpSupportPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

  const faqs = [
    {
      q: 'How do I add a new device?',
      a: 'Go to Devices, click “Add Device”, then follow the setup wizard to register and monitor it.',
    },
    {
      q: 'How can I set up email alerts?',
      a: 'Open Settings → Notifications, enable Email Notifications, then configure alert digest and recipients.',
    },
    {
      q: 'How do I access a device using SSH?',
      a: 'Use the Remove Access (SSH) module to manage sessions and keys. Ensure the device is reachable and credentials are valid.',
    },
    {
      q: 'How do I export logs and reports?',
      a: 'Open Logs & Reports and use the Export button. Choose a date range and filters before exporting.',
    },
    {
      q: 'How can I reset my password?',
      a: 'Contact your administrator or use your organization’s password recovery flow (if enabled).',
    },
  ] as const

  return (
    <DashboardLayout>
      <Helmet>
        <title>Help &amp; Support · WAP INTELLYSYS</title>
      </Helmet>

      <div className="w-full">
        <UnderDevelopmentBanner />

        <div className="mb-4">
          <h1 className="m-0 text-2xl font-semibold tracking-tight text-white">Help &amp; Support</h1>
          <p className="mt-1 text-sm text-secondary">
            Find answers, get support, and manage your requests.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-secondary"
                aria-hidden
              />
              <input
                placeholder="Search for articles, guides, and more..."
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-11 text-sm text-white/90 outline-none placeholder:text-secondary/70 focus:border-white/20"
              />
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-secondary" aria-hidden>
                <Search className="size-4" />
              </div>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/5 p-4 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
              <div className="text-sm font-semibold text-white">How can we help you?</div>
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                <HelpCard
                  title="Knowledge Base"
                  desc="Browse articles and guides to find answers to common questions."
                  cta="Browse Articles"
                  icon={<BookOpen className="size-5 text-primary" aria-hidden />}
                  iconBg="bg-primary/10"
                />
                <HelpCard
                  title="Community Forums"
                  desc="Connect with other users, share insights, and get help from the community."
                  cta="Visit Forums"
                  icon={<Users className="size-5 text-success" aria-hidden />}
                  iconBg="bg-success/10"
                />
                <HelpCard
                  title="Video Tutorials"
                  desc="Watch step-by-step videos to learn and solve issues quickly."
                  cta="Watch Videos"
                  icon={<PlayCircle className="size-5 text-purple-300" aria-hidden />}
                  iconBg="bg-purple-400/10"
                />
                <HelpCard
                  title="Downloads"
                  desc="Get the latest software updates, tools, and documentation."
                  cta="Go to Downloads"
                  icon={<Download className="size-5 text-warning" aria-hidden />}
                  iconBg="bg-warning/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
              <Panel title="Popular Topics">
                <div className="space-y-2">
                  <TopicRow title="Getting Started" desc="Learn the basics and set up your environment" />
                  <TopicRow title="Device Management" desc="Add, configure, and manage your devices" />
                  <TopicRow title="Monitoring & Alerts" desc="Set up monitoring and configure alert rules" />
                  <TopicRow title="Remote Access (SSH)" desc="Connect to devices securely using SSH" />
                  <TopicRow title="Reports & Logs" desc="View, export, and analyze system logs and reports" />
                  <TopicRow title="Troubleshooting" desc="Find solutions to common issues" />
                </div>
              </Panel>

              <Panel title="Guides & Documentation" right={<button className="text-xs font-semibold text-primary hover:text-primary/80">View All</button>}>
                <div className="space-y-2">
                  <DocRow title="User Guide" desc="Complete guide to using WAP Intellysis" />
                  <DocRow title="Administrator Guide" desc="Manage users, roles, and system settings" />
                  <DocRow title="API Documentation" desc="Integrate with our API and automation tools" />
                  <DocRow title="Installation Guide" desc="Step-by-step installation instructions" />
                  <DocRow title="Release Notes" desc="See what’s new in the latest release" />
                </div>
              </Panel>
            </div>

            <Panel title="Frequently Asked Questions" right={<button className="text-xs font-semibold text-primary hover:text-primary/80">View All</button>}>
              <div className="space-y-2">
                {faqs.map((f, idx) => (
                  <FaqRow
                    key={f.q}
                    q={f.q}
                    a={f.a}
                    open={faqOpen === idx}
                    onToggle={() => setFaqOpen((prev) => (prev === idx ? null : idx))}
                  />
                ))}
              </div>
            </Panel>
          </div>

          <div className="space-y-4">
            <section className="rounded-xl border border-white/15 bg-white/5 p-4 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
              <div className="text-sm font-semibold text-white">Need immediate help?</div>
              <div className="mt-1 text-xs text-secondary">Our support team is available 24/7</div>
              <div className="mt-4">
                <PrimaryButton>
                  <Headphones className="size-4" aria-hidden />
                  Contact Support
                </PrimaryButton>
              </div>
            </section>

            <Panel title="Support Options">
              <div className="space-y-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/4 px-3 py-3 text-left hover:bg-white/6"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                      <Ticket className="size-4 text-secondary" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white/90">Create a Ticket</div>
                      <div className="truncate text-xs text-secondary">Submit a request and our team will assist you.</div>
                    </div>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-secondary" aria-hidden />
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/4 px-3 py-3 text-left hover:bg-white/6"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid size-9 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                      <MessageSquare className="size-4 text-secondary" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-white/90">Live Chat</div>
                        <span className="rounded-full border border-success/25 bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
                          Online
                        </span>
                      </div>
                      <div className="truncate text-xs text-secondary">Chat with our support team in real-time.</div>
                    </div>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-secondary" aria-hidden />
                </button>

                <div className="rounded-lg border border-white/10 bg-white/4 px-3 py-3">
                  <div className="flex items-start gap-3">
                    <div className="grid size-9 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                      <PhoneCall className="size-4 text-secondary" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white/90">Call Support</div>
                      <div className="mt-0.5 text-xs text-secondary">
                        Speak with our support team directly.
                      </div>
                      <div className="mt-2 text-sm font-semibold text-primary">+1 (800) 123-4567</div>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>

            <Panel title="System Status" right={<button className="text-xs font-semibold text-primary hover:text-primary/80">View Status Page</button>}>
              <div className="flex items-start gap-3">
                <div className="grid size-10 place-items-center rounded-lg bg-success/10 ring-1 ring-success/25">
                  <CircleCheck className="size-5 text-success" aria-hidden />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white/90">All Systems Operational</div>
                  <div className="mt-0.5 text-xs text-secondary">Everything is running smoothly.</div>
                  <div className="mt-3 text-[11px] text-secondary/80">Last updated: May 25, 2025 12:10 PM</div>
                </div>
              </div>
            </Panel>

            <Panel title="My Support Tickets" right={<button className="text-xs font-semibold text-primary hover:text-primary/80">View All</button>}>
              <div className="space-y-2">
                {[
                  {
                    id: '#TKT-2025-0525-001',
                    title: 'Unable to connect to device via SSH',
                    status: 'Open',
                    statusCls: 'border-primary/25 bg-primary/10 text-primary',
                    when: 'May 25, 2025 10:24 AM',
                  },
                  {
                    id: '#TKT-2025-0523-015',
                    title: 'Alert notifications not being received',
                    status: 'In Progress',
                    statusCls: 'border-warning/25 bg-warning/10 text-warning',
                    when: 'May 23, 2025 04:15 PM',
                  },
                  {
                    id: '#TKT-2025-0521-009',
                    title: 'Report export failing with permissions error',
                    status: 'Resolved',
                    statusCls: 'border-success/25 bg-success/10 text-success',
                    when: 'May 21, 2025 09:40 AM',
                  },
                ].map((t) => (
                  <div
                    key={t.id}
                    className="rounded-lg border border-white/10 bg-white/4 px-3 py-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-secondary">{t.id}</div>
                        <div className="mt-1 truncate text-sm font-semibold text-white/90">{t.title}</div>
                      </div>
                      <span className={['shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold', t.statusCls].join(' ')}>
                        {t.status}
                      </span>
                    </div>
                    <div className="mt-2 text-right text-[11px] text-secondary/80">{t.when}</div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-primary/35 bg-primary/10 px-3 text-sm font-semibold text-primary hover:bg-primary/15"
              >
                <Ticket className="size-4" aria-hidden />
                Create New Ticket
              </button>
            </Panel>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

