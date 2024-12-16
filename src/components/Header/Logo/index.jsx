import "./index.css"
import { useNavigate } from "react-router-dom"
import logo from "@/images/bookstore-high-resolution-logo-transparent.png"

const Logo = () => {
  const navigate = useNavigate()
  const changePage = (url) => {
    navigate(url)
  }
  return (
    <div onClick={() => changePage("/")} className="logo">
      <img 
      src={logo} 
      alt="logo" 
    />
    </div>
  )
}

export default Logo