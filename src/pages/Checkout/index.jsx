import BookItem from "@/components/BookItem";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useBookStore } from "@/store/book";
const Checkout = () => {
  //使用全局狀態獲取加入購物車的資料
  const { cart, totalPrice, removeCart } = useBookStore()

  const handleRemoveClick = (idx) => {
    removeCart(idx)
  }

  const navigate = useNavigate()
  const changePage = (url) => {
    navigate(url)
    message.success('付款成功')
  }

  const monthDropdown = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      const month = i < 10 ? `0${i}` : `${i}`
      months.push(
        <option key={month} value={month}>
          {month}
        </option>
      )
    }
    return months
  }

  const yearDropdown = () => {
    const years = [];
    for ( let i = 2024; i <= 2034; i++ ) {
      years.push(
        <option key={i} value={i}>
          {i}
        </option>
      )
    }
    return years
  }


  return (
    <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">付款</h3>
          <form>
            <div className="mb-4">
              <input type="radio" id="credit-card" name="payment" className="mr-2" />
              <label htmlFor="credit-card" className="text-lg font-medium text-gray-700">
                信用卡/Visa 金融卡
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                卡片號碼
              </label>
              <input
                type="text"
                id="card-number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">
                到期日
              </label>
              <div className="flex space-x-2">
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled selected>
                    MM
                  </option>
                  {monthDropdown()}
                </select>
                <p className="flex items-center">/</p>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled selected>
                    YYYY
                  </option>
                  {yearDropdown()}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                id="cvv"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="123"
              />
            </div>
            <div className="mb-6">
              <input type="radio" id="apple-pay" name="payment" className="mr-2" />
              <label htmlFor="apple-pay" className="text-lg font-medium text-gray-700">
                Apple Pay
              </label>
            </div>
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-400 transition duration-300" onClick={() => changePage('/')}
            >
              確定付款
            </button>
          </form>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">購買明細</h3>
          <BookItem books={cart} onRemoveClick={handleRemoveClick}/>
          <p className="my-4 border border-solid border-stone-500"></p>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>總金額</p>
            <p>NT${totalPrice()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
