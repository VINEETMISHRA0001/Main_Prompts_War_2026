import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Skeleton } from '@/components/ui/skeleton'

const LandingPage = lazy(() => import('@/pages/LandingPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const MoodTrackerPage = lazy(() => import('@/pages/MoodTrackerPage'))
const StressTriggersPage = lazy(() => import('@/pages/StressTriggersPage'))
const ReflectionJournalPage = lazy(() => import('@/pages/ReflectionJournalPage'))
const WellnessToolkitPage = lazy(() => import('@/pages/WellnessToolkitPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))

function PageLoader() {
  return (
    <div className="space-y-4 p-4" role="status" aria-label="Loading page">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-72" />
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
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
  )
}
