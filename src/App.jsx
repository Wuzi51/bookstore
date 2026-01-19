import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ConfigProvider, theme } from 'antd';
import { useUserStore } from './store/user';
import { useBookStore } from './store/book';
import { useEffect } from 'react';
import supabase from './lib/supabaseClient';

function App() {
  const { darkMode, setSession } = useUserStore();
  const { loadUserCart } = useBookStore();
  const { darkAlgorithm, defaultAlgorithm } = theme;

  useEffect(() => {
    // 檢查初始 session
    const checkInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setSession(session);
        loadUserCart(session.user.id);
      }
    };

    checkInitialSession();

    // 監聽 auth 狀態變化
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);

      // 用戶登入時載入購物車
      if (session?.user?.id) {
        loadUserCart(session.user.id);
      }
    });

    return () => subscription?.unsubscribe();
  }, [setSession, loadUserCart]);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  );
}

export default App;
