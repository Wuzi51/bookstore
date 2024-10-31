import BookCard from "@/components/BookCard"
import { useBookStore } from "@/store/book"
import { useNavigate } from "react-router-dom"

const Favorite = () => {
  const { favoriteBooks, setFavoriteBooks, setCart } = useBookStore()
  const navigate = useNavigate()

  const changePage = (url) => {
    navigate(url)
  }

  const handleFavoriteClick = (id) => {
    setFavoriteBooks(id)
  }

  const handleCartClick = (id, qty = 1) => {
    setCart(id, qty)
  }

  return (
    <div className="mt-3">
      <h2 className="text-2xl ml-3 font-bold mb-2">我的願望清單</h2>
      <div className="flex">
        {favoriteBooks.map(book => (
          <BookCard book={book} key={book.id}
          onFavoriteClick={handleFavoriteClick}
          onCartClick={handleCartClick}
          onClick={() => changePage(`/book/${book.id}`)}/>
        ))}
      </div>
    </div>
  )
}

export default Favorite