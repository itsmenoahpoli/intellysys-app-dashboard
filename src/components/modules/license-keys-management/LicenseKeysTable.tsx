import type { LicenseKeyItem } from '@/services/license-keys.service'
import { ChevronDown, Copy, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { useMemo, useState } from 'react'
import StatusPill from './StatusPill'
import { formatLastLogin } from '../users-management/utils'
import { toast } from 'react-toastify'

export default function LicenseKeysTable({
  items,
  loading,
  onEdit,
  onDelete,
}: {
  items: LicenseKeyItem[]
  loading: boolean
  onEdit: (item: LicenseKeyItem) => void
  onDelete: (item: LicenseKeyItem) => void
}) {
  const [visibleKeyIds, setVisibleKeyIds] = useState<Set<number>>(new Set())
  const emptyLabel = useMemo(() => (loading ? 'Loading license keys...' : 'No license keys found.'), [loading])

  const copyToClipboard = (text: string) => {
    void navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!', { autoClose: 1500, position: 'bottom-right' })
  }

  const toggleVisibility = (id: number) => {
    setVisibleKeyIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const maskCode = (code: string) => {
    return code.replace(/[A-Z0-9]/g, '•')
  }

  return (
    <div className="overflow-hidden rounded-xl bg-surface">
      <div className="overflow-auto">
        <table className="min-w-[980px] w-full border-collapse text-left text-sm">
          <thead className="bg-transparent text-[11px] text-secondary">
            <tr>
              <th className="px-4 py-3 font-medium">
                <div className="inline-flex items-center gap-1">
                  LICENSE CODE <ChevronDown className="size-3 opacity-60" aria-hidden />
                </div>
              </th>
              <th className="px-4 py-3 font-medium">
                <div className="inline-flex items-center gap-1">
                  UUID <ChevronDown className="size-3 opacity-60" aria-hidden />
                </div>
              </th>
              <th className="px-4 py-3 font-medium">
                <div className="inline-flex items-center gap-1">
                  STATUS <ChevronDown className="size-3 opacity-60" aria-hidden />
                </div>
              </th>
              <th className="px-4 py-3 font-medium">
                <div className="inline-flex items-center gap-1">
                  EXPIRES AT <ChevronDown className="size-3 opacity-60" aria-hidden />
                </div>
              </th>
              <th className="px-4 py-3 font-medium">
                <div className="inline-flex items-center gap-1">
                  CREATED AT <ChevronDown className="size-3 opacity-60" aria-hidden />
                </div>
              </th>
              <th className="px-4 py-3 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-secondary">
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-white/5 hover:bg-white/[0.04] hover:backdrop-blur-sm"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-white bg-dark/30 px-2 py-1 rounded border border-white/5 select-all">
                        {visibleKeyIds.has(item.id) ? item.code : maskCode(item.code)}
                      </span>
                      <button
                        onClick={() => toggleVisibility(item.id)}
                        className="inline-flex size-7 items-center justify-center rounded text-secondary hover:bg-white/5 hover:text-white"
                        title={visibleKeyIds.has(item.id) ? "Hide Code" : "Show Code"}
                      >
                        {visibleKeyIds.has(item.id) ? (
                          <EyeOff className="size-3.5" aria-hidden />
                        ) : (
                          <Eye className="size-3.5" aria-hidden />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(item.code)}
                        className="inline-flex size-7 items-center justify-center rounded text-secondary hover:bg-white/5 hover:text-white"
                        title="Copy Code"
                      >
                        <Copy className="size-3" aria-hidden />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-secondary truncate max-w-[120px] select-all" title={item.uuid}>
                        {item.uuid}
                      </span>
                      <button
                        onClick={() => copyToClipboard(item.uuid)}
                        className="inline-flex size-7 items-center justify-center rounded text-secondary hover:bg-white/5 hover:text-white"
                        title="Copy UUID"
                      >
                        <Copy className="size-3" aria-hidden />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={item.status} />
                  </td>
                  <td className="px-4 py-3 text-secondary font-medium">
                    {formatLastLogin(item.expiresAt)}
                  </td>
                  <td className="px-4 py-3 text-secondary font-medium">
                    {formatLastLogin(item.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(item)}
                        className="inline-flex size-9 items-center justify-center rounded-lg text-secondary hover:bg-white/5 hover:text-white"
                        title="Edit Key"
                      >
                        <Edit className="size-4" aria-hidden />
                      </button>
                      <button
                        onClick={() => onDelete(item)}
                        className="inline-flex size-9 items-center justify-center rounded-lg text-danger hover:bg-danger/10"
                        title="Delete Key"
                      >
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </div>
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
