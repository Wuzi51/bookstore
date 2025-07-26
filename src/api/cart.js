import supabase from '@/lib/supabaseClient';

export const addToCart = async ({ userId, book }) => {
  const { error, data } = await supabase.rpc('add_to_cart', {
    p_user_id: userId,
    p_book_id: book.id,
    p_price: book.price,
  });
  if (error) throw error;
  return data;
};

export const fetchCartItems = (cartId) =>
  supabase.from('cart_items')
    .select('*, books(title, img, price, author, series)')
    .eq('cart_id', cartId);

export const removeCartItem = async (id) =>
  supabase.from('cart_items').delete().eq('id', id);

export const clearCartItems = async (ids) =>
  supabase.from('cart_items').delete().in('id', ids);