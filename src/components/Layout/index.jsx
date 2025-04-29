import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { clsx } from "clsx";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";


const Layout = () => {
  const location = useLocation();
  const { darkMode } = useUserStore();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className={clsx({ darkMode }, " bg-white text-gray-800")}>
      <Header/>
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet/>
        </main>
      <Footer/>
    </div>
  )
}

export default Layout;