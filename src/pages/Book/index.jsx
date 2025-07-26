import { useNavigate, useParams } from 'react-router-dom';
import { useBookStore } from '@/store/book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import CommentBoard from '@/components/CommentBoard';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/user';
import { checkPermission } from '@/api/auth';

const Book = () => {
  const { books, setFavoriteBooks, setCart, cart, favoriteBooks } = useBookStore();
  const { id } = useParams();
  const book = books.find((item) => item.id === Number(id));
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  const { session } = useUserStore();

  const inCart = cart && book ? cart.some((item) => item.book_id === book.id) : false;
  const inFavorite =
    favoriteBooks && book ? favoriteBooks.some((item) => item.id === book.id) : false;

  const changePage = (url) => navigate(url);

  const handleCheckOut = () => {
    if (!checkPermission(session)) {
      messageApi.warning(t('Please_Login_First'));
      return;
    }
    if (!inCart) {
      setCart(session.user.id, book.id);
      messageApi.success(t('Already_Added_To_Cart'));
    }
    changePage('/checkout');
  };

  const handleAddToCart = () => {
    if (inCart) {
      messageApi.info(t('Already_In_Cart'));
      return;
    }
    setCart(session.user.id, book.id);
    messageApi.success(t('Already_Added_To_Cart'));
  };

  const handleFavorite = () => {
    if (inFavorite) {
      messageApi.info(t('Already_In_Favorites'));
      return;
    }
    setFavoriteBooks(book.id);
    messageApi.success(t('Added_To_Favorites'));
  };

  return (
    <div className="flex flex-col mt-10 lg:flex-row lg:justify-around m-3">
      {contextHolder}
      {/* 左側圖片與評分區塊 */}
      <div className="mx-auto lg:mx-3">
        <img
          src={book.img}
          alt="book"
          className="w-full max-w-[12rem] lg:max-w-[14rem] mb-4 lg:mb-0"
        />
        <div className="flex items-center justify-center my-5">
          <p className="mr-2">{book.score}</p>
          <FontAwesomeIcon icon={faStar} className="mr-2 text-yellow-500" />
          <p>
            {book.comments.length} {t('Review_Count')}
          </p>
        </div>
      </div>

      {/* 中間內容區塊 */}
      <div className="leading-8 flex-1 mx-auto mb-3 lg:mx-3">
        <div>
          <h2 className="text-2xl mb-4 font-bold text-center lg:text-left">{book.title}</h2>
          <h3 className="mb-2 text-center lg:text-left">{book.author}</h3>
          <ul className="flex flex-col items-center lg:items-start mb-3">
            <li>
              {t('Published_Date')}：{book.date}
            </li>
            <li>
              {t('Language')}：{book.language}
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-2">{t('Description')}</h4>
          <p>{book.describe}</p>
        </div>
        <CommentBoard book={book} />
      </div>

      {/* 右側按鈕區塊 */}
      <div className="flex flex-col gap-4 items-center  mt-4 lg:mt-0 lg:items-start lg:mx-3">
        <button
          className="buy-btn w-52 px-12 py-3 bg-[#e98192] text-white rounded-3xl hover:bg-[#eba5b1]"
          onClick={handleCheckOut}
        >
          {t('Buy')}
        </button>
        <button
          className="add-to-cart-btn w-52 px-12 py-3 bg-[#40c8f7] text-white rounded-3xl hover:bg-[#5ed1f7]"
          onClick={handleAddToCart}
        >
          {t('Add_To_Cart')}
        </button>
        <button
          className="favorite-btn w-52  max-w-xs px-12 py-3 whitespace-nowrap bg-gray-400 text-white rounded-3xl
          hover:bg-gray-300"
          onClick={handleFavorite}
        >
          {t('Add_To_Favorites')}
        </button>
      </div>
    </div>
  );
};

export default Book;
