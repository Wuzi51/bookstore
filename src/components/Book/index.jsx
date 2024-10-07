import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons'
import "./index.css"

const handleClick = (event) => {
  const className = event.target.className
  className.includes('heart-btn') ? alert('收藏成功') : alert('已加入購物車')
}

const Book = ({ book }) => {
  return (
    <li key={book.id} className="book">
      <img src={book.img} alt={book.title} />
      <h3>{book.title}</h3>
      <h4>{book.author}</h4>
      <p>{book.price}</p>
      <div className='btn-area flex justify-evenly mt-3'>
        <div className='heart-btn' onClick={handleClick}>
          <button><FontAwesomeIcon icon={faHeart} /></button>
        </div>
        <div className='cart-btn' onClick={handleClick}>
          <button><FontAwesomeIcon icon={faCartShopping} /></button>
        </div>
      </div>
    </li>
  )
}

export default Book