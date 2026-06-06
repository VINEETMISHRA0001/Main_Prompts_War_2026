import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { LoadingState } from '@/components/LoadingState'
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary'

const LandingPage = lazy(() => import('@/pages/LandingPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const MoodTrackerPage = lazy(() => import('@/pages/MoodTrackerPage'))
const StressTriggersPage = lazy(() => import('@/pages/StressTriggersPage'))
const ReflectionJournalPage = lazy(() => import('@/pages/ReflectionJournalPage'))
const WellnessToolkitPage = lazy(() => import('@/pages/WellnessToolkitPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingState />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<LandingPage />} />
            <Route element={<DashboardLayout />}>
              <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
              <Route path={ROUTES.MOOD} element={<MoodTrackerPage />} />
              <Route path={ROUTES.STRESS} element={<StressTriggersPage />} />
              <Route path={ROUTES.JOURNAL} element={<ReflectionJournalPage />} />
              <Route path={ROUTES.TOOLKIT} element={<WellnessToolkitPage />} />
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
