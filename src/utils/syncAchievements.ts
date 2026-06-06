import { useDashboardStore } from '@/store/slices/dashboardSlice'
import { useJournalStore } from '@/store/slices/journalSlice'
import { useWellnessStore } from '@/store/slices/wellnessSlice'

/** Sync achievement unlock state from journal and stress trigger progress. */
export function syncAchievementsFromStores(): void {
  const journalCount = useJournalStore.getState().entries.length
  const uniqueTriggers = new Set(
    useWellnessStore
      .getState()
      .triggers.filter((t) => t.count > 0)
      .map((t) => t.category),
  ).size
  useDashboardStore.getState().syncAchievements(journalCount, uniqueTriggers)
}
