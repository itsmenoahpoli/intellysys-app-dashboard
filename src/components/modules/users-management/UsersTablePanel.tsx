import type { UserListItem } from '@/services/users.service'
import UsersPagination from './UsersPagination'
import UsersTable from './UsersTable'
import UsersToolbar from './UsersToolbar'

export default function UsersTablePanel({
  q,
  onChangeQ,
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
  return (
    <div className="mt-4 flex flex-col gap-3 rounded-xl border border-white/10 bg-surface/80 p-3 shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
      <UsersToolbar
        q={q}
        onChangeQ={onChangeQ}
        roleId={roleId}
        onChangeRoleId={onChangeRoleId}
        status={status}
        onChangeStatus={onChangeStatus}
        department={department}
        onChangeDepartment={onChangeDepartment}
        roleOptions={roleOptions}
      />

      <UsersTable users={users} loading={usersLoading} meEmail={meEmail} onEdit={onEdit} onDelete={onDelete} />

      <UsersPagination
        page={page}
        totalPages={totalPages}
        total={total}
        showingFrom={showingFrom}
        showingTo={showingTo}
        limit={limit}
        onChangePage={onChangePage}
        onChangeLimit={onChangeLimit}
      />
    </div>
  )
}

