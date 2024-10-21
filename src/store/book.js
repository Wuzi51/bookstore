import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useBookStore = create(
  persist(
    (set) => ({
      favoriteBooks: [],
      setFavoriteBooks: (books) => {set((state) => {
        console.log(state)
        return { favoriteBooks: books }
      })
    },
      books: [],
      setBooks: (books) => set({ books }),
      carts: [],
      setCarts: (books) => set({ cart: books }),
    }),
    {
      name: 'book',
    }
  )
);
