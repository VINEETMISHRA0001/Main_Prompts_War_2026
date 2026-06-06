import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserPreferences } from '@/types'
import type { Achievement } from '@/types'
import { defaultPreferences } from '@/data/mockProfile'
import { mockAchievements } from '@/data/mockProfile'
import { mockProfile } from '@/data/mockDashboard'
import {
  computeStreak,
  evaluateAchievements,
  findNewlyUnlocked,
  getLevelFromXp,
  getTodayKey,
  hasCheckedInToday,
} from '@/utils/gamification'

export interface DailyQuests {
  date: string
  mood: boolean
  wellness: boolean
  journal: boolean
}

interface SettingsSlice {
  preferences: UserPreferences
  updatePreferences: (prefs: Partial<UserPreferences>) => void
}

interface DashboardSlice extends SettingsSlice {
  profile: typeof mockProfile
  achievements: Achievement[]
  xp: number
  level: number
  lastCheckInDate: string | null
  dailyQuests: DailyQuests
  breathingCompletions: number
  toastAchievement: Achievement | null
  recordMoodCheckIn: () => void
  completeWellnessQuest: () => void
  completeJournalQuest: () => void
  completeBreathing: () => void
  syncAchievements: (journalCount: number, uniqueTriggerCategories: number) => void
  clearToast: () => void
  addXp: (amount: number) => void
}

const defaultQuests = (): DailyQuests => ({
  date: getTodayKey(),
  mood: false,
  wellness: false,
  journal: false,
})

function ensureTodayQuests(quests: DailyQuests): DailyQuests {
  return quests.date === getTodayKey() ? quests : defaultQuests()
}

export const useDashboardStore = create<DashboardSlice>()(
  persist(
    (set, get) => ({
      profile: mockProfile,
      achievements: mockAchievements.map((a) => ({ ...a, unlocked: false })),
      preferences: defaultPreferences,
      xp: 0,
      level: 1,
      lastCheckInDate: null,
      dailyQuests: defaultQuests(),
      breathingCompletions: 0,
      toastAchievement: null,

      updatePreferences: (prefs) => {
        set({ preferences: { ...get().preferences, ...prefs } })
      },

      addXp: (amount) => {
        const xp = get().xp + amount
        set({ xp, level: getLevelFromXp(xp) })
      },

      recordMoodCheckIn: () => {
        const state = get()
        const today = getTodayKey()
        const quests = ensureTodayQuests(state.dailyQuests)
        const alreadyToday = hasCheckedInToday(state.lastCheckInDate)
        const streak = alreadyToday
          ? state.profile.streak
          : computeStreak(state.lastCheckInDate, state.profile.streak)

        let xp = state.xp
        if (!quests.mood) xp += 25

        set({
          xp,
          level: getLevelFromXp(xp),
          lastCheckInDate: today,
          dailyQuests: { ...quests, mood: true },
          profile: {
            ...state.profile,
            streak,
            totalCheckIns: alreadyToday
              ? state.profile.totalCheckIns
              : state.profile.totalCheckIns + 1,
          },
        })
      },

      completeWellnessQuest: () => {
        const state = get()
        const quests = ensureTodayQuests(state.dailyQuests)
        if (quests.wellness) return
        const xp = state.xp + 25
        set({
          xp,
          level: getLevelFromXp(xp),
          dailyQuests: { ...quests, wellness: true },
        })
      },

      completeJournalQuest: () => {
        const state = get()
        const quests = ensureTodayQuests(state.dailyQuests)
        if (quests.journal) return
        const xp = state.xp + 25
        set({
          xp,
          level: getLevelFromXp(xp),
          dailyQuests: { ...quests, journal: true },
        })
      },

      completeBreathing: () => {
        const state = get()
        set({ breathingCompletions: state.breathingCompletions + 1 })
        get().completeWellnessQuest()
        get().syncAchievements(0, 0)
      },

      syncAchievements: (journalCount, uniqueTriggerCategories) => {
        const state = get()
        const before = state.achievements
        const after = evaluateAchievements({
          achievements: before,
          totalCheckIns: state.profile.totalCheckIns,
          streak: state.profile.streak,
          journalCount,
          breathingCompletions: state.breathingCompletions,
          uniqueTriggerCategories,
        })
        const newly = findNewlyUnlocked(before, after)
        set({
          achievements: after,
          toastAchievement: newly ?? state.toastAchievement,
        })
      },

      clearToast: () => set({ toastAchievement: null }),
    }),
    { name: 'mindflow-profile' },
  ),
)

/** @deprecated Use useDashboardStore */
export const useProfileStore = useDashboardStore

/** Settings preferences live in dashboard slice for a single source of truth */
export function useSettingsStore() {
  const preferences = useDashboardStore((s) => s.preferences)
  const updatePreferences = useDashboardStore((s) => s.updatePreferences)
  return { preferences, updatePreferences }
}

export function useDailyQuests() {
  const dailyQuests = useDashboardStore((s) => s.dailyQuests)
  const ensured = ensureTodayQuests(dailyQuests)
  const completed = [ensured.mood, ensured.wellness, ensured.journal].filter(Boolean).length
  return { quests: ensured, completed, total: 3 }
}
