import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { LoadingState } from '@/components/LoadingState'
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary'

const LandingPage = lazy(() => import('@/pages/LandingPage'))
const DesktopOSPage = lazy(() => import('@/pages/DesktopOSPage'))

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingState />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<LandingPage />} />
            <Route path="/desktop" element={<DesktopOSPage />} />
            <Route path="/dashboard" element={<Navigate to="/desktop" replace />} />
            <Route path="/mood" element={<Navigate to="/desktop?app=mood" replace />} />
            <Route path="/stress" element={<Navigate to="/desktop?app=stress" replace />} />
            <Route path="/journal" element={<Navigate to="/desktop?app=journal" replace />} />
            <Route path="/toolkit" element={<Navigate to="/desktop?app=toolkit" replace />} />
            <Route path="/profile" element={<Navigate to="/desktop?app=profile" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
