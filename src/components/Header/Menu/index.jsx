import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "./index.css"

const Menu = () => {
  const navigate = useNavigate()
  const changePage = (url) => {
    navigate(url)
  }
  const { t } = useTranslation()
  return (
    <nav>
      <ul className="nav mt-2 menu">
        <li className="nav-item">
          <button className="nav-link" onClick={() => changePage('/books')}>
            {t('all_categories')}
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={() => changePage('/books')}>
            {t('ranking')}
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={() => changePage('/books')}>
            {t('recommended_for_you')}
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={() => changePage('/books')}>
            {t('sitewide_events')}
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Menu

