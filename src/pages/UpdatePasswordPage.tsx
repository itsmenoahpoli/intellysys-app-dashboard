import DashboardLayout from '@/components/layout/dashboard/DashboardLayout'
import Field from '@/components/modules/users-management/Field'
import { extractErrorMessage } from '@/components/modules/users-management/utils'
import { updateMyPassword } from '@/services/account.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword'],
  })

type PasswordFormValues = z.infer<typeof passwordSchema>

export default function UpdatePasswordPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const saveMutation = useMutation({
    mutationFn: (values: PasswordFormValues) =>
      updateMyPassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      }),
    onSuccess: () => {
      reset()
      toast.success('Password updated successfully')
    },
    onError: (err: unknown) =>
      toast.error(extractErrorMessage(err, 'Failed to update password')),
  })

  return (
    <DashboardLayout>
      <Helmet>
        <title>Update Password · WAP INTELLYSYS</title>
      </Helmet>

      <div className="w-full max-w-lg">
        <div className="mb-6">
          <h1 className="m-0 text-2xl font-semibold tracking-tight text-white">
            Update Password
          </h1>
          <p className="mt-1 text-sm text-secondary">
            Change your password to keep your account secure.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/4 p-5">
          <form
            className="space-y-4"
            onSubmit={handleSubmit((values) => saveMutation.mutate(values))}
          >
            <Field
              label="Current password"
              input={
                <input
                  {...register('currentPassword')}
                  type="password"
                  autoComplete="current-password"
                  className="h-10 w-full rounded-lg border border-white/10 bg-surface px-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              }
              error={errors.currentPassword?.message}
            />

            <Field
              label="New password"
              input={
                <input
                  {...register('newPassword')}
                  type="password"
                  autoComplete="new-password"
                  className="h-10 w-full rounded-lg border border-white/10 bg-surface px-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              }
              error={errors.newPassword?.message}
            />

            <Field
              label="Confirm new password"
              input={
                <input
                  {...register('confirmPassword')}
                  type="password"
                  autoComplete="new-password"
                  className="h-10 w-full rounded-lg border border-white/10 bg-surface px-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              }
              error={errors.confirmPassword?.message}
            />

            <p className="text-xs text-secondary">
              Use at least 6 characters. For better security, mix letters, numbers, and symbols.
            </p>

            <div className="flex justify-end gap-2 border-t border-white/10 pt-4">
              <button
                type="button"
                disabled={saveMutation.isPending}
                onClick={() => reset()}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 text-sm font-medium text-white hover:bg-white/8 disabled:opacity-50"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={saveMutation.isPending}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
              >
                {saveMutation.isPending ? 'Updating…' : 'Update password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
