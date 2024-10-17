import "./index.css"
import { useNavigate } from "react-router-dom"

const Logo = () => {
  const navigate = useNavigate()
  const changePage = (url) => {
    navigate(url)
  }
  return (
    <div onClick={() => changePage("/")} className="logo">
      <img 
      src="/src/images/bookstore-high-resolution-logo-transparent.png" 
      alt="logo" 
    />
    </div>
  )
}

export default Logo