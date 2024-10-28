import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons'
import "./index.css"

//將showButtons預設為true
const BookCard = ({ book, onClick, onFavoriteClick, onCartClick, showButtons = true}) => {
  return (
    <div key={book.id} className="book">
      <div className='book-card' onClick={onClick}>
        <img src={book.img} alt={book.title}/>
        <h3>{book.title}</h3>
        <h4>{book.author}</h4>
        <p>{`NT$ ${book.price}`}</p>
      </div>
      
      {showButtons && ( 
        <div className='btn-area flex justify-evenly mt-3'>
          <div className='heart-btn' onClick={() => onFavoriteClick(book.id)}>
            <button>
              <FontAwesomeIcon icon={faHeart}/>
            </button>
          </div>
          <div className='cart-btn' onClick={() => onCartClick(book.id)}>
            <button>
              <FontAwesomeIcon icon={faCartShopping}/>
            </button>
          </div>
        </div>
      )}
    </div> 
  )
}

export default BookCard