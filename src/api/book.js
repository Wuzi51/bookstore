import supabase from '@/lib/supabaseClient';

export const bookApi = {
  getBooks: async () => {
    const { data, error } = await supabase
      .from('books')
      .select('*, comments(*)')
      // 按照id順序排序
      .order('id', { ascending: true });

    if (error) {
      throw error;
    }
    return { data };
  },

  addComment: async ({ bookId, name, content }) => {
    const { data, error } = await supabase
      .from('comments')
      .insert({ book_id: bookId, name, content, created_at: new Date().toISOString() })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
