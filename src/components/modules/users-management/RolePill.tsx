import { roleStyle, titleCase } from './utils'

export default function RolePill({ name }: { name: string }) {
  const palette = roleStyle(name)
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
        palette.bg,
        palette.text,
      ].join(' ')}
    >
      {titleCase(name)}
    </span>
  )
}

