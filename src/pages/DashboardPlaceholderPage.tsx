import DashboardLayout from '@/components/layout/dashboard/DashboardLayout'
import UnderDevelopmentBanner from '@/components/common/UnderDevelopmentBanner'
import { Helmet } from 'react-helmet-async'

export default function DashboardPlaceholderPage({ title }: { title: string }) {
  return (
    <DashboardLayout>
      <Helmet>
        <title>{title} · WAP INTELLYSYS</title>
      </Helmet>

      <div className="w-full">
        <UnderDevelopmentBanner />

        <div className="rounded-xl border border-white/15 bg-white/5 p-6">
          <h1 className="text-xl font-semibold tracking-tight text-white">{title}</h1>
          <p className="mt-2 text-sm text-secondary">
            This module is coming soon.
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}

