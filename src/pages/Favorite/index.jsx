import BookCard from "@/components/BookCard"
import { useState, useEffect } from "react"
import { bookApi } from "@/api/book"

const Favorite = () => {
  const [books, setBooks] = useState([])
  
  const getBooks = async() => {
    const {data} = await bookApi.getBooks()
    setBooks(data)
  }

    useEffect(() => {
    getBooks()
  }, [])
  
  return (
    <div className="mt-3">
      <h2 className="text-2xl ml-3 font-bold mb-2">我的願望清單</h2>
      <div className="flex">
        {books.map(book => (
          <BookCard book={book} key={book.id} showButtons={false}/>
        ))}
      </div>
    </div>
  )
}

export default Favorite