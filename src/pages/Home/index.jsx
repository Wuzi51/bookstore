import Category from "@/components/Category"
import BookCard from "@/components/BookCard"
import { Link } from "react-router-dom"
import { bookApi } from "@/api/book"
import { useEffect } from "react"
import { useBookStore } from "@/store/book"
import BannerDesktop from "@/images/Banner-desktop.png"
import BannerMobile from "@/images/Banner-mobile.png"


const Home = () => {
  const { books, setBooks, setFavoriteBooks, setCart } = useBookStore()

  const getBooks = async () => {
    try {
      const { data } = await bookApi.getBooks();
      setBooks(data); // 存進 store
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
};

  const handleFavoriteClick = (id) => {
    setFavoriteBooks(id)
  };

  const handleCartClick = (id, qty = 1) => {
    setCart(id, qty)
  };

useEffect(() => {
    getBooks()
  }, []);

  return (
    <div className="flex flex-col items-center justify-between">
      <Link to="/book/15" className=" mt-9 hover:cursor-pointer ">
        <img
          className="hidden md:block w-[149vh] object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
          src={BannerDesktop}
          alt="desktop banner"
        />
        <img
          className="block md:hidden w-full object-cover rounded-l"
          src={BannerMobile}
          alt="mobile banner"
        />
      </Link>
      <div>
        <Category title="Today's_Picks" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {books.map(book => (
            <BookCard 
              book={book} 
              key={book.id} 
              onFavoriteClick={handleFavoriteClick}
              onCartClick={handleCartClick}/>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Home;