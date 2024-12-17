import { useTranslation } from "react-i18next"
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
  };
  

  return (
    <form className="flex">
      <input className="w-full md:w-96 lg:w-128 p-1 border-solid border-2 border-gray-300 rounded"
        type="search"
        placeholder={t('Please_enter_a_keyword')}
        aria-label="Search" />
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold mx-8 py-2 px-5 rounded"  
        type="submit" 
        onClick={handleSearch}>{t('search')}
      </button>
    </form>
  )
};

export default SearchForm;