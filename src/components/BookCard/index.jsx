import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart, faBook } from '@fortawesome/free-solid-svg-icons';
// bundle-barrel-imports: 直接匯入減少 bundle size
import Modal from 'antd/es/modal';
import { useState, memo, lazy, Suspense } from 'react';
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

  return (
    <>
      <div
        key={book.id}
        className="w-full max-w-52 text-center mt-2 flex flex-col justify-between p-4 shadow-lg dark:bg-surface dark:text-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="overflow-hidden" onClick={onClick}>
          <Link to={`/book/${book.id}`} className="cursor-pointer">
            <img
              className="w-full h-52 object-contain duration-300 ease-in-out hover:scale-105"
              src={book.img}
              alt={book.title}
              loading="lazy"
            />
            <h3 className="text-sm mt-3 truncate">{book.title}</h3>
            <h4 className="mt-1 text-sm underline truncate">{book.author}</h4>
          </Link>
          <p className="mt-2 text-xs font-bold">{`NT$ ${book.price.toLocaleString()}`}</p>
        </div>

        <div className="flex justify-evenly mt-3 cursor-pointer">
          <div
            className="w-1/2 leading-[3rem] hover:bg-gray-200 dark:hover:bg-gray-600"
            onClick={() => onFavoriteClick(book.id)}
          >
            <button className="transition-transform active:scale-95">
              <FontAwesomeIcon
                icon={faHeart}
                className={`${isBookFavorited ? 'text-[tomato]' : 'text-black dark:text-white'}`}
              />
            </button>
          </div>
          <div
            className="w-1/2 leading-[3rem] hover:bg-gray-200 dark:hover:bg-gray-600"
            onClick={() => setOpen(true)}
          >
            <button className="transition-transform active:scale-95">
              <FontAwesomeIcon icon={faBook} />
            </button>
          </div>
          <div
            className="w-1/2 leading-[3rem] hover:bg-gray-200 dark:hover:bg-gray-600"
            onClick={() => onCartClick(book.id)}
          >
            <button className="transition-transform active:scale-95">
              <FontAwesomeIcon
                icon={faCartShopping}
                className={`${inCart ? 'text-green-500' : 'text-black dark:text-white'}`}
              />
            </button>
          </div>
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
