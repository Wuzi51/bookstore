import Category from '@/components/Category';
import BookCard from '@/components/BookCard';
import { Link } from 'react-router-dom';
import { bookApi } from '@/api/book';
import { useEffect } from 'react';
import { useBookStore } from '@/store/book';
import { useUserStore } from '@/store/user';
import BannerDesktop from '@/images/Banner-desktop.png';
import BannerMobile from '@/images/Banner-mobile.png';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { books, setBooks, setFavoriteBooks, setCart, cart } = useBookStore();
  const { session } = useUserStore()
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();

  const getBooks = async () => {
    try {
      const { data } = await bookApi.getBooks();
      setBooks(data); // 存進 store
    } catch (error) {
      console.error('Failed to fetch books:', error);
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
    if (cart.some(item => item.book_id === bookId)) {
      messageApi.info(t('Already_In_Cart'));
      return;
    }
    await setCart(session.user.id, bookId); // 帳號綁定
    messageApi.success(t('Already_Added_To_Cart'));
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="mt-9 overflow-hidden">
        <Link to="/book/15" className=" mt-9 hover:cursor-pointer ">
          <img
            className="hidden md:block w-[149vh] object-contain duration-300 ease-in-out hover:scale-105"
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {contextHolder}
          {books.map((book) => (
            <BookCard
              book={book}
              key={book.id}
              onFavoriteClick={handleFavoriteClick}
              onCartClick={handleCartClick}
              inCart={cart.some(item => item.book_id === book.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
