import type { ReactNode } from 'react'
import AuthFooter from './AuthFooter'

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-svh w-full flex-col bg-dark">
      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2">
        <aside
          className="relative hidden flex-col items-center justify-center overflow-hidden bg-sidebar md:flex"
          aria-hidden
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(37,99,235,0.35),transparent_55%),radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(0,212,255,0.12),transparent_50%)]" />
          <div className="relative z-[1] max-w-md px-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              WAP INTELLYSIS
            </p>
            <p className="mt-6 text-balance text-lg leading-relaxed text-secondary">
              Secure access to your workspace.
            </p>
          </div>
        </aside>

        <main className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-20">
          <div className="mx-auto w-full max-w-md">{children}</div>
        </main>
      </div>

      <AuthFooter />
    </div>
  )
}
