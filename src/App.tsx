import { env } from '@/config/env.config'
import type { ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import MaintenancePage from './pages/MaintenancePage'
import SignInPage from './pages/SignInPage'
import DashboardPlaceholderPage from './pages/DashboardPlaceholderPage'
import AlertsPage from './pages/AlertsPage'
import HelpSupportPage from './pages/HelpSupportPage'
import LogsReportsPage from './pages/LogsReportsPage'
import MonitoringPage from './pages/MonitoringPage'
import SettingsPage from './pages/SettingsPage'
import SubscriptionsPage from './pages/SubscriptionsPage'
import UsersPage from './pages/UsersPage'
import { useAuthStore } from './stores/auth.store'

export default function App() {
  const token = useAuthStore((s) => s.loginResponse?.token)
  const hasHydrated = useAuthStore((s) => s.hasHydrated)

  if (env.maintenanceMode) {
    return <MaintenancePage />
  }

  if (!hasHydrated) {
    return null
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route
        path="/signin"
        element={token ? <Navigate to="/dashboard" replace /> : <SignInPage />}
      />
      <Route
        path="/dashboard/users"
        element={
          <RequireAuth>
            <UsersPage />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPlaceholderPage title="Dashboard" />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/devices"
        element={
          <RequireAuth>
            <DashboardPlaceholderPage title="Devices" />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/remove-access"
        element={
          <RequireAuth>
            <DashboardPlaceholderPage title="Remove Access (SSH)" />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/packet-analyzer"
        element={
          <RequireAuth>
            <DashboardPlaceholderPage title="Packet Analyzer" />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/monitoring"
        element={
          <RequireAuth>
            <MonitoringPage />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/alerts"
        element={
          <RequireAuth>
            <AlertsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/logs-reports"
        element={
          <RequireAuth>
            <LogsReportsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <RequireAuth>
            <SettingsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/subscriptions"
        element={
          <RequireAuth>
            <SubscriptionsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/help-support"
        element={
          <RequireAuth>
            <HelpSupportPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard/users" replace />} />
    </Routes>
  )
}

function RequireAuth({ children }: { children: ReactNode }) {
  const token = useAuthStore((s) => s.loginResponse?.token)
  const hasHydrated = useAuthStore((s) => s.hasHydrated)
  const location = useLocation()
  if (!hasHydrated) return null
  if (!token) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />
  }
  return children
}
