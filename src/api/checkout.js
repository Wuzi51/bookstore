import supabase from '@/lib/supabaseClient';

export async function checkoutOrder(userId, getTotalPrice) {
  const { data: cart } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle();

  const { error: orderError } = await supabase
    .from('orders')
    .insert([{
      user_id: userId,
      cart_id: cart.id,
      total_price: getTotalPrice(),
      status: 'paid'
    }]);

  if (orderError) throw new Error('訂單建立失敗');

  const { error: updateError } = await supabase
    .from('carts')
    .update({ status: 'ordered' })
    .eq('id', cart.id);

  if (updateError) throw new Error('購物車狀態更新失敗');
};