import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { message } from "antd";

export const useBookStore = create(
  persist(
    (set) => ({
      favoriteBooks: [],
      setFavoriteBooks: (id) => {set((state) => {
        const isFavorite = state.favoriteBooks.some((item) => item.id === id)
        const book = state.books.find((item) => item.id === id)
        if (isFavorite) {
          //移除收藏
          message.success('移除收藏')
          return {
            favoriteBooks: state.favoriteBooks.filter((item) => {
              item.id !== id
            })
          }
        } else {
          //加入收藏
          message.success('加入收藏')
          return {
            favoriteBooks: [...state.favoriteBooks, book],
          }
        }
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
