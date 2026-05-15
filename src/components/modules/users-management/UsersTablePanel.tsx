import { DataTable } from '@/components/ui/data-table'
import type { SortOrder } from '@/components/ui/data-table'
import type { UserListItem } from '@/services/users.service'
import { useMemo, useState } from 'react'
import UsersToolbar from './UsersToolbar'
import { getUsersTableColumns } from './usersTableColumns'

export default function UsersTablePanel({
  q,
  onChangeQ,
  sortBy,
  sortOrder,
  onSortChange,
  roleId,
  onChangeRoleId,
  status,
  onChangeStatus,
  department,
  onChangeDepartment,
  roleOptions,
  users,
  usersLoading,
  meEmail,
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
  sortBy: string
  sortOrder: SortOrder
  onSortChange: (sortBy: string, sortOrder: SortOrder) => void
  roleId: 'all' | number
  onChangeRoleId: (v: 'all' | number) => void
  status: 'all' | 'active' | 'inactive'
  onChangeStatus: (v: 'all' | 'active' | 'inactive') => void
  department: string
  onChangeDepartment: (v: string) => void
  roleOptions: Array<{ id: number; name: string }>
  users: UserListItem[]
  usersLoading: boolean
  meEmail: string
  onEdit: (u: UserListItem) => void
  onDelete: (u: UserListItem) => void
  page: number
  totalPages: number
  total: number
  showingFrom: number
  showingTo: number
  limit: 10 | 25 | 50 | 100
  onChangePage: (p: number) => void
  onChangeLimit: (limit: 10 | 25 | 50 | 100) => void
}) {
  const [menuUserId, setMenuUserId] = useState<number | null>(null)

  const columns = useMemo(
    () =>
      getUsersTableColumns({
        meEmail,
        menuUserId,
        setMenuUserId,
        onEdit,
        onDelete,
      }),
    [meEmail, menuUserId, onDelete, onEdit],
  )

  return (
    <DataTable
      className="mt-4"
      columns={columns}
      data={users}
      rowKey={(u) => u.id}
      loading={usersLoading}
      loadingMessage="Loading users…"
      emptyMessage="No users found."
      minTableWidth="980px"
      search={{
        value: q,
        onChange: onChangeQ,
        placeholder: 'Search users by name, email, or username…',
      }}
      sort={{
        sortBy,
        sortOrder,
        onChange: onSortChange,
      }}
      pagination={{
        page,
        pageSize: limit,
        total,
        totalPages,
        showingFrom,
        showingTo,
        entityLabel: 'users',
        pageSizeOptions: [10, 25, 50, 100],
        onPageChange: onChangePage,
        onPageSizeChange: (size) => {
          if (size === 10 || size === 25 || size === 50 || size === 100) {
            onChangeLimit(size)
          }
        },
      }}
      filters={
        <UsersToolbar
          roleId={roleId}
          onChangeRoleId={onChangeRoleId}
          status={status}
          onChangeStatus={onChangeStatus}
          department={department}
          onChangeDepartment={onChangeDepartment}
          roleOptions={roleOptions}
        />
      }
    />
  )
}
