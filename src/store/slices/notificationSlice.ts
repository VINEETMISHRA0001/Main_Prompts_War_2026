import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { InAppNotification, SageMessage } from '@/types'

interface NotificationSlice {
  notifications: InAppNotification[]
  messages: SageMessage[]
  voiceModalOpen: boolean
  voiceModalSource: 'scheduled' | 'manual'
  crisisModalOpen: boolean
  lastScheduledSlot: string | null
  missedCheckIns: number
  pushNotification: (n: Omit<InAppNotification, 'id' | 'createdAt' | 'read'>) => void
  markRead: (id: string) => void
  dismissAll: () => void
  openVoiceModal: (source?: 'scheduled' | 'manual') => void
  closeVoiceModal: () => void
  openCrisisModal: () => void
  closeCrisisModal: () => void
  addSageMessage: (msg: SageMessage) => void
  clearSageThread: () => void
  setLastScheduledSlot: (slot: string) => void
  incrementMissed: () => void
}

export const useNotificationStore = create<NotificationSlice>()(
  persist(
    (set, get) => ({
      notifications: [],
      messages: [],
      voiceModalOpen: false,
      voiceModalSource: 'manual',
      crisisModalOpen: false,
      lastScheduledSlot: null,
      missedCheckIns: 0,
      pushNotification: (n) => {
        set({
          notifications: [
            {
              ...n,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              read: false,
            },
            ...get().notifications,
          ].slice(0, 30),
        })
      },
      markRead: (id) => {
        set({
          notifications: get().notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        })
      },
      dismissAll: () => set({ notifications: [] }),
      openVoiceModal: (source = 'manual') =>
        set({ voiceModalOpen: true, voiceModalSource: source }),
      closeVoiceModal: () => set({ voiceModalOpen: false }),
      openCrisisModal: () => set({ crisisModalOpen: true }),
      closeCrisisModal: () => set({ crisisModalOpen: false }),
      addSageMessage: (msg) =>
        set({ messages: [...get().messages, msg].slice(-40) }),
      clearSageThread: () => set({ messages: [] }),
      setLastScheduledSlot: (slot) => set({ lastScheduledSlot: slot }),
      incrementMissed: () => set({ missedCheckIns: get().missedCheckIns + 1 }),
    }),
    {
      name: 'mindflow-notifications',
      partialize: (s) => ({
        messages: s.messages,
        lastScheduledSlot: s.lastScheduledSlot,
        missedCheckIns: s.missedCheckIns,
      }),
    },
  ),
)
