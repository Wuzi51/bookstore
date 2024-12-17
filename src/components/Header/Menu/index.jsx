import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Menu = () => {
  const navigate = useNavigate()
  const changePage = (category) => {
    navigate(`/books?category=${category}`)
  }
  const { t } = useTranslation()
  return (
    <nav>
      <ul className="flex justify-around w-[30rem] mt-8">
        <li className="nav-item">
          <button className="text-gray-500 hover:text-gray-400" onClick={() => changePage('all_categories')}>
            {t('all_categories')}
          </button>
        </li>
        <li className="nav-item">
          <button className="text-gray-500 hover:text-gray-400" onClick={() => changePage('ranking')}>
            {t('ranking')}
          </button>
        </li>
        <li className="nav-item">
          <button className="text-gray-500 hover:text-gray-400" onClick={() => changePage('recommended')}>
            {t('recommended_for_you')}
          </button>
        </li>
        <li className="nav-item">
          <button className="text-gray-500 hover:text-gray-400" onClick={() => changePage('sitewide')}>
            {t('sitewide_events')}
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Menu

