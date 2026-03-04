import supabase from '@/lib/supabaseClient';

export async function checkoutOrder({ userId, cartId, total }) {
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([
      {
        user_id: userId,
        cart_id: cartId,
        total_price: total,
        status: 'paid',
      },
    ])
    .select()
    .single();

  if (orderError) throw new Error('訂單建立失敗');

  const { error: updateError } = await supabase
    .from('carts')
    .update({ status: 'ordered' })
    .eq('id', cartId);

  if (updateError) {
    await supabase.from('orders').delete().eq('id', orderData.id);
    throw new Error('購物車狀態更新失敗');
  }

  return orderData.id;
}
