import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserPreferences } from '@/types'
import { defaultPreferences, mockAchievements } from '@/data/mockProfile'
import { mockProfile } from '@/data/mockDashboard'

interface ProfileState {
  profile: typeof mockProfile
  achievements: typeof mockAchievements
  preferences: UserPreferences
  updatePreferences: (prefs: Partial<UserPreferences>) => void
  incrementCheckIn: () => void
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: mockProfile,
      achievements: mockAchievements,
      preferences: defaultPreferences,
      updatePreferences: (prefs) => {
        set({ preferences: { ...get().preferences, ...prefs } })
      },
      incrementCheckIn: () => {
        const { profile } = get()
        set({
          profile: {
            ...profile,
            totalCheckIns: profile.totalCheckIns + 1,
            streak: profile.streak + 1,
          },
        })
      },
    }),
    { name: 'mindflow-profile' },
  ),
)
