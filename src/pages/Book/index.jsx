import { useNavigate, useParams } from "react-router-dom";
import { useBookStore } from "@/store/book";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import "./index.css";
import CommentBoard from "@/components/CommentBoard";

const Book = () => {
  const { books, setFavoriteBooks, setCart } = useBookStore();
  const { id } = useParams();
  const book = books.find((item) => item.id === Number(id));

  const navigate = useNavigate();
  
  const changePage = (url) => {
    navigate(url)
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  const handleCheckOut = () => {
    changePage('/checkout');
    setCart(book.id, 1)
  }


  return (
    <div className="flex justify-around m-3">
      <div className="mx-3">
        <img src={book.img} alt="book" className="max-w-[15rem] mr-2"/>
        <div className="flex mt-2">
          <p>{book.score}</p>
          <FontAwesomeIcon icon={faStar} className="mr-2"/>
          <p>{book.comments.length}篇評論</p>
        </div>
      </div>
      <div className="leading-8 flex-1">
        <div>
          <h2 className="text-2xl mb-4 font-bold">{book.title}</h2>
          <h3 className="mb-2">{book.author}</h3>
          <ul className="flex flex-col mb-3">
            <li>出版日期： {formatDate(book.date)}</li>
            <li>語言：{book.language}</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2">簡介</h4>
          <ul>
            <li>{book.describe}</li>
          </ul>
        </div>
        <CommentBoard book={book}/>
      </div>
      <div className="action-btn ">
        <button className="buy-btn" onClick={handleCheckOut}>購買</button>
        <button className="add-to-cart-btn" onClick={() => setCart(book.id, 1)}>新增至購物車</button>
        <button className="favorite-btn" onClick={() => setFavoriteBooks(book.id)}>加入收藏</button>
      </div>
    </div>
  )
}

export default Book

