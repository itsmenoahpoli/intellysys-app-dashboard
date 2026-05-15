import { Filter, Settings2 } from 'lucide-react'
import { titleCase } from './utils'

export default function UsersToolbar({
  roleId,
  onChangeRoleId,
  status,
  onChangeStatus,
  department,
  onChangeDepartment,
  roleOptions,
}: {
  roleId: 'all' | number
  onChangeRoleId: (v: 'all' | number) => void
  status: 'all' | 'active' | 'inactive'
  onChangeStatus: (v: 'all' | 'active' | 'inactive') => void
  department: string
  onChangeDepartment: (v: string) => void
  roleOptions: Array<{ id: number; name: string }>
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      <select
        value={String(roleId)}
        onChange={(e) => onChangeRoleId(e.target.value === 'all' ? 'all' : Number(e.target.value))}
        className="h-9 rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-white focus:border-primary focus:outline-none"
      >
        <option value="all">All Roles</option>
        {roleOptions.map((r) => (
          <option key={r.id} value={r.id}>
            {titleCase(r.name)}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => {
          const v = e.target.value
          if (v === 'all' || v === 'active' || v === 'inactive') onChangeStatus(v)
        }}
        className="h-9 rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-white focus:border-primary focus:outline-none"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <select
        value={department}
        onChange={(e) => onChangeDepartment(e.target.value)}
        className="h-9 rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-white focus:border-primary focus:outline-none"
      >
        <option value="all">All Departments</option>
        <option value="it operations">IT Operations</option>
        <option value="network team">Network Team</option>
        <option value="noc">NOC</option>
        <option value="it support">IT Support</option>
        <option value="infrastructure">Infrastructure</option>
      </select>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-dark/40 px-3 text-sm font-medium text-white hover:bg-white/5"
        >
          <Filter className="size-4 text-secondary" aria-hidden />
          Filters
        </button>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-dark/40 text-white hover:bg-white/5"
          aria-label="Settings"
        >
          <Settings2 className="size-4 text-secondary" aria-hidden />
        </button>
      </div>
    </div>
  )
}
