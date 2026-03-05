import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faBook } from '@fortawesome/free-solid-svg-icons';
// bundle-barrel-imports: 直接匯入減少 bundle size
import Modal from 'antd/es/modal';
import { useState, memo, lazy, Suspense, useCallback } from 'react';
import { useBookStore } from '@/store/book';
import { Link } from 'react-router-dom';
import Spin from 'antd/es/spin';

// bundle-conditional: 只在需要時載入 EBookReader（大型 epubjs 套件）
const EBookReader = lazy(() => import('../EBookReader'));

const BookCard = memo(({ book, onClick, onFavoriteClick, onCartClick, isFavorited, inCart }) => {
  const [open, setOpen] = useState(false);
  const { favoriteBooks } = useBookStore();
  const isBookFavorited =
    isFavorited !== undefined ? isFavorited : favoriteBooks.some((item) => item.id === book.id);

  const handleOpenReader = useCallback(() => setOpen(true), []);

  return (
    <>
      <div
        key={book.id}
        className="w-full max-w-52 text-center mt-2 flex flex-col justify-between p-4 shadow-lg dark:bg-surface dark:text-primary transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="overflow-hidden" onClick={onClick}>
          <Link to={`/book/${book.id}`} className="cursor-pointer">
            <img
              className="w-full h-52 object-contain duration-300 ease-in-out hover:scale-105"
              src={book.img}
              alt={book.title}
              width={208}
              height={208}
              loading="lazy"
            />
            <h3 className="text-sm mt-3 truncate">{book.title}</h3>
            <h4 className="mt-1 text-sm underline truncate">{book.author}</h4>
          </Link>
          <p className="mt-2 text-xs font-bold">{`NT$ ${book.price.toLocaleString()}`}</p>
        </div>

        <div className="flex justify-evenly mt-3">
          <button
            className="w-1/2 leading-[3rem] hover:bg-gray-200 dark:hover:bg-gray-600 transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none rounded"
            onClick={() => onFavoriteClick(book.id)}
            aria-label={isBookFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FontAwesomeIcon
              icon={faHeart}
              aria-hidden="true"
              className={`${isBookFavorited ? 'text-[tomato]' : 'text-black dark:text-white'}`}
            />
          </button>
          <button
            className="w-1/2 leading-[3rem] hover:bg-gray-200 dark:hover:bg-gray-600 transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none rounded"
            onClick={handleOpenReader}
            aria-label="Preview book"
          >
            <FontAwesomeIcon icon={faBook} aria-hidden="true" />
          </button>
          <button
            className="w-1/2 leading-[3rem] hover:bg-gray-200 dark:hover:bg-gray-600 transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none rounded"
            onClick={() => onCartClick(book.id)}
            aria-label={inCart ? 'Already in cart' : 'Add to cart'}
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              aria-hidden="true"
              className={`${inCart ? 'text-green-500' : 'text-black dark:text-white'}`}
            />
          </button>
        </div>
      </div>
      <Modal
        title={book.title}
        open={open}
        centered
        onCancel={() => setOpen(false)}
        footer={null}
        width={600}
        destroyOnClose
      >
        {/* bundle-conditional: 只在 Modal 開啟時才載入 EBookReader */}
        {open && (
          <Suspense fallback={<div className="flex justify-center p-8"><Spin size="large" /></div>}>
            <EBookReader />
          </Suspense>
        )}
      </Modal>
    </>
  );
});

BookCard.displayName = 'BookCard';

export default BookCard;
