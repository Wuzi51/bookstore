import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useBookStore } from "@/store/book";
import { message } from "antd";


const SearchForm = () => {
  const { books } = useBookStore();
  const { t } = useTranslation()
  const navigate = useNavigate();

  const changePage = (url) => {
    navigate(url);
  };

const handleSubmit = (event) => {
  event.preventDefault();
  const value = event.target.search.value.trim();
  if (!value) {
    message.warning(t("Please_enter_a_keyword"));
    return;
  }

  // 篩選匹配的書籍
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(value.toLowerCase())
  );

  if (filteredBooks.length === 1) {
    // 如果只有一本書，直接跳轉到該書詳細頁
    changePage(`/book/${filteredBooks[0].id}`);
  } else if (filteredBooks.length > 1) {
    // 如果多本書，跳轉到搜尋結果頁並傳遞 ID
    const ids = filteredBooks.map(book => book.id).join(",");
    changePage(`/books?ids=${ids}`);
  } else {
    // 沒有匹配的書
    message.warning(t("No_matching_books"));
  }
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
            className="w-20 text-center whitespace-nowrap md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-md"
          type="submit"
        >
          {t("search")}
        </button>
      </div>
  </form>
  );
};

export default SearchForm;
