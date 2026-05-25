import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import type { DataTableColumn, DataTableProps, SortOrder } from './types'
import DataTablePagination from './DataTablePagination'

function SortIcon({
  active,
  sortOrder,
}: {
  active: boolean
  sortOrder?: SortOrder
}) {
  if (!active) {
    return <ChevronDown className="size-3 opacity-40" aria-hidden />
  }
  return sortOrder === 'asc' ? (
    <ChevronUp className="size-3 text-primary" aria-hidden />
  ) : (
    <ChevronDown className="size-3 text-primary" aria-hidden />
  )
}

function alignClass(align?: DataTableColumn<unknown>['align']) {
  if (align === 'right') return 'text-right'
  if (align === 'center') return 'text-center'
  return 'text-left'
}

export default function DataTable<T>({
  columns,
  data,
  rowKey,
  loading = false,
  emptyMessage = 'No records found.',
  loadingMessage = 'Loading…',
  search,
  sort,
  pagination,
  filters,
  minTableWidth = '720px',
  className = '',
}: DataTableProps<T>) {
  const colCount = columns.length

  const handleSort = (column: DataTableColumn<T>) => {
    if (!sort || !column.sortable) return
    const key = column.sortKey ?? column.id
    if (sort.sortBy === key) {
      sort.onChange(key, sort.sortOrder === 'asc' ? 'desc' : 'asc')
      return
    }
    sort.onChange(key, 'asc')
  }

  const emptyLabel = loading ? loadingMessage : emptyMessage

  return (
    <div
      className={[
        'flex flex-col gap-3 rounded-xl border border-black/5 dark:border-white/10 bg-surface/80 p-3 shadow-[0_12px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.25)]',
        className,
      ].join(' ')}
    >
      {search || filters ? (
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {search ? (
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-secondary"
                aria-hidden
              />
              <input
                type="search"
                value={search.value}
                onChange={(e) => search.onChange(e.target.value)}
                placeholder={search.placeholder ?? 'Search…'}
                className="w-full rounded-lg border border-black/5 dark:border-white/10 bg-black/5 dark:bg-dark/40 py-2 pl-9 pr-3 text-sm text-slate-900 dark:text-white placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          ) : null}
          {filters ? <div className="min-w-0 flex-1 lg:flex-none">{filters}</div> : null}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl bg-surface">
        <div className="overflow-auto">
          <table
            className="w-full border-collapse text-left text-sm"
            style={{ minWidth: minTableWidth }}
          >
            <thead className="bg-transparent text-[11px] text-secondary">
              <tr>
                {columns.map((column) => {
                  const sortKey = column.sortKey ?? column.id
                  const isSorted = sort?.sortBy === sortKey

                  return (
                    <th
                      key={column.id}
                      className={[
                        'px-4 py-3 font-medium',
                        alignClass(column.align),
                        column.headerClassName ?? '',
                      ].join(' ')}
                    >
                      {column.sortable && sort ? (
                        <button
                          type="button"
                          onClick={() => handleSort(column)}
                          className={[
                            'inline-flex items-center gap-1 transition-colors hover:text-slate-900 dark:hover:text-white',
                            column.align === 'right'
                              ? 'ml-auto'
                              : column.align === 'center'
                                ? 'mx-auto'
                                : '',
                            isSorted ? 'text-slate-900 dark:text-white' : '',
                          ].join(' ')}
                        >
                          {column.header}
                          <SortIcon active={isSorted} sortOrder={sort.sortOrder} />
                        </button>
                      ) : (
                        column.header
                      )}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={colCount} className="px-4 py-10 text-center text-secondary">
                    {emptyLabel}
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr
                    key={rowKey(row)}
                    className="border-t border-black/5 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.04] hover:backdrop-blur-sm"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.id}
                        className={[
                          'px-4 py-3',
                          alignClass(column.align),
                          column.className ?? '',
                        ].join(' ')}
                      >
                        {column.cell(row)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination ? (
          <DataTablePagination
            page={pagination.page}
            pageSize={pagination.pageSize}
            total={pagination.total}
            totalPages={pagination.totalPages}
            pageSizeOptions={pagination.pageSizeOptions}
            onPageChange={pagination.onPageChange}
            onPageSizeChange={pagination.onPageSizeChange}
            showingFrom={pagination.showingFrom}
            showingTo={pagination.showingTo}
            entityLabel={pagination.entityLabel}
          />
        ) : null}
      </div>
    </div>
  )
}
