import { useMemo } from 'react'

export type DonutSegment = { name: string; count: number; color: string }

export default function DonutChart({ segments, total }: { segments: DonutSegment[]; total: number }) {
  const bg = useMemo(() => {
    const { stops } = segments.reduce(
      (acc, s) => {
        const pct = total ? (s.count / total) * 100 : 0
        const from = acc.start
        const to = acc.start + pct
        return {
          start: to,
          stops: [...acc.stops, `${s.color} ${from}% ${to}%`],
        }
      },
      { start: 0, stops: [] as string[] },
    )
    return `conic-gradient(${stops.join(', ')})`
  }, [segments, total])

  return (
    <div className="relative grid place-items-center">
      <div className="size-[160px] rounded-full" style={{ background: bg }} aria-hidden />
      <div className="absolute grid size-[110px] place-items-center rounded-full bg-[#0b1220] text-center">
        <div className="text-2xl font-semibold text-white">{total}</div>
        <div className="text-xs text-secondary">Total</div>
      </div>
    </div>
  )
}

