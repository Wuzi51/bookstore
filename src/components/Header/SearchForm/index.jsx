import { useTranslation } from "react-i18next"
import "./index.css"
import { useNavigate } from "react-router-dom"


const SearchForm = () => {
  const { t }= useTranslation();

  const navigate = useNavigate();

  const changePage = (url) => {
    navigate(url)
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      changePage(`/search?keyword=${event.target.value}`)
    }
  }
  

  return (
    <form className="d-flex">
    <input className="form-control searchForm" type="search" placeholder={t('Please_enter_a_keyword')} aria-label="Search" />
    <button className="btn bg-blue-500" type="submit" onClick={handleSearch}>{t('search')}</button>
  </form>
  )
}

export default SearchForm