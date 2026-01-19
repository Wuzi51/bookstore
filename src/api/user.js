import supabase from '@/lib/supabaseClient';

export const userApi = {
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
  async signup(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  },
  async updateProfile(profileData) {
    const { data, error } = await supabase.auth.updateUser({
      data: profileData,
    });

    if (error) {
      throw new Error(error.message);
    }
    return data?.user;
  },
  async updatePassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error(error.message);
    }
    return data?.user;
  },
  async resetPassword(email) {
    const redirectTo =
      typeof window !== 'undefined' ? `${window.location.origin}/reset-password` : undefined;
    const options = redirectTo ? { redirectTo } : undefined;

    const { error } = await supabase.auth.resetPasswordForEmail(email, options);

    if (error) {
      throw new Error(error.message);
    }
  },
};
