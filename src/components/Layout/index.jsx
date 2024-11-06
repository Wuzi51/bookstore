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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [location]);

  return (
    <div className={clsx({ darkMode }, "flex flex-col min-h-screen")}>
      <Header/>
        <div className="flex-1">
          <Outlet/>
        </div>
      <Footer/>
    </div>
  )
}

export default Layout