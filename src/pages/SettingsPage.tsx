import DashboardLayout from '@/components/layout/dashboard/DashboardLayout'
import {
  SettingsCard,
  SettingsSubnav,
  Toggle,
  UnderDevelopmentBanner,
  type SettingsSectionId,
} from '@/components/modules/settings'
import {
  Bell,
  Check,
  ChevronRight,
  Cog,
  Globe,
  HardDrive,
  Plug,
  Search,
  Shield,
  Wrench,
} from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import type { ReactNode } from 'react'
import { useState } from 'react'

function FieldLabel({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="min-w-0">
      <div className="text-xs font-semibold text-white">{label}</div>
      {hint ? <div className="mt-0.5 text-[11px] text-secondary">{hint}</div> : null}
    </div>
  )
}

function Input({
  value,
  placeholder,
  disabled,
}: {
  value?: string
  placeholder?: string
  disabled?: boolean
}) {
  return (
    <input
      value={value ?? ''}
      placeholder={placeholder}
      disabled={disabled}
      readOnly
      className="h-9 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white/90 outline-none placeholder:text-secondary/70 focus:border-white/20"
    />
  )
}

function Select({
  value,
  disabled,
}: {
  value: string
  disabled?: boolean
}) {
  return (
    <select
      value={value}
      disabled={disabled}
      className="h-9 w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-3 pr-9 text-sm text-white/90 outline-none focus:border-white/20"
      onChange={() => {}}
    >
      <option>{value}</option>
    </select>
  )
}

function Row({
  label,
  hint,
  right,
}: {
  label: string
  hint?: string
  right: ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <FieldLabel label={label} hint={hint} />
      <div className="w-[52%] min-w-[180px]">{right}</div>
    </div>
  )
}

function Divider() {
  return <div className="my-2 border-t border-white/10" aria-hidden />
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-success/25 bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
      {text}
    </span>
  )
}

