import BookCard from "@/components/BookCard";
import { useBookStore } from "@/store/book";
import { message } from "antd";

const Favorite = () => {
  const { favoriteBooks, setFavoriteBooks, setCart, cart } = useBookStore();
  const [messageApi, contextHolder] = message.useMessage();
  
  const handleFavoriteClick = (id) => {
    setFavoriteBooks(id);
  };

  const handleCartClick = (id) => {
    if (cart.some(item => item.id === id)) {
      messageApi.info('已在購物車中');
      return;
    }
    setCart(id);
    messageApi.success('已加入購物車');
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