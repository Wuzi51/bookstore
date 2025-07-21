import BookCard from "@/components/BookCard";
import { useBookStore } from "@/store/book";
import { message } from "antd";
import { useTranslation } from "react-i18next";

const Favorite = () => {
  const { favoriteBooks, setFavoriteBooks, setCart, cart } = useBookStore();
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  
  const handleFavoriteClick = (id) => {
    setFavoriteBooks(id);
  };

  const handleCartClick = (id) => {
    if (cart.some(item => item.id === id)) {
      messageApi.info(t('Already_In_Cart'));
      return;
    }
    setCart(id);
    messageApi.success(t('Already_Added_To_Cart'));
  };

  return (
    <div className="pt-5">
      <h2 className="text-2xl ml-3 font-bold mb-2">我的願望清單</h2>
      <div className="w-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {contextHolder}
        {favoriteBooks.map(book => (
          <BookCard book={book} key={book.id}
          onFavoriteClick={handleFavoriteClick}
          onCartClick={handleCartClick} />
        ))}
      </div>
    </div>
  )
};

export default Favorite;