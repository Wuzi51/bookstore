import { useTranslation } from 'react-i18next';

const BookItem = ({ books, onRemoveClick }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-8">
      <div>
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {books.map((item, idx) => (
            <li key={item.id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img alt={item.books?.title} src={item.books?.img} className="h-full w-full object-contain" />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base text-gray-900 dark:text-primary">
                    <h3>{item.books?.title}</h3>
                    <p className="ml-4 text-right text-sm whitespace-nowrap">{`NT$ ${item.books?.price}`}</p>
                  </div>
                  <p className="text-gray-500 text-[14px] dark:text-primary">{item.books?.author}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500 dark:text-primary">{item.books?.series}</p>
                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-blue-600 hover:text-blue-500"
                      onClick={() => onRemoveClick(idx)}
                    >
                      {t('Remove')}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookItem;
