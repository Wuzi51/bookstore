import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faBook } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "antd";
import { useState } from "react";
import { useBookStore } from "@/store/book";
import EBookReader from "../EBookReader";
import { Link } from "react-router-dom";

const BookCard = ({ book, onClick, onFavoriteClick, onCartClick }) => {
  const [open, setOpen] = useState(false);
  const { favoriteBooks } = useBookStore();
  const isFavorited = favoriteBooks.some((item) => item.id === book.id);

  return (
    <>
      <div key={book.id} className="w-full max-w-60 text-center mt-2 flex flex-col justify-between p-4 shadow-lg dark:bg-surface dark:text-primary">
        <div className='overflow-hidden' onClick={onClick}>
          <Link to={`/book/${book.id}`} className="cursor-pointer">
            <img
              className="w-full h-52 object-contain duration-300 ease-in-out hover:scale-105" 
              src={book.img} 
              alt={book.title}/>
            <h3 className="text-sm mt-3 truncate">
              {book.title}
            </h3>
            <h4 className="mt-1 text-sm underline truncate">
              {book.author}
            </h4>
          </Link>
          <p className="mt-2 text-xs font-bold">
            {`NT$ ${book.price}`}
          </p>
        </div>

        <div className='flex justify-evenly mt-3 cursor-pointer'>
          <div className='w-1/2 leading-[3rem] hover:bg-gray-200 dark:hover:bg-gray-600' onClick={() => onFavoriteClick(book.id)}>
            <button> 
            <FontAwesomeIcon 
            icon={faHeart}
            className={`${isFavorited ? 'text-[tomato]' : 'text-black dark:text-white'}`}
            />
          </button>
          </div>
          <div className='w-1/2 leading-[3rem] hover:bg-gray-200 dark:hover:bg-gray-600' onClick={() => setOpen(true)}>
            <button>
              <FontAwesomeIcon icon={faBook}/>
            </button>
          </div>
          <div className='w-1/2 leading-[3rem] hover:bg-gray-200 dark:hover:bg-gray-600' onClick={() => onCartClick(book.id)}>
            <button>
              <FontAwesomeIcon icon={faCartShopping}/>
            </button>
          </div>
        </div>
      </div>
      <Modal
        title={book.title}
        open={open}
        centered
        onCancel={() => setOpen(false)}
        footer={null}
        width={600}
      >
        <EBookReader/>
      </Modal>
    </>
  );
};

export default BookCard;


