export { useMoodStore, getAverageMoodScore } from './slices/moodSlice'
export { useJournalStore, getWeeklyReflectionCount } from './slices/journalSlice'
export {
  useWellnessStore,
  useStressStore,
  getTopStressTrigger,
} from './slices/wellnessSlice'
export {
  useDashboardStore,
  useProfileStore,
  useDailyQuests,
  useSettingsStore,
} from './slices/dashboardSlice'
export type { DailyQuests } from './slices/dashboardSlice'
export { useDesktopStore } from './slices/desktopSlice'
