import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set) => ({
      token: "",
      setToken: (token) => set({ token }),
      language: "zh_TW",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'user',
    }
  )
);
