import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { message } from "antd";

export const useBookStore = create(
  persist(
    (set, get) => ({
      cart: [],
      setCart: (id, qty) => set((state) => {
        const book = state.books.find((item) => item.id === id)
        const newCart = [...state.cart, { ...book, qty }]
        message.success('已加入購物車')
        return { cart: newCart }
      }),
      //定義動態狀態時使用get
      getTotalPrice: () => get().cart.reduce((preVal, item) => preVal + item.price * item.qty, 0),
      favoriteBooks: [],
      removeCart: (idx) => set((state) => {
        const newCart = [...state.cart]
        newCart.splice(idx, 1)
        return { cart: newCart } 
      }),
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
    }),
    {
      name: 'book',
    }
  )
);
