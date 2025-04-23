import BookCard from '@/components/BookCard';
import { bookApi } from "@/api/book";
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from "react-router-dom"
import { useBookStore } from '@/store/book';

const Books = () => {
  const { setFavoriteBooks, setCart} = useBookStore();
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  const getBooks = async () => {
    try {
      const { data } = await bookApi.getBooks();
      setBooks(data); // 存進 store
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  const category = searchParams.get('category');

  const ids = searchParams.get('ids');

  // 當 ids 為undefined或null時，將其轉為空陣列
  const idsArray = ids ? ids.split(',').map(id => id.trim()) : [];

  const filteredBooks = books.filter((book) => {
    if (idsArray.length > 0) {
      return idsArray.includes(String(book.id));
    }
    if (category) {
      return book.category === category;
    }
    return true;
  });
  
  const handleChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleFavoriteClick = (id) => {
    setFavoriteBooks(id);
  };

  const handleCartClick = (id, qty = 1) => {
    setCart(id, qty);
  };

  const sortedBooks = filteredBooks.sort((a, b) => {
      if (sortOrder === 'date') {
        return new Date(a.date) - new Date(b.date); 
      }
      return a.title.localeCompare(b.title)
    });

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
        <div key={book.id}>
          <Link to={`/book/${book.id}`}>
            <BookCard book={book} 
            onFavoriteClick={handleFavoriteClick}  
            onCartClick={handleCartClick}/>
          </Link>
        </div>
      ))}
      </div>
    </div>
  </>
  );
};

export default Books;
