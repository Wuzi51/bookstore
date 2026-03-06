import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addToCart, fetchCartItems, removeCartItem, clearCartItems } from '@/api/cart';
import { checkoutOrder } from '@/api/checkout';
import { orderApi } from '@/api/order';
import { bookApi } from '@/api/book';
import supabase from '@/lib/supabaseClient';

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

      // async-parallel: addToCart 回傳 cartId 後立即取得購物車項目
      setCart: async (userId, bookId) => {
        const state = get();
        if (state.cart.some((item) => item.book_id === bookId)) {
          return false;
        }
        const book = state.books.find((b) => b.id === bookId);
        if (!book) return false;
        const cartId = await addToCart({ userId, book });
        set({ cartId });
        const { data } = await fetchCartItems(cartId);
        set({ cart: Array.isArray(data) ? data : [] });
        return true;
      },

      removeCart: async (idx) => {
        const cart = get().cart;
        const item = cart[idx];
        if (!item) return;
        await removeCartItem(item.id);
        const { data } = await fetchCartItems(get().cartId);
        set({ cart: Array.isArray(data) ? data : [] });
      },

      clearCart: async () => {
        const cart = get().cart;
        const ids = cart.map((item) => item.id);
        if (!ids.length) return;
        await clearCartItems(ids);
        const { data } = await fetchCartItems(get().cartId);
        set({ cart: Array.isArray(data) ? data : [] });
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
        if (isFavorite) {
          set({ favoriteBooks: favoriteBooks.filter((item) => item.id !== id) });
          return 'remove';
        }
        const book = state.books.find((item) => item.id === id);
        if (!book) return;
        set({ favoriteBooks: [...favoriteBooks, book] });
        return 'add';
      },

      getTotalPrice: () => get().cart.reduce((preVal, item) => preVal + Number(item.price), 0),

      clearLocalCart: () => set({ cart: [], cartId: null }),

      addComment: async (bookId, name, content) => {
        const newComment = await bookApi.addComment({ bookId, name, content });
        set((state) => ({
          books: state.books.map((b) =>
            b.id === bookId ? { ...b, comments: [...b.comments, newComment] } : b
          ),
        }));
        return newComment;
      },

      fetchOrderList: async (userId) => {
        try {
          const orders = await orderApi.getUserOrders(userId);
          set({ orderList: orders });
        } catch (error) {
          console.error('Failed to fetch orders:', error);
          set({ orderList: [] });
        }
      },

      // async-defer-await: 提早設定 cartId，減少連續 await 阻塞
      loadUserCart: async (userId) => {
        try {
          const { data: cartData } = await supabase
            .from('carts')
            .select('id')
            .eq('user_id', userId)
            .eq('status', 'active')
            .maybeSingle();

          if (cartData) {
            set({ cartId: cartData.id });
            const { data: items, error } = await fetchCartItems(cartData.id);
            if (!error) {
              set({ cart: Array.isArray(items) ? items : [] });
            }
          } else {
            set({ cart: [], cartId: null });
          }
        } catch (error) {
          console.error('Failed to load user cart:', error);
        }
      },
    }),
    { name: 'book' }
  )
);
