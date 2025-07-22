import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      language: 'zh_TW',
      setLanguage: (language) => set({ language }),
      darkMode: false,
      setDarkMode: (mode) => set({ darkMode: mode }),
    }),
    {
      name: 'user',
    }
  )
);
