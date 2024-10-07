import { useNavigate } from "react-router-dom"
import "./index.css"

const Menu = () => {
  const navigate = useNavigate()
  const changePage = (url) => {
    navigate(url)
  }
  return (
    <nav>
      <ul className="nav mt-2 menu">
        <li className="nav-item">
          <button className="nav-link" onClick={() => changePage('/')}>
            全站分類
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={() => changePage('/')}>
            排行榜
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={() => changePage('/')}>
            為您推薦
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={() => changePage('/')}>
            全站活動
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Menu

