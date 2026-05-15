import PageButton from '@/components/modules/users-management/PageButton'

const DEFAULT_PAGE_SIZES = [10, 25, 50, 100] as const

type DataTablePaginationProps = {
  page: number
  pageSize: number
  total: number
  totalPages: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  showingFrom?: number
  showingTo?: number
  entityLabel?: string
}

function buildPageItems(page: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const items: Array<number | 'ellipsis'> = [1]

  if (page > 3) items.push('ellipsis')

  const start = Math.max(2, page - 1)
  const end = Math.min(totalPages - 1, page + 1)

  for (let p = start; p <= end; p++) {
    if (!items.includes(p)) items.push(p)
  }

  if (page < totalPages - 2) items.push('ellipsis')
  if (!items.includes(totalPages)) items.push(totalPages)

  return items
}

export default function DataTablePagination({
  page,
  pageSize,
  total,
  totalPages,
  pageSizeOptions = [...DEFAULT_PAGE_SIZES],
  onPageChange,
  onPageSizeChange,
  showingFrom,
  showingTo,
  entityLabel = 'records',
}: DataTablePaginationProps) {
  const from = showingFrom ?? (total ? (page - 1) * pageSize + 1 : 0)
  const to = showingTo ?? (total ? Math.min(total, page * pageSize) : 0)
  const pageItems = buildPageItems(page, totalPages)

  return (
    <div className="border-t border-white/5 bg-transparent px-4 py-3 text-sm text-secondary">
      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-3">
        <div className="md:justify-self-start">
          Showing {total ? from : 0} to {total ? to : 0} of {total} {entityLabel}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1">
          <PageButton disabled={page <= 1} onClick={() => onPageChange(Math.max(1, page - 1))}>
            ‹
          </PageButton>

          {pageItems.map((item, index) =>
            item === 'ellipsis' ? (
              <span key={`ellipsis-${index}`} className="px-1 text-secondary">
                …
              </span>
            ) : (
              <PageButton key={item} active={item === page} onClick={() => onPageChange(item)}>
                {item}
              </PageButton>
            ),
          )}

          <PageButton
            disabled={page >= totalPages}
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          >
            ›
          </PageButton>
        </div>

        <div className="flex items-center justify-end gap-2 md:justify-self-end">
          <span className="text-xs">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              const v = Number(e.target.value)
              if (pageSizeOptions.includes(v)) onPageSizeChange(v)
            }}
            className="h-8 rounded-lg border border-white/10 bg-dark/40 px-2 text-sm text-white"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
