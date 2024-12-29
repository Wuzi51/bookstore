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
      className="w-full flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div className="flex mt-3 md:w-auto">
        <input
          name="search"
          className="w-[80%] md:w-96 lg:w-128 p-2 mr-0.5 border-2 border-gray-300 rounded-md"
          type="search"
          placeholder={t("Please_enter_a_keyword")}
          aria-label="Search"
        />
        <button
          className="w-36 whitespace-nowrap text-center md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-md"
          type="submit"
        >
          {t("search")}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
