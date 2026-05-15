import PageButton from './PageButton'

const PAGE_SIZES = [10, 25, 50, 100] as const

export default function UsersPagination({
  page,
  totalPages,
  total,
  showingFrom,
  showingTo,
  limit,
  onChangePage,
  onChangeLimit,
}: {
  page: number
  totalPages: number
  total: number
  showingFrom: number
  showingTo: number
  limit: (typeof PAGE_SIZES)[number]
  onChangePage: (p: number) => void
  onChangeLimit: (limit: (typeof PAGE_SIZES)[number]) => void
}) {
  return (
    <div className="border-t border-white/5 bg-transparent px-4 py-3 text-sm text-secondary">
      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-3">
        <div className="md:justify-self-start">
          Showing {total ? showingFrom : 0} to {total ? showingTo : 0} of {total} users
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
  )
}

