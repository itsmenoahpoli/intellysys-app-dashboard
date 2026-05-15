export default function ProgressRow({
  label,
  value,
  pct,
  barClassName,
}: {
  label: string
  value: number
  pct: number
  barClassName: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <div className="text-secondary">{label}</div>
        <div className="text-white">
          {value} <span className="text-secondary">{pct}%</span>
        </div>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-dark/40 ring-1 ring-white/10">
        <div className={['h-full rounded-full', barClassName].join(' ')} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

