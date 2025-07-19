import BookCard from '@/components/BookCard';
import { bookApi } from "@/api/book";
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom"
import { useBookStore } from '@/store/book';
import { message } from 'antd';
import { useTranslation } from "react-i18next";

const Books = () => {
  const { setFavoriteBooks, setCart, cart } = useBookStore();
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();

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
    const result = setFavoriteBooks(id);
    if (result === 'add') {
      messageApi.success(t('Added_To_Favorites'));
    } else {
      messageApi.success(t('Already_In_Favorites'));
    }
  };

  const handleCartClick = (id) => {
    if (cart.some(item => item.id === id)) {
      messageApi.info(t('Already_In_Cart'));
      return;
    }
    setCart(id);
    messageApi.success(t('Already_Added_To_Cart'));
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
        <div className="pt-4">
          <select className="border-2 text-black" onChange={handleChange} value={sortOrder}>
            <option value="title">{t('Sort_By_Title')}</option>
            <option value="date">{t('Sort_By_PublishedDate')}</option>
          </select>
        </div>
        {contextHolder}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 m-4">
          {sortedBooks.map(book => (
            <BookCard 
              book={book} 
              key={book.id} 
              onFavoriteClick={handleFavoriteClick}  
              onCartClick={handleCartClick}
              inCart={cart.some(item => item.id === book.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Books;
