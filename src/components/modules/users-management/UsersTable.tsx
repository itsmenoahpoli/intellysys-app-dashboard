import type { UserListItem } from '@/services/users.service'
import { ChevronDown, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import RolePill from './RolePill'
import StatusPill from './StatusPill'
import { avatarBg, formatLastLogin, initials } from './utils'

export default function UsersTable({
  users,
  loading,
  meEmail,
  onEdit,
  onDelete,
}: {
  users: UserListItem[]
  loading: boolean
  meEmail: string
  onEdit: (u: UserListItem) => void
  onDelete: (u: UserListItem) => void
}) {
  const [menuUserId, setMenuUserId] = useState<number | null>(null)

  const emptyLabel = useMemo(() => (loading ? 'Loading users...' : 'No users found.'), [loading])

  return (
    <div className="overflow-hidden rounded-xl bg-surface">
      <div className="overflow-auto">
        <table className="min-w-[980px] w-full border-collapse text-left text-sm">
          <thead className="bg-transparent text-[11px] text-secondary">
            <tr>
              <th className="px-4 py-3 font-medium">
                <div className="inline-flex items-center gap-1">
                  USER <ChevronDown className="size-3 opacity-60" aria-hidden />
                </div>
              </th>
              <th className="px-4 py-3 font-medium">USERNAME</th>
              <th className="px-4 py-3 font-medium">EMAIL</th>
              <th className="px-4 py-3 font-medium">
                <div className="inline-flex items-center gap-1">
                  ROLE <ChevronDown className="size-3 opacity-60" aria-hidden />
                </div>
              </th>
              <th className="px-4 py-3 font-medium">
                <div className="inline-flex items-center gap-1">
                  DEPARTMENT <ChevronDown className="size-3 opacity-60" aria-hidden />
                </div>
              </th>
              <th className="px-4 py-3 font-medium">
                <div className="inline-flex items-center gap-1">
                  STATUS <ChevronDown className="size-3 opacity-60" aria-hidden />
                </div>
              </th>
              <th className="px-4 py-3 font-medium">
                <div className="inline-flex items-center gap-1">
                  LAST LOGIN <ChevronDown className="size-3 opacity-60" aria-hidden />
                </div>
              </th>
              <th className="px-4 py-3 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-secondary">
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u.id}
                  className="border-t border-white/5 hover:bg-white/[0.04] hover:backdrop-blur-sm"
                >
                  <td className="px-4 py-3">
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
                  </td>
                  <td className="px-4 py-3 text-secondary">{u.username}</td>
                  <td className="px-4 py-3 text-secondary">{u.email}</td>
                  <td className="px-4 py-3">
                    <RolePill name={u.userRole.name} />
                  </td>
                  <td className="px-4 py-3 text-secondary">{u.department}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={u.status} />
                  </td>
                  <td className="px-4 py-3 text-secondary">{formatLastLogin(u.lastLoginAt)}</td>
                  <td className="px-4 py-3">
                    {meEmail && u.email === meEmail ? null : (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEdit(u)}
                          className="inline-flex size-9 items-center justify-center rounded-lg text-secondary hover:bg-white/5 hover:text-white"
                          aria-label="Edit user"
                        >
                          <Pencil className="size-4" aria-hidden />
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => setMenuUserId((prev) => (prev === u.id ? null : u.id))}
                            className="inline-flex size-9 items-center justify-center rounded-lg text-secondary hover:bg-white/5 hover:text-white"
                            aria-label="More actions"
                          >
                            <MoreVertical className="size-4" aria-hidden />
                          </button>
                          {menuUserId === u.id ? (
                            <div className="absolute right-0 top-10 z-20 w-36 overflow-hidden rounded-lg border border-white/10 bg-surface shadow-[0_12px_24px_rgba(0,0,0,0.3)]">
                              <button
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
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

