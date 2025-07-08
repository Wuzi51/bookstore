import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useBookStore = create(
  persist(
    (set, get) => ({
      orderList: [],
      setOrderList: (orderList) => set({ orderList }),
      cart: [],
      setCart: (id, qty) => set((state) => {
        const book = state.books.find((item) => item.id === id)
        const newCart = [...state.cart, { ...book, qty }]
        return { cart: newCart }
      }),
      //定義動態狀態時使用get
      getTotalPrice: () => get().cart.reduce((preVal, item) => preVal + item.price, 0),
      favoriteBooks: [],
      removeCart: (idx) => set((state) => {
        const newCart = [...state.cart]
        newCart.splice(idx, 1)
        return { cart: newCart }
      }),
      clearCart: () => set(() => {
        return { cart: [] }
      }),
      setFavoriteBooks: (id) => {
        const state = get();

        const favoriteBooks = Array.isArray(state.favoriteBooks) ? state.favoriteBooks : [];
        const isFavorite = favoriteBooks.some((item) => item.id === id);
        const book = state.books.find((item) => item.id === id);

        if (!book) return;

        if (isFavorite) {
          set({
            favoriteBooks: favoriteBooks.filter((item) => item.id !== id),
          });
          return "remove";
        } else {
          set({
            favoriteBooks: [...favoriteBooks, book],
          });
          return "add";
        }
      },
      books: [],
      setBooks: (books) => set({ books }),
    }),
    {
      name: 'book',
    }
  )
);
