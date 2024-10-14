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
      src="https://cdn.readmoo.com/images/store/logo_header.svg" 
      alt="logo" 
    />
    </div>
  )
}

export default Logo