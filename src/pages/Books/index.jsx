import BookCard from '@/components/BookCard';
import { bookApi } from "@/api/book";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import "./index.css"

const Books = () => {
  const [books, setBooks] = useState([])
  const [sortOrder, setSortOrder] = useState('');

   const getBooks = async() => {
    const { data } = await bookApi.getBooks()
    setBooks(data)
    console.log(data)
  }

  const handleChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedBooks = [...books]
    .sort((a, b) => {
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
          <select className="border-2" onChange={handleChange} value={sortOrder}>
            <option value="title">依書名排序</option>
            <option value="date">依出版日期排序</option>
          </select>
        </div>
        <div className="book-list">
          {sortedBooks.map(book => (
            <BookCard book={book} key={book.id} onClick={() => changePage(`/book/${book.id}`)} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Books