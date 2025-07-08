import { useNavigate, useParams } from "react-router-dom";
import { useBookStore } from "@/store/book";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import CommentBoard from "@/components/CommentBoard";
import { message } from "antd";


const Book = () => {
  const { books, setFavoriteBooks, setCart, cart, favoriteBooks } = useBookStore();
  const { id } = useParams();
  const book = books.find((item) => item.id === Number(id));
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const inCart = cart && book ? cart.some(item => item.id === book.id) : false;
  const inFavorite = favoriteBooks && book ? favoriteBooks.some(item => item.id === book.id) : false;

  const changePage = (url) => navigate(url);

  const handleCheckOut = () => {
    if (!inCart) {
      setCart(book.id, 1);
      messageApi.success("已加入購物車");
    }
    changePage('/checkout');
  };

  const handleAddToCart = () => {
    if (inCart) {
      messageApi.info("此書已在購物車");
      return;
    }
    setCart(book.id, 1);
    messageApi.success("已加入購物車");
  };

  const handleFavorite = () => {
    if (inFavorite) {
      messageApi.info("此書已在收藏");
      return;
    }
    setFavoriteBooks(book.id);
    messageApi.success("已加入收藏");
  };

  return (
    <div className="flex flex-col mt-10 lg:flex-row lg:justify-around m-3">
      {contextHolder}
      {/* 左側圖片與評分區塊 */}
      <div className="mx-auto lg:mx-3">
        <img 
          src={book.img} 
          alt="book" 
          className="w-full max-w-[12rem] lg:max-w-[14rem] mb-4 lg:mb-0"
        />
        <div className="flex items-center justify-center my-5">
          <p className="mr-2">{book.score}</p>
          <FontAwesomeIcon icon={faStar} className="mr-2 text-yellow-500" />
          <p>{book.comments.length} 篇評論</p>
        </div>
      </div>
      
      {/* 中間內容區塊 */}
      <div className="leading-8 flex-1 mx-auto mb-3 lg:mx-3">
        <div>
          <h2 className="text-2xl mb-4 font-bold text-center lg:text-left">{book.title}</h2>
          <h3 className="mb-2 text-center lg:text-left">{book.author}</h3>
          <ul className="flex flex-col items-center lg:items-start mb-3">
            <li>出版日期：{book.date}</li>
            <li>語言：{book.language}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-2">簡介</h4>
          <p>{book.describe}</p>
        </div>
        <CommentBoard book={book} />
      </div>

      {/* 右側按鈕區塊 */}
      <div className="flex flex-col gap-4 items-center  mt-4 lg:mt-0 lg:items-start lg:mx-3">
        <button 
          className="buy-btn w-11/12 lg:w-auto px-20 py-3 bg-[#e98192] text-white rounded-3xl hover:bg-[#eba5b1]"
          onClick={handleCheckOut}
        >
          購買
        </button>
        <button 
          className="add-to-cart-btn w-11/12 lg:w-auto px-12 py-3 bg-[#40c8f7] text-white rounded-3xl hover:bg-[#5ed1f7]"
          onClick={handleAddToCart}
        >
          新增至購物車
        </button>
        <button 
          className="favorite-btn w-11/12 lg:w-auto px-16 py-3 bg-gray-400 text-white rounded-3xl
          hover:bg-gray-300"
          onClick={handleFavorite}
        >
          加入收藏
        </button>
      </div>
    </div>
  );
};

export default Book;

