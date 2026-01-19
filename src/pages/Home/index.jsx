import Category from '@/components/Category';
import BookCard from '@/components/BookCard';
import { Link } from 'react-router-dom';
import { bookApi } from '@/api/book';
import { useEffect, useState } from 'react';
import { useBookStore } from '@/store/book';
import { useUserStore } from '@/store/user';
import BannerDesktop from '@/images/Banner-desktop.png';
import BannerMobile from '@/images/Banner-mobile.png';
import { message, Spin } from 'antd';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { books, setBooks, setFavoriteBooks, setCart, cart } = useBookStore();
  const { session } = useUserStore();
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const getBooks = async () => {
    if (books && books.length > 0) {
      setLoading(false);
      return; // 已有數據，直接關閉 loading
    }

    try {
      const { data } = await bookApi.getBooks();
      setBooks(data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteClick = (id) => {
    const result = setFavoriteBooks(id);
    if (result === 'add') {
      messageApi.success(t('Added_To_Favorites'));
    } else {
      messageApi.success(t('Removed_From_Favorites'));
    }
  };

  const handleCartClick = async (bookId) => {
    if (!session?.user) {
      messageApi.warning(t('Please_Login_First'));
      return;
    }

    const isInCart = cart.some((item) => {
      const itemBookId = item.book_id || item.books?.id || item.id;
      return itemBookId === bookId;
    });

    if (isInCart) {
      messageApi.info(t('Already_In_Cart'));
      return;
    }

    try {
      await setCart(session.user.id, bookId); // 帳號綁定
      messageApi.success(t('Already_Added_To_Cart'));
    } catch (error) {
      console.error('Add to cart error:', error);
      messageApi.error(t('add_cart_failed'));
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between animate-fade-in">
      <div className="mt-9 overflow-hidden">
        <Link to="/book/15" className=" mt-9 hover:cursor-pointer ">
          <img
            className="hidden md:block w-full max-w-7xl object-contain transition-transform duration-500 ease-out hover:scale-[1.02] hover:brightness-105 drop-shadow-2xl"
            src={BannerDesktop}
            alt="desktop banner"
          />
          <img
            className="block md:hidden w-full object-cover rounded-l"
            src={BannerMobile}
            alt="mobile banner"
          />
        </Link>
      </div>
      <div>
        <Category title="Today's_Picks" />
        <Spin spinning={loading} tip={t('loading_books')} size="large">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 min-h-[400px]">
            {contextHolder}
            {(books || []).map((book) => {
              const isInCart = (cart || []).some((item) => {
                const itemBookId = item.book_id || item.books?.id || item.id;
                return itemBookId === book.id;
              });

              return (
                <BookCard
                  book={book}
                  key={book.id}
                  onFavoriteClick={handleFavoriteClick}
                  onCartClick={handleCartClick}
                  inCart={isInCart}
                />
              );
            })}
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default Home;
