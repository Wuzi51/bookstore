import BookCard from '@/components/BookCard';
import { bookApi } from "@/api/book";
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom"
import { useBookStore } from '@/store/book';

const Books = () => {
  const { setFavoriteBooks, setCart} = useBookStore()
  const [searchParams] = useSearchParams()
  const [books, setBooks] = useState([])
  const [sortOrder, setSortOrder] = useState('')

  const getBooks = async() => {
      const { data } = await bookApi.getBooks()
      setBooks(data)
    }

  const category = searchParams.get('category')

  const filteredBooks = books.filter(book => book.category === category)
  
  const handleChange = (e) => {
    setSortOrder(e.target.value)
  }

  const handleFavoriteClick = (id) => {
    setFavoriteBooks(id)
  }

  const handleCartClick = (id, qty = 1) => {
    setCart(id, qty)
  }


  const sortedBooks = filteredBooks.sort((a, b) => {
      if (sortOrder === 'date') {
        return new Date(a.date) - new Date(b.date); 
      }
      return a.title.localeCompare(b.title)
    });

  const navigate = useNavigate()

  const changePage = (url) => {
    navigate(url)
  }

  useEffect(() => {
    getBooks()
  }, [])

  return (
  <>
    <div>
      <div className="m-4">
        <select className="border-2 text-black" onChange={handleChange} value={sortOrder}>
          <option value="title">依書名排序</option>
          <option value="date">依出版日期排序</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 m-4">
        {sortedBooks.map(book => (
        <BookCard book={book} key={book.id} 
        onClick={() => changePage(`/book/${book.id}`)} 
        onFavoriteClick={handleFavoriteClick}  
        onCartClick={handleCartClick}/>
      ))}
      </div>
    </div>
  </>
  );
}

export default Books