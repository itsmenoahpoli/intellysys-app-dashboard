import type { CreateLicenseKeyPayload, UpdateLicenseKeyPayload, LicenseKeyItem } from '@/services/license-keys.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, Sparkles } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Field from '../users-management/Field'

const licenseKeySchema = z.object({
  code: z.string().optional().refine(val => !val || val.length >= 4, {
    message: 'Code must be at least 4 characters if supplied'
  }),
  expiresAt: z.string().min(1, 'Expiration date is required'),
  status: z.enum(['unused', 'used', 'revoked']).optional()
})

type LicenseKeyFormValues = z.infer<typeof licenseKeySchema>

function generateClientLicenseCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segment = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return Array.from({ length: 8 }, segment).join("-");
}

const getOneYearFromNow = () => {
  const d = new Date()
  d.setFullYear(d.getFullYear() + 1)
  return d.toISOString().split('T')[0]!
}

export default function LicenseKeyModal({
  open,
  mode,
  item,
  busy,
  onClose,
  onCreate,
  onUpdate,
}: {
  open: boolean
  mode: 'create' | 'edit'
  item: LicenseKeyItem | null
  busy: boolean
  onClose: () => void
  onCreate: (payload: CreateLicenseKeyPayload) => void
  onUpdate: (payload: UpdateLicenseKeyPayload) => void
}) {
  const defaultDate = item?.expiresAt ? item.expiresAt.split('T')[0]! : getOneYearFromNow()
  const defaultStatus = item?.status ?? 'unused'

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LicenseKeyFormValues>({
    resolver: zodResolver(licenseKeySchema),
    defaultValues: {
      code: item?.code ?? '',
      expiresAt: defaultDate,
      status: defaultStatus,
    },
  })

  useEffect(() => {
    if (!open) return
    reset({
      code: item?.code ?? '',
      expiresAt: item?.expiresAt ? item.expiresAt.split('T')[0]! : getOneYearFromNow(),
      status: item?.status ?? 'unused',
    })
  }, [open, item, reset])

  if (!open) return null

  const handleGenerate = () => {
    setValue('code', generateClientLicenseCode())
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-surface p-5 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-white">
              {mode === 'create' ? 'Add License Key' : 'Edit License Key'}
            </div>
            <div className="mt-1 text-xs text-secondary">
              {mode === 'create' ? 'Issue a new license key.' : 'Update license key details and status.'}
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
            const isoExpiry = new Date(values.expiresAt).toISOString()

            if (mode === 'create') {
              const payload: CreateLicenseKeyPayload = {
                code: values.code || undefined,
                expiresAt: isoExpiry,
              }
              onCreate(payload)
              return
            }

            const payload: UpdateLicenseKeyPayload = {
              code: values.code || undefined,
              status: values.status,
              expiresAt: isoExpiry,
            }
            onUpdate(payload)
          })}
        >
          <div className="flex flex-col gap-2">
            <Field
              label="License Code"
              error={errors.code?.message}
              input={
                <div className="flex gap-2">
                  <input
                    className="h-10 flex-1 rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-white placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono tracking-wider"
                    placeholder="Leave blank to auto-generate"
                    {...register('code')}
                  />
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 text-sm font-medium text-white hover:bg-white/10 transition-colors shrink-0"
                    title="Auto-Generate Key Code"
                  >
                    <Sparkles className="size-4 text-accent" />
                    <span className="hidden sm:inline">Generate</span>
                  </button>
                </div>
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="Expiration Date"
              error={errors.expiresAt?.message}
              input={
                <input
                  type="date"
                  className="h-10 w-full rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  {...register('expiresAt')}
                />
              }
            />

            {mode === 'edit' && (
              <Field
                label="Status"
                error={errors.status?.message}
                input={
                  <select
                    className="h-10 w-full rounded-lg border border-white/10 bg-dark/40 px-3 text-sm text-white focus:border-primary focus:outline-none"
                    {...register('status')}
                  >
                    <option value="unused">Unused</option>
                    <option value="used">Used</option>
                    <option value="revoked">Revoked</option>
                  </select>
                }
              />
            )}
          </div>

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
              disabled={busy}
            >
              {busy ? 'Saving...' : mode === 'create' ? 'Create' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
