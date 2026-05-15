import { useCallback, useState } from 'react'
import type { SortOrder } from './types'

export type UseDataTableOptions = {
  initialPage?: number
  initialPageSize?: number
  initialSearch?: string
  initialSortBy?: string
  initialSortOrder?: SortOrder
}

export function useDataTable(options: UseDataTableOptions = {}) {
  const [page, setPage] = useState(options.initialPage ?? 1)
  const [pageSize, setPageSize] = useState(options.initialPageSize ?? 10)
  const [search, setSearch] = useState(options.initialSearch ?? '')
  const [sortBy, setSortBy] = useState(options.initialSortBy)
  const [sortOrder, setSortOrder] = useState<SortOrder>(options.initialSortOrder ?? 'asc')

  const onSearchChange = useCallback((value: string) => {
    setPage(1)
    setSearch(value)
  }, [])

  const onSortChange = useCallback((nextSortBy: string, nextSortOrder: SortOrder) => {
    setPage(1)
    setSortBy(nextSortBy)
    setSortOrder(nextSortOrder)
  }, [])

  const onPageChange = useCallback((nextPage: number) => {
    setPage(nextPage)
  }, [])

  const onPageSizeChange = useCallback((nextPageSize: number) => {
    setPage(1)
    setPageSize(nextPageSize)
  }, [])

  const reset = useCallback(() => {
    setPage(1)
    setSearch('')
    setSortBy(options.initialSortBy)
    setSortOrder(options.initialSortOrder ?? 'asc')
  }, [options.initialSortBy, options.initialSortOrder])

  return {
    page,
    pageSize,
    search,
    sortBy,
    sortOrder,
    setPage,
    setPageSize,
    setSearch,
    setSortBy,
    setSortOrder,
    onSearchChange,
    onSortChange,
    onPageChange,
    onPageSizeChange,
    reset,
  }
}
