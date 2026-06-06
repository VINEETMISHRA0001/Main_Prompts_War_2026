import { Outlet } from 'react-router-dom'
import { AppHeader, AppSidebar, SkipLink } from '@/components/layout/AppLayout'
import { AchievementToast } from '@/components/dashboard/AchievementToast'

export function DashboardLayout() {
  return (
    <>
      <SkipLink />
      <AchievementToast />
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <AppHeader />
          <main id="main-content" className="flex-1 p-4 md:p-6 lg:p-8" tabIndex={-1}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
