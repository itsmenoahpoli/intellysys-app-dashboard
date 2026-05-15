export default function StatusPill({ status }: { status: 'Active' | 'Inactive' }) {
  const isActive = status === 'Active'
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
        isActive ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger',
      ].join(' ')}
    >
      {status}
    </span>
  )
}

