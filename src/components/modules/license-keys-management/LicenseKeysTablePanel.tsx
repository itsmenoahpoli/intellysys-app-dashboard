import { Search } from 'lucide-react'
import type { LicenseKeyItem } from '@/services/license-keys.service'
import LicenseKeysTable from './LicenseKeysTable'
import PageButton from '../users-management/PageButton'

const PAGE_SIZES = [10, 25, 50, 100] as const

export default function LicenseKeysTablePanel({
  q,
  onChangeQ,
  status,
  onChangeStatus,
  sortBy,
  onChangeSortBy,
  sortOrder,
  onChangeSortOrder,
  items,
  loading,
  onEdit,
  onDelete,
  page,
  totalPages,
  total,
  showingFrom,
  showingTo,
  limit,
  onChangePage,
  onChangeLimit,
}: {
  q: string
  onChangeQ: (v: string) => void
  status: 'all' | 'unused' | 'used' | 'revoked'
  onChangeStatus: (v: 'all' | 'unused' | 'used' | 'revoked') => void
  sortBy: 'code' | 'status' | 'expiresAt' | 'createdAt' | 'updatedAt'
  onChangeSortBy: (v: 'code' | 'status' | 'expiresAt' | 'createdAt' | 'updatedAt') => void
  sortOrder: 'asc' | 'desc'
  onChangeSortOrder: (v: 'asc' | 'desc') => void
  items: LicenseKeyItem[]
  loading: boolean
  onEdit: (item: LicenseKeyItem) => void
  onDelete: (item: LicenseKeyItem) => void
  page: number
  totalPages: number
  total: number
  showingFrom: number
  showingTo: number
  limit: typeof PAGE_SIZES[number]
  onChangePage: (p: number) => void
  onChangeLimit: (limit: typeof PAGE_SIZES[number]) => void
}) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Search and Filters Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-surface/40 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="size-4 text-secondary" aria-hidden />
          </span>
          <input
            type="text"
            value={q}
            onChange={(e) => onChangeQ(e.target.value)}
            placeholder="Search key code or UUID..."
            className="h-10 w-full rounded-lg border border-white/10 bg-dark/40 pl-10 pr-4 text-sm text-white placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter */}
          <select
            value={status}
            onChange={(e) => onChangeStatus(e.target.value as typeof status)}
            className="h-10 rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-white focus:border-primary focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="unused">Unused</option>
            <option value="used">Used</option>
            <option value="revoked">Revoked</option>
          </select>

          {/* Sort field */}
          <select
            value={sortBy}
            onChange={(e) => onChangeSortBy(e.target.value as typeof sortBy)}
            className="h-10 rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-white focus:border-primary focus:outline-none"
          >
            <option value="createdAt">Sort by Date Issued</option>
            <option value="code">Sort by License Code</option>
            <option value="status">Sort by Status</option>
            <option value="expiresAt">Sort by Expiration Date</option>
          </select>

          {/* Sort order */}
          <select
            value={sortOrder}
            onChange={(e) => onChangeSortOrder(e.target.value as typeof sortOrder)}
            className="h-10 rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-white focus:border-primary focus:outline-none"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <LicenseKeysTable
        items={items}
        loading={loading}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      {/* Pagination Footer */}
      <div className="border-t border-white/5 bg-transparent px-4 py-3 text-sm text-secondary">
        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-3">
          <div className="md:justify-self-start">
            Showing {total ? showingFrom : 0} to {total ? showingTo : 0} of {total} license keys
          </div>

          <div className="flex items-center justify-center gap-1">
            <PageButton disabled={page <= 1} onClick={() => onChangePage(Math.max(1, page - 1))}>
              ‹
            </PageButton>

            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const p = i + 1
              return (
                <PageButton key={p} active={p === page} onClick={() => onChangePage(p)}>
                  {p}
                </PageButton>
              )
            })}

            {totalPages > 5 ? (
              <>
                <span className="px-1 text-secondary">…</span>
                <PageButton active={totalPages === page} onClick={() => onChangePage(totalPages)}>
                  {totalPages}
                </PageButton>
              </>
            ) : null}

            <PageButton
              disabled={page >= totalPages}
              onClick={() => onChangePage(Math.min(totalPages, page + 1))}
            >
              ›
            </PageButton>
          </div>

          <div className="flex items-center justify-end gap-2 md:justify-self-end">
            <span className="text-xs">Rows per page:</span>
            <select
              value={limit}
              onChange={(e) => {
                const v = Number(e.target.value)
                const next = PAGE_SIZES.find((s) => s === v)
                if (next) onChangeLimit(next)
              }}
              className="h-8 rounded-lg border border-white/10 bg-dark/40 px-2 text-sm text-white"
            >
              {PAGE_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
