import Category from "@/components/Category"
import BookCard from "@/components/BookCard"
import { useNavigate } from "react-router-dom"
import { bookApi } from "@/api/book"
import "./index.css"
import { useEffect } from "react"
import { useBookStore } from "@/store/book"


const Home = () => {
  const { books, setBooks, setFavoriteBooks, setCart } = useBookStore()

  const getBooks = async() => {
    const { data } = await bookApi.getBooks()
    setBooks(data)//存進store
  }

  const handleFavoriteClick = (id) => {
    setFavoriteBooks(id)
  }

  const handleCartClick = (id, qty = 1) => {
    setCart(id, qty)
  }

  const navigate = useNavigate()

  const changePage = (url) => {
    navigate(url)
  }

useEffect(() => {
    getBooks()
  }, [])

  return (
    <div className="wrap flex flex-col items-center justify-between">
      <div className="banner" onClick={() => changePage('/book/15')}>
        <img src="https://cdn.readmoo.com/store/template/4912/full_banner/image_l.jpg?t=1730453480" alt="banner" />  
      </div>
      <div>
        <Category title="Today's_Picks" />
        <div className="flex flex-wrap justify-center">
          {books.map(book => (
            <BookCard book={book} key={book.id} onClick={() => changePage(`/book/${book.id}`)}
              onFavoriteClick={handleFavoriteClick}  onCartClick={handleCartClick}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home