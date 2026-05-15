import type { DataTableColumn } from '@/components/ui/data-table'
import type { UserListItem } from '@/services/users.service'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import RolePill from './RolePill'
import StatusPill from './StatusPill'
import { avatarBg, formatLastLogin, initials } from './utils'

export function getUsersTableColumns({
  meEmail,
  menuUserId,
  setMenuUserId,
  onEdit,
  onDelete,
}: {
  meEmail: string
  menuUserId: number | null
  setMenuUserId: Dispatch<SetStateAction<number | null>>
  onEdit: (u: UserListItem) => void
  onDelete: (u: UserListItem) => void
}): DataTableColumn<UserListItem>[] {
  return [
    {
      id: 'name',
      header: 'USER',
      sortable: true,
      sortKey: 'name',
      cell: (u) => (
        <div className="flex items-center gap-3">
          <div
            className={[
              'grid size-9 place-items-center rounded-full ring-1 text-xs font-semibold',
              avatarBg(u.name),
            ].join(' ')}
          >
            {initials(u.name)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate font-medium text-white">{u.name}</span>
              {meEmail && u.email === meEmail ? (
                <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">
                  You
                </span>
              ) : null}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'username',
      header: 'USERNAME',
      cell: (u) => <span className="text-secondary">{u.username}</span>,
    },
    {
      id: 'email',
      header: 'EMAIL',
      sortable: true,
      sortKey: 'email',
      cell: (u) => <span className="text-secondary">{u.email}</span>,
    },
    {
      id: 'role',
      header: 'ROLE',
      cell: (u) => <RolePill name={u.userRole.name} />,
    },
    {
      id: 'department',
      header: 'DEPARTMENT',
      cell: (u) => <span className="text-secondary">{u.department}</span>,
    },
    {
      id: 'status',
      header: 'STATUS',
      cell: (u) => <StatusPill status={u.status} />,
    },
    {
      id: 'lastLogin',
      header: 'LAST LOGIN',
      sortable: true,
      sortKey: 'updatedAt',
      cell: (u) => <span className="text-secondary">{formatLastLogin(u.lastLoginAt)}</span>,
    },
    {
      id: 'actions',
      header: 'ACTIONS',
      align: 'right',
      cell: (u) =>
        meEmail && u.email === meEmail ? null : (
          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              onClick={() => onEdit(u)}
              className="inline-flex size-9 items-center justify-center rounded-lg text-secondary hover:bg-white/5 hover:text-white"
              aria-label="Edit user"
            >
              <Pencil className="size-4" aria-hidden />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuUserId((prev) => (prev === u.id ? null : u.id))}
                className="inline-flex size-9 items-center justify-center rounded-lg text-secondary hover:bg-white/5 hover:text-white"
                aria-label="More actions"
              >
                <MoreVertical className="size-4" aria-hidden />
              </button>
              {menuUserId === u.id ? (
                <div className="absolute right-0 top-10 z-20 w-36 overflow-hidden rounded-lg border border-white/10 bg-surface shadow-[0_12px_24px_rgba(0,0,0,0.3)]">
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-danger hover:bg-white/5"
                    onClick={() => {
                      setMenuUserId(null)
                      onDelete(u)
                    }}
                  >
                    <Trash2 className="size-4" aria-hidden />
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ),
    },
  ]
}
