export function formatLastLogin(raw: string) {
  const d = new Date(raw)
  if (Number.isNaN(d.getTime())) return '-'
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  const a = parts[0]?.[0] ?? ''
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : ''
  return (a + b).toUpperCase()
}

export function toPct(n: number, total: number) {
  if (!total) return 0
  return Math.round((n / total) * 1000) / 10
}

export function titleCase(raw: string) {
  return raw
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
    .join(' ')
}

export function roleStyle(roleName: string) {
  const v = roleName.trim().toLowerCase()
  if (v === 'super admin')
    return { dot: 'bg-[#8b5cf6]', bg: 'bg-[#8b5cf6]/15', text: 'text-[#c4b5fd]' }
  if (v === 'it admin')
    return { dot: 'bg-[#3b82f6]', bg: 'bg-[#3b82f6]/15', text: 'text-[#93c5fd]' }
  if (v === 'manager')
    return { dot: 'bg-[#f59e0b]', bg: 'bg-[#f59e0b]/15', text: 'text-[#fcd34d]' }
  if (v === 'employee')
    return { dot: 'bg-[#06b6d4]', bg: 'bg-[#06b6d4]/15', text: 'text-[#67e8f9]' }
  return { dot: 'bg-white/50', bg: 'bg-white/10', text: 'text-white' }
}

export function avatarBg(name: string) {
  const palette = [
    'bg-[#2563eb]/25 text-[#93c5fd] ring-[#2563eb]/25',
    'bg-[#8b5cf6]/25 text-[#c4b5fd] ring-[#8b5cf6]/25',
    'bg-[#f59e0b]/20 text-[#fcd34d] ring-[#f59e0b]/25',
    'bg-[#10b981]/20 text-[#6ee7b7] ring-[#10b981]/25',
    'bg-[#06b6d4]/20 text-[#67e8f9] ring-[#06b6d4]/25',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  return palette[hash % palette.length]!
}

export function extractErrorMessage(
  err: unknown,
  fallback: string,
): string {
  // We avoid importing axios types here; just detect the common Axios shape.
  if (err && typeof err === 'object') {
    const maybeAxios = err as {
      response?: { data?: unknown }
      message?: unknown
    }

    const data = maybeAxios.response?.data
    if (data && typeof data === 'object' && 'message' in data) {
      const msg = (data as { message?: unknown }).message
      if (typeof msg === 'string' && msg.trim()) return msg
    }

    const m = maybeAxios.message
    if (typeof m === 'string' && m.trim()) return m
  }

  return fallback
}

