import { DataTable } from '@/components/ui/data-table'
import type { DataTableColumn, SortOrder } from '@/components/ui/data-table'
import { useQuery } from '@tanstack/react-query'
import { Trash2, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  fetchAuthSessionLogs,
  type AuthSessionLog,
} from '@/services/auth-session-logs.service'
import UserNameAutocomplete, { type SelectedUser } from './UserNameAutocomplete'

const formatDateTime = (raw?: string) => {
  if (!raw) return '—'
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString()
}

const formatAction = (raw?: string) => {
  if (!raw) return '—'
  return raw.slice(0, 1).toUpperCase() + raw.slice(1).toLowerCase()
}

const sessionLogColumns: DataTableColumn<AuthSessionLog>[] = [
  {
    id: 'user',
    header: 'USER',
    cell: (log) => (
      <div className="min-w-0">
        <div className="truncate font-medium text-white">{log.user?.name ?? '—'}</div>
        <div className="truncate text-xs text-secondary">{log.user?.email ?? '—'}</div>
      </div>
    ),
  },
  {
    id: 'action',
    header: 'ACTION',
    sortable: true,
    sortKey: 'action',
    cell: (log) => (
      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white">
        {formatAction(log.action)}
      </span>
    ),
  },
  {
    id: 'ip',
    header: 'IP ADDRESS',
    sortable: true,
    sortKey: 'ipAddress',
    cell: (log) => log.ipAddress ?? '—',
  },
  {
    id: 'userAgent',
    header: 'USER AGENT',
    headerClassName: 'min-w-[220px]',
    className: 'min-w-[220px] align-top',
    cell: (log) => (
      <span className="block whitespace-normal wrap-break-word text-xs leading-relaxed">
        {log.userAgent ?? '—'}
      </span>
    ),
  },
  {
    id: 'time',
    header: 'TIME',
    sortable: true,
    sortKey: 'createdAt',
    cell: (log) => formatDateTime(log.createdAt),
  },
]

export default function AuthSessionLogsModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [q, setQ] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const query = useMemo(
    () => ({
      page,
      limit,
      q: q.trim() || undefined,
      userId: selectedUser?.id,
      sortBy: sortBy as 'createdAt' | 'action' | 'ipAddress',
      sortOrder,
      startDate: startDate.trim() || undefined,
      endDate: endDate.trim() || undefined,
    }),
    [endDate, limit, page, q, selectedUser, sortBy, sortOrder, startDate],
  )

  const logsQuery = useQuery({
    queryKey: ['auth-session-logs', query],
    queryFn: () => fetchAuthSessionLogs(query),
    enabled: open,
  })

  const logs = useMemo(() => logsQuery.data?.data ?? [], [logsQuery.data])
  const meta = logsQuery.data?.meta
  const totalPages = meta?.totalPages ?? 1
  const total = meta?.total ?? 0
  const showingFrom = meta ? (meta.page - 1) * meta.limit + 1 : 0
  const showingTo = meta ? Math.min(meta.total, meta.page * meta.limit) : 0

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-[90vw] max-w-[90vw] rounded-2xl border border-white/10 bg-surface p-5 shadow-[0_24px_70px_rgba(0,0,0,0.55)] lg:w-[86vw] lg:max-w-[86vw]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-white">Session Logs</div>
            <div className="mt-1 text-xs text-secondary">
              Review recent authentication activity across users.
            </div>
          </div>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg text-secondary hover:bg-white/5 hover:text-white"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <DataTable
          className="mt-4 border-0 bg-transparent p-0 shadow-none"
          columns={sessionLogColumns}
          data={logs}
          rowKey={(log) => log.id}
          loading={logsQuery.isLoading}
          loadingMessage="Loading session logs…"
          emptyMessage="No session logs found."
          minTableWidth="920px"
          search={{
            value: q,
            onChange: (value) => {
              setPage(1)
              setQ(value)
            },
            placeholder: 'Search by user name or email…',
          }}
          sort={{
            sortBy,
            sortOrder,
            onChange: (nextSortBy, nextSortOrder) => {
              setPage(1)
              setSortBy(nextSortBy)
              setSortOrder(nextSortOrder)
            },
          }}
          pagination={{
            page,
            pageSize: limit,
            total,
            totalPages,
            showingFrom,
            showingTo,
            entityLabel: 'logs',
            pageSizeOptions: [10, 25, 50],
            onPageChange: setPage,
            onPageSizeChange: (size) => {
              setPage(1)
              setLimit(size)
            },
          }}
          filters={
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-12">
              <div className="sm:col-span-4">
                <label className="block text-[11px] font-medium text-secondary">User</label>
                <div className="mt-1">
                  <UserNameAutocomplete
                    value={selectedUser}
                    onChange={(user) => {
                      setPage(1)
                      setSelectedUser(user)
                    }}
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-medium text-secondary">
                  Start date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setPage(1)
                    setStartDate(e.target.value)
                  }}
                  className="mt-1 h-10 w-full rounded-lg border border-white/10 bg-surface px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-medium text-secondary">End date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setPage(1)
                    setEndDate(e.target.value)
                  }}
                  className="mt-1 h-10 w-full rounded-lg border border-white/10 bg-surface px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div className="sm:col-span-2 sm:flex sm:items-end">
                <button
                  type="button"
                  onClick={() => {
                    setPage(1)
                    setSelectedUser(null)
                    setStartDate('')
                    setEndDate('')
                    setQ('')
                  }}
                  aria-label="Clear filters"
                  title="Clear filters"
                  className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 px-3 text-sm font-medium text-red-200 hover:bg-red-500/15 hover:text-white"
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}
