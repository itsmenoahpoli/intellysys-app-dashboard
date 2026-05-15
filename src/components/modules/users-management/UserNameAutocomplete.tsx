import { fetchUsers, type UserListItem } from '@/services/users.service'
import { useQuery } from '@tanstack/react-query'
import { ChevronDown, X } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'

export type SelectedUser = {
  id: number
  name: string
}

type UserNameAutocompleteProps = {
  value: SelectedUser | null
  onChange: (user: SelectedUser | null) => void
  disabled?: boolean
}

export default function UserNameAutocomplete({
  value,
  onChange,
  disabled,
}: UserNameAutocompleteProps) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState(value?.name ?? '')

  useEffect(() => {
    setInput(value?.name ?? '')
  }, [value])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const el = rootRef.current
      if (!el) return
      const target = e.target as Node | null
      if (target && el.contains(target)) return
      setOpen(false)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown, { passive: true })
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const searchTerm = input.trim()

  const usersQuery = useQuery({
    queryKey: ['users-autocomplete', searchTerm],
    queryFn: () =>
      fetchUsers({
        page: 1,
        limit: 25,
        q: searchTerm || undefined,
        sortBy: 'name',
        sortOrder: 'asc',
      }),
    enabled: open && !disabled,
  })

  const options = useMemo(() => usersQuery.data?.data ?? [], [usersQuery.data])

  const pickUser = (user: UserListItem) => {
    onChange({ id: user.id, name: user.name })
    setInput(user.name)
    setOpen(false)
  }

  const clearSelection = () => {
    onChange(null)
    setInput('')
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={input}
          disabled={disabled}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          placeholder="Search by full name…"
          className="h-10 w-full rounded-lg border border-white/10 bg-surface py-2 pl-3 pr-16 text-sm text-white placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setInput(e.target.value)
            if (value) onChange(null)
            setOpen(true)
          }}
        />

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
          {value ? (
            <button
              type="button"
              disabled={disabled}
              className="pointer-events-auto inline-flex size-7 items-center justify-center rounded-md text-secondary hover:bg-white/10 hover:text-white"
              aria-label="Clear user filter"
              onClick={(e) => {
                e.preventDefault()
                clearSelection()
              }}
            >
              <X className="size-3.5" aria-hidden />
            </button>
          ) : null}
          <ChevronDown
            className={[
              'size-4 text-secondary transition-transform',
              open ? 'rotate-180' : '',
            ].join(' ')}
            aria-hidden
          />
        </div>
      </div>

      {open && !disabled ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-white/10 bg-[#0b0e14] py-1 shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
        >
          <li role="option">
            <button
              type="button"
              className="flex w-full px-3 py-2 text-left text-sm text-secondary hover:bg-white/6 hover:text-white"
              onClick={clearSelection}
            >
              All users
            </button>
          </li>

          {usersQuery.isLoading ? (
            <li className="px-3 py-2 text-xs text-secondary">Searching users…</li>
          ) : options.length === 0 ? (
            <li className="px-3 py-2 text-xs text-secondary">No users found</li>
          ) : (
            options.map((user) => (
              <li key={user.id} role="option" aria-selected={value?.id === user.id}>
                <button
                  type="button"
                  className={[
                    'flex w-full flex-col px-3 py-2 text-left hover:bg-white/6',
                    value?.id === user.id ? 'bg-white/6' : '',
                  ].join(' ')}
                  onClick={() => pickUser(user)}
                >
                  <span className="text-sm font-medium text-white">{user.name}</span>
                  <span className="text-xs text-secondary">{user.email}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  )
}
