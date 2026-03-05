import { useNavigate, useParams } from 'react-router-dom';
import { useBookStore } from '@/store/book';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import CommentBoard from '@/components/CommentBoard';
import BookCard from '@/components/BookCard';
// bundle-barrel-imports: 直接匯入減少 bundle size
import message from 'antd/es/message';
import Spin from 'antd/es/spin';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/user';
import { checkPermission } from '@/api/auth';
import { bookApi } from '@/api/book';

const Book = () => {
  const { books, setBooks, setFavoriteBooks, setCart, cart, favoriteBooks, addComment } = useBookStore();
  const { id } = useParams();
  const book = books.find((item) => item.id === Number(id));
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  const { session } = useUserStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (books.length === 0) {
      bookApi.getBooks().then(({ data }) => {
        if (data) setBooks(data);
      }).catch(() => {
        navigate('/');
      });
    }
  }, [books.length, setBooks, navigate]);

  const recommendedBooks = useMemo(
    () => books.filter((b) => b.category === book?.category && b.id !== book?.id).slice(0, 6),
    [books, book],
  );

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    requestAnimationFrame(updateScrollState);
  }, [recommendedBooks, updateScrollState]);

  const inCart = cart && book ? cart.some((item) => item.book_id === book.id) : false;

  const changePage = (url) => navigate(url);

  const handleCheckOut = async () => {
    if (!checkPermission(session)) {
      messageApi.warning(t('Please_Login_First'));
      return;
    }
    if (!inCart) {
      await setCart(session.user.id, book.id);
      messageApi.success(t('Already_Added_To_Cart'));
    }
    changePage('/checkout');
  };

  const handleCartClick = useCallback(async (bookId) => {
    if (!session?.user) {
      messageApi.warning(t('Please_Login_First'));
      return;
    }
    if (cart.some((item) => item.book_id === bookId)) {
      messageApi.info(t('Already_In_Cart'));
      return;
    }
    await setCart(session.user.id, bookId);
    messageApi.success(t('Already_Added_To_Cart'));
  }, [session, cart, setCart, messageApi, t]);

  const handleFavoriteClick = useCallback((bookId) => {
    if (favoriteBooks.some((item) => item.id === bookId)) {
      messageApi.info(t('Already_In_Favorites'));
      return;
    }
    setFavoriteBooks(bookId);
    messageApi.success(t('Added_To_Favorites'));
  }, [favoriteBooks, setFavoriteBooks, messageApi, t]);

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
    <div className="flex flex-col mt-10 lg:flex-row lg:justify-around m-3">
      {contextHolder}
      {/* 左側圖片與評分區塊 */}
      <div className="mx-auto lg:mx-3">
        <img
          src={book.img}
          alt={book.title}
          width={224}
          height={320}
          className="w-full max-w-[12rem] lg:max-w-[14rem] mb-4 lg:mb-0"
        />
        <div className="flex items-center justify-center my-5">
          <p className="mr-2">{book.score}</p>
          <FontAwesomeIcon icon={faStar} aria-hidden="true" className="mr-2 text-yellow-500" />
          <p>
            {book.comments.length} {t('Review_Count')}
          </p>
        </div>
      </div>

      {/* 中間內容區塊 */}
      <div className="leading-8 flex-1 min-w-0 mx-auto mb-3 lg:mx-3">
        <div>
          <h2 className="text-2xl mb-4 font-bold text-center lg:text-left text-pretty">{book.title}</h2>
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
        <CommentBoard
          book={book}
          session={session}
          onSubmit={(name, content) => addComment(book.id, name, content)}
        />
      </div>

      {/* 右側按鈕區塊 */}
      <div className="flex flex-col gap-4 items-center  mt-4 lg:mt-0 lg:items-start lg:mx-3">
        <button
          className="buy-btn w-52 px-12 py-3 bg-[#e98192] text-white rounded-3xl hover:bg-[#eba5b1] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#e98192] focus-visible:outline-none"
          onClick={handleCheckOut}
        >
          {t('Buy')}
        </button>
        <button
          className="add-to-cart-btn w-52 px-12 py-3 bg-[#40c8f7] text-white rounded-3xl hover:bg-[#5ed1f7] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#40c8f7] focus-visible:outline-none"
          onClick={() => handleCartClick(book.id)}
        >
          {t('Add_To_Cart')}
        </button>
        <button
          className="favorite-btn w-52 max-w-xs px-12 py-3 whitespace-nowrap bg-gray-400 text-white rounded-3xl hover:bg-gray-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 focus-visible:outline-none"
          onClick={() => handleFavoriteClick(book.id)}
        >
          {t('Add_To_Favorites')}
        </button>
      </div>
    </div>

    {/* 同分類推薦 — 獨立全寬區塊 */}
    {recommendedBooks.length >= 2 && (
      <div className="mt-8 mx-3">
        <h4 className="text-lg font-bold mb-4 text-pretty text-center">{t('Similar_Books')}</h4>
        <div className="relative">
          <div className={`md:hidden pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white dark:from-[#1a1a1a] to-transparent z-10 transition-opacity duration-200 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`md:hidden pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white dark:from-[#1a1a1a] to-transparent z-10 transition-opacity duration-200 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 md:flex-wrap md:justify-center md:overflow-x-visible">
            {recommendedBooks.map((b) => (
              <div key={b.id} className="w-44 shrink-0 snap-start">
                <BookCard
                  book={b}
                  onCartClick={handleCartClick}
                  onFavoriteClick={handleFavoriteClick}
                  isFavorited={favoriteBooks.some((item) => item.id === b.id)}
                  inCart={cart.some((item) => item.book_id === b.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Book;