export default function SettingsPage() {
  const [active, setActive] = useState<SettingsSectionId>('general')
  const [q, setQ] = useState('')

  const [twoFa, setTwoFa] = useState(true)
  const [autoDiscovery, setAutoDiscovery] = useState(true)
  const [emailNotif, setEmailNotif] = useState(true)
  const [smsNotif, setSmsNotif] = useState(false)
  const [autoUpdates, setAutoUpdates] = useState(true)
  const [autoBackup, setAutoBackup] = useState(true)

  const handleSectionChange = (id: SettingsSectionId) => {
    setActive(id)
    const el = document.getElementById('settings-cards-top')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title>Settings · WAP INTELLYSYS</title>
      </Helmet>

      <div className="w-full">
        <UnderDevelopmentBanner />

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="m-0 text-2xl font-semibold tracking-tight text-white">Settings</h1>
            <p className="mt-1 text-sm text-secondary">
              Configure system preferences, security, and integrations
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
            <div className="relative w-full sm:w-[260px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-secondary" aria-hidden />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search settings..."
                className="h-10 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white/90 outline-none placeholder:text-secondary/70 focus:border-white/20"
              />
            </div>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(37,99,235,0.28)] transition-colors hover:bg-primary/90"
            >
              <Check className="size-4" aria-hidden />
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[240px_1fr]">
          <SettingsSubnav
            active={active}
            onChange={handleSectionChange}
          />

          <div id="settings-cards-top" className="space-y-4">
            <div
              className={[
                'grid grid-cols-1 gap-4',
                active === 'general' ? 'xl:grid-cols-3' : 'xl:grid-cols-1',
                active === 'general' || active === 'network' || active === 'security' ? '' : 'hidden',
              ].join(' ')}
            >
              <div
                id="settings-section-general"
                className={['scroll-mt-5', active === 'general' ? '' : 'hidden'].join(' ')}
              >
                <SettingsCard
                  title="General Settings"
                  subtitle="Configure basic system preferences"
                  icon={<Cog className="size-5 text-white/90" aria-hidden />}
                >
                  <Row label="System Name" hint="" right={<Input value="WAP INTELLYSIS" />} />
                  <Divider />
                  <Row label="Time Zone" right={<Select value="(UTC+08:00) Asia/Manila" />} />
                  <Divider />
                  <Row label="Date Format" right={<Input value="May 25, 2025 (MMM DD, YYYY)" />} />
                  <Divider />
                  <div className="py-2.5">
                    <div className="text-xs font-semibold text-white">Time Format</div>
                    <div className="mt-2 flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm text-secondary">
                        <input type="radio" checked readOnly />
                        12 Hour (01:30 PM)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-secondary">
                        <input type="radio" checked={false} readOnly />
                        24 Hour (13:30)
                      </label>
                    </div>
                  </div>
                  <Divider />
                  <Row label="Language" right={<Select value="English (US)" />} />
                </SettingsCard>
              </div>

              <div
                id="settings-section-network"
                className={[
                  'scroll-mt-5',
                  active === 'general' || active === 'network' ? '' : 'hidden',
                ].join(' ')}
              >
                <SettingsCard
                  title="Network Settings"
                  subtitle="Configure network and connectivity"
                  icon={<Globe className="size-5 text-white/90" aria-hidden />}
                >
                  <Row label="Default Interface" right={<Select value="Intel(R) Ethernet Connection (7) I219-V" />} />
                  <Divider />
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <FieldLabel label="SNMP Community" />
                    <div className="relative w-[52%] min-w-[180px]">
                      <input
                        value="••••••••"
                        readOnly
                        className="h-9 w-full rounded-lg border border-white/10 bg-white/5 px-3 pr-10 text-sm text-white/90 outline-none focus:border-white/20"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-semibold text-secondary hover:bg-white/8"
                      >
                        View
                      </button>
                    </div>
                  </div>
                  <Divider />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <div className="text-xs font-semibold text-white">Syslog Server</div>
                      <div className="mt-2">
                        <Input value="192.168.1.50" />
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Port</div>
                      <div className="mt-2">
                        <Input value="514" />
                      </div>
                    </div>
                  </div>
                  <Divider />
                  <Row label="Network Scan Range" right={<Input value="192.168.1.1 - 192.168.1.254" />} />
                  <Divider />
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <FieldLabel label="Enable Auto Discovery" />
                    <Toggle checked={autoDiscovery} onChange={setAutoDiscovery} label="Enable Auto Discovery" />
                  </div>
                </SettingsCard>
              </div>

              <div
                id="settings-section-security"
                className={[
                  'scroll-mt-5',
                  active === 'general' || active === 'security' ? '' : 'hidden',
                ].join(' ')}
              >
                <SettingsCard
                  title="Security Settings"
                  subtitle="Manage security and access policies"
                  icon={<Shield className="size-5 text-white/90" aria-hidden />}
                >
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <FieldLabel
                      label="Two-Factor Authentication"
                      hint="Require 2FA for all users"
                    />
                    <Toggle checked={twoFa} onChange={setTwoFa} label="Two-Factor Authentication" />
                  </div>
                  <Divider />
                  <Row
                    label="Session Timeout"
                    hint="Automatically logout inactive users"
                    right={<Select value="30 minutes" />}
                  />
                  <Divider />
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <FieldLabel label="Password Policy" hint="Strong password policy enforced" />
                    <button
                      type="button"
                      className="inline-flex h-9 items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-semibold text-white/90 hover:bg-white/8"
                    >
                      Manage
                      <ChevronRight className="size-4 text-secondary" aria-hidden />
                    </button>
                  </div>
                  <Divider />
                  <Row label="Failed Login Attempts" hint="Lock account after" right={<Select value="5 attempts" />} />
                  <Divider />
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <FieldLabel label="IP Whitelist" hint="Restrict access to trusted IPs" />
                    <Toggle checked={false} onChange={() => {}} label="IP Whitelist" disabled />
                  </div>
                </SettingsCard>
              </div>
            </div>

            <div
              className={[
                'grid grid-cols-1 gap-4',
                active === 'general' ? 'xl:grid-cols-3' : 'xl:grid-cols-1',
                active === 'general' ||
                active === 'notifications' ||
                active === 'integrations' ||
                active === 'maintenance'
                  ? ''
                  : 'hidden',
              ].join(' ')}
            >
              <div
                id="settings-section-notifications"
                className={[
                  'scroll-mt-5',
                  active === 'general' || active === 'notifications' ? '' : 'hidden',
                ].join(' ')}
              >
                <SettingsCard
                  title="Notification Settings"
                  subtitle="Configure alert and notification preferences"
                  icon={<Bell className="size-5 text-white/90" aria-hidden />}
                >
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <FieldLabel label="Email Notifications" hint="Send alerts via email" />
                    <Toggle checked={emailNotif} onChange={setEmailNotif} label="Email Notifications" />
                  </div>
                  <Divider />
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <FieldLabel label="SMS Notifications" hint="Send critical alerts via SMS" />
                    <Toggle checked={smsNotif} onChange={setSmsNotif} label="SMS Notifications" />
                  </div>
                  <Divider />
                  <Row label="Alert Digest" hint="Send summary every" right={<Select value="1 hour" />} />
                  <Divider />
                  <div className="grid grid-cols-2 gap-3 py-2.5">
                    <div>
                      <div className="text-xs font-semibold text-white">Quiet Hours</div>
                      <div className="mt-2">
                        <Input value="10:00 PM" />
                      </div>
                    </div>
                    <div className="pt-[18px]">
                      <Input value="06:00 AM" />
                    </div>
                  </div>
                  <Divider />
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <FieldLabel label="Test Notification" hint="Send a test alert to verify settings" />
                    <button
                      type="button"
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-primary/35 bg-primary/10 px-3 text-sm font-semibold text-primary hover:bg-primary/15"
                    >
                      <span aria-hidden className="inline-block size-4 rounded bg-primary/15" />
                      Send Test
                    </button>
                  </div>
                </SettingsCard>
              </div>

              <div
                id="settings-section-integrations"
                className={[
                  'scroll-mt-5',
                  active === 'general' || active === 'integrations' ? '' : 'hidden',
                ].join(' ')}
              >
                <SettingsCard
                  title="Integrations"
                  subtitle="Manage third-party integrations"
                  icon={<Plug className="size-5 text-white/90" aria-hidden />}
                >
                  <div className="space-y-2">
                    {[
                      { name: 'Slack', detail: 'Send alerts to Slack channels', status: 'Connected' },
                      { name: 'Microsoft Teams', detail: 'Send alerts to Teams channels', status: 'Connected' },
                      { name: 'Webhook', detail: 'Send alerts to external webhook', status: 'Connected' },
                      { name: 'Syslog', detail: 'Forward logs to external syslog', status: 'Enabled' },
                    ].map((it) => (
                      <div
                        key={it.name}
                        className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/4 px-3 py-2.5"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="grid size-9 place-items-center rounded-lg bg-white/5 text-white ring-1 ring-white/10">
                            <span className="text-xs font-semibold">{it.name.slice(0, 2).toUpperCase()}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-white">{it.name}</div>
                            <div className="truncate text-xs text-secondary">{it.detail}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge text={it.status} />
                          <ChevronRight className="size-4 text-secondary" aria-hidden />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 border-t border-white/10 pt-3">
                    <button
                      type="button"
                      className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-semibold text-white/90 hover:bg-white/8"
                    >
                      <span className="text-primary">＋</span>
                      Add Integration
                    </button>
                  </div>
                </SettingsCard>
              </div>

              <div
                id="settings-section-maintenance"
                className={[
                  'scroll-mt-5',
                  active === 'general' || active === 'maintenance' ? '' : 'hidden',
                ].join(' ')}
              >
                <SettingsCard
                  title="System Maintenance"
                  subtitle="System updates and maintenance"
                  icon={<Wrench className="size-5 text-white/90" aria-hidden />}
                >
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <FieldLabel label="Auto Updates" hint="Automatically install system updates" />
                    <Toggle checked={autoUpdates} onChange={setAutoUpdates} label="Auto Updates" />
                  </div>
                  <Divider />
                  <Row label="Update Channel" right={<Select value="Stable (Recommended)" />} />
                  <Divider />
                  <Row label="Maintenance Window" hint="Schedule maintenance during this time" right={<Select value="Sunday 02:00 - 04:00" />} />
                  <Divider />
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <div>
                      <div className="text-xs font-semibold text-white">System Reboot</div>
                      <div className="mt-0.5 text-[11px] text-secondary">
                        Last reboot: May 20, 2025 02:15 AM
                      </div>
                    </div>
                    <button
                      type="button"
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-semibold text-white/90 hover:bg-white/8"
                    >
                      Reboot Now
                    </button>
                  </div>
                </SettingsCard>
              </div>
            </div>

            <div
              id="settings-section-backup"
              className={[
                'scroll-mt-5',
                active === 'general' || active === 'backup' ? '' : 'hidden',
              ].join(' ')}
            >
              <SettingsCard
                title="Backup & Restore"
                subtitle="Manage system backups and restore points"
                icon={<HardDrive className="size-5 text-white/90" aria-hidden />}
              >
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div className="rounded-lg border border-white/10 bg-white/4 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white">Automatic Backup</div>
                        <div className="mt-0.5 text-xs text-secondary">Daily automatic system backups</div>
                      </div>
                      <Toggle checked={autoBackup} onChange={setAutoBackup} label="Automatic Backup" />
                    </div>
                    <div className="mt-3">
                      <Row label="Backup Retention" hint="Keep backups for" right={<Select value="30 days" />} />
                    </div>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/4 p-4">
                    <div className="text-sm font-semibold text-white">Manual Backup</div>
                    <div className="mt-0.5 text-xs text-secondary">Create a backup now</div>
                    <button
                      type="button"
                      className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-lg border border-primary/35 bg-primary/10 px-3 text-sm font-semibold text-primary hover:bg-primary/15"
                    >
                      Create Backup
                    </button>
                  </div>

                  <div className="rounded-lg border border-white/10 bg-white/4 p-4">
                    <div className="text-sm font-semibold text-white">Restore System</div>
                    <div className="mt-0.5 text-xs text-secondary">Restore from a previous backup</div>
                    <button
                      type="button"
                      className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 text-sm font-semibold text-white/90 hover:bg-white/8"
                    >
                      Restore
                    </button>
                  </div>
                </div>

                <div className="mt-4 rounded-lg border border-white/10 bg-white/4 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-white">Last Backup</div>
                      <div className="mt-1 text-xs text-secondary">
                        May 25, 2025 02:00 AM
                        <span className="mx-2 text-white/10" aria-hidden>
                          •
                        </span>
                        Size: 1.24 GB
                        <span className="mx-2 text-white/10" aria-hidden>
                          •
                        </span>
                        Type: Full Backup
                      </div>
                    </div>
                    <span className="rounded-full border border-success/25 bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
                      Successful
                    </span>
                  </div>
                </div>
              </SettingsCard>
            </div>

            {active === 'audit' ? (
              <SettingsCard
                title="Audit Logs"
                subtitle="This section is coming soon"
                icon={<Shield className="size-5 text-white/90" aria-hidden />}
              >
                <div className="text-sm text-secondary">No settings available yet.</div>
              </SettingsCard>
            ) : null}

            {active === 'advanced' ? (
              <SettingsCard
                title="Advanced"
                subtitle="This section is coming soon"
                icon={<Cog className="size-5 text-white/90" aria-hidden />}
              >
                <div className="text-sm text-secondary">No settings available yet.</div>
              </SettingsCard>
            ) : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

