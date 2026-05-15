import type { ReactNode } from 'react'

export default function Field({
  label,
  input,
  error,
}: {
  label: string
  input: ReactNode
  error?: string
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-white">{label}</label>
      {input}
      {error ? (
        <div className="mt-1 text-xs text-danger" role="alert">
          {error}
        </div>
      ) : null}
    </div>
  )
}

