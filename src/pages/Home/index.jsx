import Category from "@/components/Category"
import BookCard from "@/components/BookCard"
import { useNavigate } from "react-router-dom"
import { bookApi } from "@/api/book"
import "./index.css"
import { useEffect } from "react"
import { useBookStore } from "@/store/book"


const Home = () => {
  const { books, setBooks, favoriteBooks, setFavoriteBooks } = useBookStore()

  const getBooks = async() => {
    const { data } = await bookApi.getBooks()
    setBooks(data)//存進store
  }

  const handleFavoriteClick = (id) => {
    const isFavorite = books.some((item) => item.id === id)
    const book = books.find((item) => item.id === id)
    if (isFavorite) {
      //移除收藏
      setFavoriteBooks(id)
    } else {
      //加入收藏
      setFavoriteBooks([...favoriteBooks, book])
    }
  }

  const handleCartClick = (id) => {
    console.log(id)
  }

  const navigate = useNavigate()

  const changePage = (url) => {
    navigate(url)
  }

  useEffect(() => {
    getBooks()
  }, [])

  return (
    <div className="wrap">
      <div className="banner" onClick={() => changePage('/')}>
        <img src="https://cdn.readmoo.com/store/template/4876/full_banner/image_l.jpg?t=1728459169" alt="banner" />  
      </div>
      <div>
        <Category title="Today's_Picks" />
        <div className="book-list">
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