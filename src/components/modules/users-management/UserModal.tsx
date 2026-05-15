import type { CreateUserPayload, UpdateUserPayload, UserListItem } from '@/services/users.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Field from './Field'
import { titleCase } from './utils'

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  userRoleId: z.number({ message: 'Role is required' }),
  password: z
    .string()
    .optional()
    .refine((v) => !v || v.length >= 6, {
      message: 'Password must be at least 6 characters',
    }),
})

type UserFormValues = z.infer<typeof userSchema>

export default function UserModal({
  open,
  mode,
  roles,
  user,
  busy,
  onClose,
  onCreate,
  onUpdate,
}: {
  open: boolean
  mode: 'create' | 'edit'
  roles: Array<{ id: number; name: string }>
  user: UserListItem | null
  busy: boolean
  onClose: () => void
  onCreate: (payload: CreateUserPayload) => void
  onUpdate: (payload: UpdateUserPayload) => void
}) {
  const rolesReady = roles.length > 0
  const defaultRoleId = user?.userRoleId ?? (roles[0]?.id ?? 0)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    getValues,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      userRoleId: defaultRoleId,
      password: '',
    },
  })

  useEffect(() => {
    if (!open) return
    const currentRoleId = getValues('userRoleId')
    const nextRoleId = defaultRoleId

    // Only force-reset role when roles arrive (avoid wiping user edits).
    const shouldUpdateRole = currentRoleId === 0 && nextRoleId !== 0

    if (user || shouldUpdateRole) {
      reset({
        name: user?.name ?? '',
        email: user?.email ?? '',
        userRoleId: nextRoleId,
        password: '',
      })
    }
  }, [open, user, defaultRoleId, reset, getValues])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-surface p-5 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-white">
              {mode === 'create' ? 'Add User' : 'Edit User'}
            </div>
            <div className="mt-1 text-xs text-secondary">
              {mode === 'create' ? 'Create a new user account.' : 'Update user details and role.'}
            </div>
          </div>
          <button
            className="inline-flex size-9 items-center justify-center rounded-lg text-secondary hover:bg-white/5 hover:text-white"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <form
          className="mt-4 grid grid-cols-1 gap-4"
          onSubmit={handleSubmit((values) => {
            if (!rolesReady) {
              setError('userRoleId', { type: 'manual', message: 'Roles are still loading' })
              return
            }
            if (mode === 'create' && !values.password) {
              setError('password', { type: 'manual', message: 'Password is required' })
              return
            }

            if (mode === 'create') {
              const payload: CreateUserPayload = {
                name: values.name,
                email: values.email,
                userRoleId: values.userRoleId,
                password: values.password ?? '',
              }
              onCreate(payload)
              return
            }

            const payload: UpdateUserPayload = {
              name: values.name,
              email: values.email,
              userRoleId: values.userRoleId,
              ...(values.password && values.password.trim() ? { password: values.password } : {}),
            }
            onUpdate(payload)
          })}
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Field
              label="Name"
              error={errors.name?.message}
              input={
                <input
                  className="h-10 w-full rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-white placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Full name"
                  {...register('name')}
                />
              }
            />
            <Field
              label="Role"
              error={typeof errors.userRoleId?.message === 'string' ? errors.userRoleId.message : undefined}
              input={
                <select
                  className="h-10 w-full rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-white focus:border-primary focus:outline-none"
                  {...register('userRoleId', { valueAsNumber: true })}
                  disabled={!rolesReady}
                >
                  {rolesReady ? (
                    roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {titleCase(r.name)}
                      </option>
                    ))
                  ) : (
                    <option value={0}>Loading roles...</option>
                  )}
                </select>
              }
            />
          </div>

          <Field
            label="Email"
            error={errors.email?.message}
            input={
              <input
                className="h-10 w-full rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-white placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="name@company.com"
                type="email"
                {...register('email')}
              />
            }
          />

          <Field
            label={mode === 'create' ? 'Password' : 'Password (optional)'}
            error={errors.password?.message}
            input={
              <input
                className="h-10 w-full rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-white placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder={mode === 'create' ? 'Set a password' : 'Leave blank to keep unchanged'}
                type="password"
                autoComplete="new-password"
                {...register('password')}
              />
            }
          />

          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-white/10 bg-dark/40 px-4 text-sm font-medium text-white hover:bg-white/5"
              disabled={busy}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
              disabled={busy || !rolesReady}
            >
              {busy ? 'Saving...' : mode === 'create' ? 'Create' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

