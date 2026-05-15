import type { ReactNode } from 'react'

export type SortOrder = 'asc' | 'desc'

export type DataTableColumn<T> = {
  id: string
  header: ReactNode
  cell: (row: T) => ReactNode
  sortable?: boolean
  /** API / server sort field; defaults to `id` */
  sortKey?: string
  align?: 'left' | 'right' | 'center'
  className?: string
  headerClassName?: string
}

export type DataTableSearchConfig = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export type DataTableSortConfig = {
  sortBy?: string
  sortOrder?: SortOrder
  onChange: (sortBy: string, sortOrder: SortOrder) => void
}

export type DataTablePaginationConfig = {
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

export type DataTableProps<T> = {
  columns: DataTableColumn<T>[]
  data: T[]
  rowKey: (row: T) => string | number
  loading?: boolean
  emptyMessage?: string
  loadingMessage?: string
  search?: DataTableSearchConfig
  sort?: DataTableSortConfig
  pagination?: DataTablePaginationConfig
  /** Extra filters beside search (role, status, etc.) */
  filters?: ReactNode
  minTableWidth?: string
  className?: string
}
