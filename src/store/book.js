import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addToCart, fetchCartItems, removeCartItem, clearCartItems } from '@/api/cart';
import { checkoutOrder } from '@/api/checkout';

export const useBookStore = create(
  persist(
    (set, get) => ({
      cartId: null,
      cart: [],
      books: [],
      favoriteBooks: [],
      orderList: [],
      setBooks: (books) => set({ books }),
      setOrderList: (orderList) => set({ orderList }),

      setCart: async (userId, bookId) => {
        const state = get();
        if (state.cart.some(item => item.book_id === bookId)) {
          return;
        }
        const book = state.books.find(b => b.id === bookId);
        if (!book) return;
        const cartId = await addToCart({ userId, book });
        const { data } = await fetchCartItems(cartId);
        set({ cartId, cart: data });
      },

      removeCart: async (idx) => {
        const cart = get().cart;
        const item = cart[idx];
        if (!item) return;
        await removeCartItem(item.id);
        const { data } = await fetchCartItems(get().cartId);
        set({ cart: data });
      },

      clearCart: async () => {
        const cart = get().cart;
        const ids = cart.map(item => item.id);
        if (!ids.length) return;
        await clearCartItems(ids);
        const { data } = await fetchCartItems(get().cartId);
        set({ cart: data });
      },

      checkout: async (userId) => {
        const state = get();
        if (!state.cartId || !state.cart.length) return null;
        const total = state.cart.reduce((sum, item) => sum + Number(item.price), 0);
        const orderId = await checkoutOrder({ userId, cartId: state.cartId, total });
        set({ cart: [], cartId: null });
        return orderId;
      },

      setFavoriteBooks: (id) => {
        const state = get();
        const favoriteBooks = Array.isArray(state.favoriteBooks) ? state.favoriteBooks : [];
        const isFavorite = favoriteBooks.some((item) => item.id === id);
        const book = state.books.find((item) => item.id === id);
        if (!book) return;
        if (isFavorite) {
          set({ favoriteBooks: favoriteBooks.filter((item) => item.id !== id) });
          return 'remove';
        } else {
          set({ favoriteBooks: [...favoriteBooks, book] });
          return 'add';
        }
      },

      getTotalPrice: () => get().cart.reduce((preVal, item) => preVal + Number(item.price), 0),
    }),
    { name: 'book' }
  )
);
