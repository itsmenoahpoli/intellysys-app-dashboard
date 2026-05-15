import DashboardLayout from '@/components/layout/dashboard/DashboardLayout'
import Field from '@/components/modules/users-management/Field'
import { extractErrorMessage, titleCase } from '@/components/modules/users-management/utils'
import {
  fetchMyAccount,
  updateMyAccount,
  type MyAccountProfile,
} from '@/services/account.service'
import { useAuthStore } from '@/stores/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const accountSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
})

type AccountFormValues = z.infer<typeof accountSchema>

function formatRole(raw?: string) {
  const v = (raw ?? '').trim().toLowerCase()
  if (v === 'super admin') return 'Super Administrator'
  if (v === 'it admin') return 'Administrator'
  if (v === 'manager') return 'Operator'
  if (v === 'employee') return 'Viewer'
  return raw ? titleCase(raw) : '—'
}

function formatDateTime(raw?: string) {
  if (!raw) return '—'
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString()
}

export default function MyAccountPage() {
  const queryClient = useQueryClient()
  const updateAuthUser = useAuthStore((s) => s.updateAuthUser)

  const accountQuery = useQuery({
    queryKey: ['my-account'],
    queryFn: async () => (await fetchMyAccount()).data,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: { name: '', email: '' },
  })

  useEffect(() => {
    if (!accountQuery.data) return
    reset({
      name: accountQuery.data.name,
      email: accountQuery.data.email,
    })
  }, [accountQuery.data, reset])

  const saveMutation = useMutation({
    mutationFn: updateMyAccount,
    onSuccess: async (res) => {
      const profile = res.data as MyAccountProfile
      updateAuthUser({ name: profile.name, email: profile.email })
      await queryClient.invalidateQueries({ queryKey: ['my-account'] })
      reset({ name: profile.name, email: profile.email })
      toast.success('Account updated')
    },
    onError: (err: unknown) =>
      toast.error(extractErrorMessage(err, 'Failed to update account')),
  })

  const profile = accountQuery.data
  const loading = accountQuery.isLoading

  return (
    <DashboardLayout>
      <Helmet>
        <title>My Account · WAP INTELLYSYS</title>
      </Helmet>

      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <h1 className="m-0 text-2xl font-semibold tracking-tight text-white">My Account</h1>
          <p className="mt-1 text-sm text-secondary">
            Manage your personal profile and account details.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/4 p-5">
          {loading ? (
            <p className="text-sm text-secondary">Loading account…</p>
          ) : accountQuery.isError ? (
            <p className="text-sm text-danger">Failed to load account details.</p>
          ) : (
            <form
              className="space-y-4"
              onSubmit={handleSubmit((values) => saveMutation.mutate(values))}
            >
              <Field
                label="Full name"
                input={
                  <input
                    {...register('name')}
                    className="h-10 w-full rounded-lg border border-white/10 bg-surface px-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/40"
                    autoComplete="name"
                  />
                }
                error={errors.name?.message}
              />

              <Field
                label="Email address"
                input={
                  <input
                    {...register('email')}
                    type="email"
                    className="h-10 w-full rounded-lg border border-white/10 bg-surface px-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/40"
                    autoComplete="email"
                  />
                }
                error={errors.email?.message}
              />

              <Field
                label="Role"
                input={
                  <input
                    value={formatRole(profile?.userRole?.name)}
                    readOnly
                    className="h-10 w-full cursor-not-allowed rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-secondary"
                  />
                }
              />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs font-semibold text-secondary">Member since</div>
                  <div className="mt-1 text-sm text-white">
                    {formatDateTime(profile?.createdAt)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-secondary">Last updated</div>
                  <div className="mt-1 text-sm text-white">
                    {formatDateTime(profile?.updatedAt)}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-white/10 pt-4">
                <button
                  type="button"
                  disabled={!isDirty || saveMutation.isPending}
                  onClick={() =>
                    reset({
                      name: profile?.name ?? '',
                      email: profile?.email ?? '',
                    })
                  }
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 text-sm font-medium text-white hover:bg-white/8 disabled:opacity-50"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={!isDirty || saveMutation.isPending}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
                >
                  {saveMutation.isPending ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
