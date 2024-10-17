import { useTranslation } from "react-i18next"
import "./index.css"


const SearchForm = () => {
  const { t }= useTranslation()
  return (
    <form className="d-flex">
    <input className="form-control searchForm" type="search" placeholder={t('Please_enter_a_keyword')} aria-label="Search" />
    <button className="btn bg-blue-500" type="submit">{t('search')}</button>
  </form>
  )
}

export default SearchForm