const BookItem = ({ books, onRemoveClick }) => {
  return (
    <div className="mt-8">
      <div>
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {books.map((book, idx) => (
          <li key={book.id} className="flex py-6">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
              alt={book.title}
              src={book.img}
              className="h-full w-full object-center"
              />
          </div>
          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base text-gray-900">
                <h3>
                  <p>{book.title}</p>
                </h3>
                  <p className="ml-4 text-right text-sm whitespace-nowrap">{`NT$ ${book.price}`}</p>
                  <p className="ml-4 text-right text-sm whitespace-nowrap">X{book.qty}</p>
              </div>
              <p className="text-gray-500 text-[14px]">{book.author}</p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <p className="text-gray-500">{book.series}</p>
              <div className="flex">
                <button type="button" 
                className="font-medium text-blue-600 hover:text-blue-500"
                onClick={() => onRemoveClick(idx)}
                >
                  移除
                </button>
              </div>
            </div>
          </div>
          </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BookItem