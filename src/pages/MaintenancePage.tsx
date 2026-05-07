import { Construction } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function MaintenancePage() {
  return (
    <>
      <Helmet>
        <title>Maintenance · WAP INTELLYSIS</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-dark px-6 text-center">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(37,99,235,0.35),transparent_55%),radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(0,212,255,0.12),transparent_50%),radial-gradient(ellipse_70%_45%_at_50%_100%,rgba(37,99,235,0.08),transparent_60%)]"
          aria-hidden
        />
        <div className="relative z-[1] flex flex-col items-center">
          <Construction className="mb-8 size-24 text-warning md:size-28" aria-hidden />
          <h1 className="text-2xl font-semibold text-white md:text-3xl">
            Under maintenance
          </h1>
          <p className="mt-3 max-w-md text-secondary">
            Developers doing mighty work, we&apos;ll be back in a bit.
          </p>
        </div>
      </div>
    </>
  )
}
