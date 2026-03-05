import BookCard from '@/components/BookCard';
import { bookApi } from '@/api/book';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBookStore } from '@/store/book';
import { useUserStore } from '@/store/user';
// bundle-barrel-imports: 直接匯入減少 bundle size
import message from 'antd/es/message';
import Spin from 'antd/es/spin';

import { useTranslation } from 'react-i18next';

const Books = () => {
  const { setFavoriteBooks, setCart, cart, favoriteBooks } = useBookStore();
  const { session } = useUserStore();
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();

  const favoriteSet = useMemo(
    () => new Set((favoriteBooks || []).map((book) => book?.id).filter(Boolean)),
    [favoriteBooks]
  );

  const cartSet = useMemo(() => {
    const bookIds = (cart || [])
      .map((item) => {
        // 處理不同的資料結構
        return item?.book_id || item?.books?.id || item?.id;
      })
      .filter(Boolean);
    return new Set(bookIds);
  }, [cart]);

  const getBooks = useCallback(async () => {
    if (books.length > 0) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await bookApi.getBooks();
      setBooks(data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  }, [books.length]);

  const category = searchParams.get('category');

  const ids = searchParams.get('ids');

  // 當 ids 為undefined或null時，將其轉為空陣列
  const idsArray = ids ? ids.split(',').map((id) => id.trim()) : [];

  const filteredBooks = books.filter((book) => {
    if (idsArray.length > 0) {
      return idsArray.includes(String(book.id));
    }
    if (category) {
      return book.category === category;
    }
    return true;
  });

  const handleChange = useCallback((e) => {
    setSortOrder(e.target.value);
  }, []);

  const handleFavoriteClick = useCallback(
    (id) => {
      const result = setFavoriteBooks(id);
      if (result === 'add') {
        messageApi.success(t('Added_To_Favorites'));
      } else {
        messageApi.success(t('Removed_From_Favorites'));
      }
    },
    [setFavoriteBooks, messageApi, t]
  );

  const handleCartClick = useCallback(
    async (bookId) => {
      if (!session?.user) {
        messageApi.warning(t('Please_Login_First'));
        return;
      }
      if (cart.some((item) => item.book_id === bookId)) {
        messageApi.info(t('Already_In_Cart'));
        return;
      }

      try {
        await setCart(session.user.id, bookId);
        messageApi.success(t('Already_Added_To_Cart'));
      } catch (error) {
        console.error('Add to cart error:', error);
        messageApi.error(t('add_cart_failed'));
      }
    },
    [session, cartSet, setCart, messageApi, t]
  );

  const sortedBooks = useMemo(() => {
    return [...filteredBooks].sort((a, b) => {
      if (sortOrder === 'date') {
        return new Date(a.date) - new Date(b.date);
      }
      return a.title.localeCompare(b.title);
    });
  }, [filteredBooks, sortOrder]);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

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
        <Spin spinning={loading} tip="Loading..." size="large">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 m-4 min-h-[400px]">
            {sortedBooks.map((book) => (
              <BookCard
                book={book}
                key={book.id}
                onFavoriteClick={handleFavoriteClick}
                onCartClick={handleCartClick}
                isFavorited={favoriteSet.has(book.id)}
                inCart={cartSet.has(book.id)}
              />
            ))}
          </div>
        </Spin>
      </div>
    </>
  );
};

export default Books;
