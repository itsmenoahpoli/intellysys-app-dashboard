import { env } from '@/config/env.config'
import { Navigate, Route, Routes } from 'react-router-dom'
import MaintenancePage from './pages/MaintenancePage'
import SignInPage from './pages/SignInPage'

export default function App() {
  if (env.maintenanceMode) {
    return <MaintenancePage />
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
      <Route path="/signin" element={<SignInPage />} />
    </Routes>
  )
}
