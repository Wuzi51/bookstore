import BookCard from '@/components/BookCard';
import { useBookStore } from '@/store/book';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/user';
import { Link } from 'react-router-dom';

const Favorite = () => {
  const { favoriteBooks, setFavoriteBooks, setCart, cart } = useBookStore();
  const [messageApi, contextHolder] = message.useMessage();
  const { session } = useUserStore();
  const { t } = useTranslation();

  const handleFavoriteClick = (id) => {
    setFavoriteBooks(id);
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
    await setCart(session.user.id, bookId);
    messageApi.success(t('Already_Added_To_Cart'));
  };;

  return (
    <>
      {contextHolder}
      <div className="pt-5">
        <h2 className="text-2xl ml-3 font-bold mb-2">{t('My_Wishlist')}</h2>
        {favoriteBooks.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-96'>
            <p className="text-xl text-gray-500 mb-6">{t('Empty_Favorite')}</p>
            <Link to="/" className='bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-400 transition duration-300'>
              {t('Go_Shopping')}
            </Link>
          </div>
        ) : null}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {favoriteBooks.map((book) => (
            <BookCard
              book={book}
              key={book.id}
              onFavoriteClick={handleFavoriteClick}
              onCartClick={handleCartClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Favorite;
