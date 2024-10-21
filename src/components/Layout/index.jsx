import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { clsx } from "clsx";
import { useUserStore } from "@/store/user";


const Layout = () => {
  const { darkMode } = useUserStore()
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