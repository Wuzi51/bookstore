import Category from "@/components/Category"
import BookCard from "@/components/BookCard"
import { Link } from "react-router-dom"
import { bookApi } from "@/api/book"
import { useEffect } from "react"
import { useBookStore } from "@/store/book"
import BannerDesktop from "@/images/Banner-desktop.png"
import BannerMobile from "@/images/Banner-mobile.png"
import { message } from "antd"


const Home = () => {
  const { books, setBooks, setFavoriteBooks, setCart } = useBookStore()
  const [messageApi, contextHolder] = message.useMessage();

  const getBooks = async () => {
    try {
      const { data } = await bookApi.getBooks();
      setBooks(data); // 存進 store
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
};

  const handleFavoriteClick = (id) => {
    const result = setFavoriteBooks(id);
    if (result === "add") {
      messageApi.success("已加入收藏");
    } else {
      messageApi.success("已取消收藏");
    }
  };

  const handleCartClick = (id, qty = 1) => {
    setCart(id, qty)
    messageApi.success('已加入購物車')
  };

useEffect(() => {
    getBooks()
  }, []);

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="mt-9 overflow-hidden">
        <Link to="/book/15" className=" mt-9 hover:cursor-pointer ">
        <img
          className="hidden md:block w-[149vh] object-contain duration-300 ease-in-out hover:scale-105"
          src={BannerDesktop}
          alt="desktop banner"
        />
        <img
          className="block md:hidden w-full object-cover rounded-l"
          src={BannerMobile}
          alt="mobile banner"
        />
      </Link>
      </div>
      <div>
        <Category title="Today's_Picks" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {contextHolder}
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