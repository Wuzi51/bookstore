import BookCard from "@/components/BookCard";
import { useBookStore } from "@/store/book";

const Favorite = () => {
  const { favoriteBooks, setFavoriteBooks, setCart } = useBookStore();
  
  const handleFavoriteClick = (id) => {
    setFavoriteBooks(id);
  };

  const handleCartClick = (id, qty = 1) => {
    setCart(id, qty);
  };

  return (
    <div className="pt-5">
      <h2 className="text-2xl ml-3 font-bold mb-2">我的願望清單</h2>
      <div className="w-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
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