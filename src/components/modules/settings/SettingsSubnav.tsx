import {
  Cog,
  Globe,
  Shield,
  Bell,
  Plug,
  Wrench,
  HardDrive,
  FileText,
  SlidersHorizontal,
} from 'lucide-react'

export type SettingsSectionId =
  | 'general'
  | 'network'
  | 'security'
  | 'notifications'
  | 'integrations'
  | 'maintenance'
  | 'backup'
  | 'audit'
  | 'advanced'

const ITEMS: Array<{
  id: SettingsSectionId
  label: string
  icon: typeof Cog
}> = [
  { id: 'general', label: 'General', icon: Cog },
  { id: 'network', label: 'Network', icon: Globe },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'maintenance', label: 'System Maintenance', icon: Wrench },
  { id: 'backup', label: 'Backup & Restore', icon: HardDrive },
  { id: 'audit', label: 'Audit Logs', icon: FileText },
  { id: 'advanced', label: 'Advanced', icon: SlidersHorizontal },
]

type SettingsSubnavProps = {
  active: SettingsSectionId
  onChange: (id: SettingsSectionId) => void
}

export default function SettingsSubnav({ active, onChange }: SettingsSubnavProps) {
  return (
    <aside className="self-start rounded-xl border border-white/15 bg-white/5 p-2 shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
      <nav aria-label="Settings sections">
        <ul className="space-y-1">
          {ITEMS.map((item) => {
            const isActive = item.id === active
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onChange(item.id)}
                  className={[
                    'group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/20 text-white shadow-[0_0_0_1px_rgba(37,99,235,0.35)]'
                      : 'text-secondary hover:bg-white/6 hover:text-white',
                  ].join(' ')}
                >
                  <item.icon
                    className={[
                      'size-4 shrink-0',
                      isActive ? 'text-white' : 'text-secondary group-hover:text-white',
                    ].join(' ')}
                    aria-hidden
                  />
                  <span className="min-w-0 truncate">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

