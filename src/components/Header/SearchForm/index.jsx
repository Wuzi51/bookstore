import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const changePage = (url) => {
    navigate(url);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.search.value; // 獲取輸入框的值
    changePage(`/search?keyword=${value}`);
  };

  return (
    <form
    className="flex flex-col justify-center items-center md:w-auto"
    onSubmit={handleSubmit}
  >
      <div className="flex w-full mt-3 justify-between items-center">
        <input
          name="search"
          className="flex-grow md:w-96 lg:w-128 px-4 py-[0.4rem] mr-2 border-2 border-gray-300 rounded-md"
          type="search"
          placeholder={t("Please_enter_a_keyword")}
          aria-label="Search"
        />
        <button
            className="w-16 whitespace-nowrap text-center md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-md"
          type="submit"
        >
          {t("search")}
        </button>
      </div>
  </form>
  );
};

export default SearchForm;
