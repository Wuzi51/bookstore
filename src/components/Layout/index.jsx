import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { useEffect } from "react";
import { useUserStore } from "@/store/user";


const Layout = () => {
  const location = useLocation();
  
  const isDark = useUserStore((state) => state.darkMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', isDark ? 'dark' : 'light')
  }, [isDark]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className=" bg-white text-gray-800 dark:bg-canvas dark:text-primary">
      <Header/>
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet/>
        </main>
      <Footer/>
    </div>
  )
}

export default Layout;