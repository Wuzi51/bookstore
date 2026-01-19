import supabase from '@/lib/supabaseClient';

export const orderApi = {
  async getUserOrders(userId) {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        cart:carts(
          cart_items(
            book:books(
              id,
              title,
              price,
              img
            )
          )
        )
      `
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    // 轉換資料格式以符合前端需求
    const formattedOrders = data.map((order) => ({
      id: order.id,
      created_at: order.created_at,
      total: order.total_price,
      status: order.status,
      items:
        order.cart?.cart_items?.map((item) => ({
          id: item.book.id,
          title: item.book.title,
          price: item.book.price,
          img: item.book.img,
        })) || [],
    }));

    return formattedOrders;
  },

  async getOrderById(orderId, userId) {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        cart:carts(
          cart_items(
            book:books(
              id,
              title,
              price,
              img,
              author,
              category
            )
          )
        )
      `
      )
      .eq('id', orderId)
      .eq('user_id', userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return {
      id: data.id,
      created_at: data.created_at,
      total: data.total_price,
      status: data.status,
      items:
        data.cart?.cart_items?.map((item) => ({
          id: item.book.id,
          title: item.book.title,
          price: item.book.price,
          img: item.book.img,
          author: item.book.author,
          category: item.book.category,
        })) || [],
    };
  },
};
