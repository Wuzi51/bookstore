import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faBook } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { Modal } from "antd";
import { useState } from "react";
import EBookReader from "../EBookReader";

const BookCard = ({ book, onClick, onFavoriteClick, onCartClick }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div key={book.id} className="book">
        <div className='book-card' onClick={onClick}>
          <img src={book.img} alt={book.title}/>
          <h3>{book.title}</h3>
          <h4>{book.author}</h4>
          <p>{`NT$ ${book.price}`}</p>
        </div>
        
        <div className='btn-area flex justify-evenly mt-3'>
          <div className='heart-btn' onClick={() => onFavoriteClick(book.id)}>
            <button>
              <FontAwesomeIcon icon={faHeart}/>
            </button>
          </div>
          <div className='book-btn' onClick={() => setOpen(true)}>
              <button>
                <FontAwesomeIcon icon={faBook}/>
              </button>
          </div>
          <div className='cart-btn' onClick={() => onCartClick(book.id)}>
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
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={600}
      >
        <EBookReader/>
      </Modal>
    </>
  );
};

export default BookCard;