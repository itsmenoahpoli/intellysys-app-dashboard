import { Download, Plus } from 'lucide-react'

export default function UsersHeader({
  onAdd,
  onOpenSessionLogs,
}: {
  onAdd: () => void
  onOpenSessionLogs: () => void
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-white">Users</h1>
        <p className="mt-1 text-sm text-secondary">
          Manage system users, roles, and access permissions
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white hover:bg-white/10">
          <Download className="size-4 text-secondary" aria-hidden />
          Import Users
        </button>
        <button
          onClick={onOpenSessionLogs}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
        >
          Session Logs
        </button>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:opacity-95"
        >
          <Plus className="size-4" aria-hidden />
          Add User
        </button>
      </div>
    </div>
  )
}

