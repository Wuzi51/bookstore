import Category from "@/components/Category"
import BookCard from "@/components/BookCard"
import { useNavigate } from "react-router-dom"
import { bookApi } from "@/api/book"
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
    <div className="flex flex-col items-center justify-between">
      <div className=" mt-5 hover:cursor-pointer " onClick={() => changePage('/book/15')}>
        <img
          className="w-full object-cover "
          src="https://cdn.readmoo.com/store/template/4912/full_banner/image_l.jpg?t=1730453480"
          alt="banner" />  
      </div>
      <div>
        <Category title="Today's_Picks" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
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