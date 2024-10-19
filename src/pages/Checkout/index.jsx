import { bookApi } from "@/api/book";
import { useState, useEffect } from "react";
import BookItem from "@/components/BookItem";
import { message } from "antd";

const Checkout = () => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    const { data } = await bookApi.getBooks();
    setBooks(data);
  };

  useEffect(() => {
    getBooks();
  }, []);

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
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="02">03</option>
                  <option value="02">04</option>
                  <option value="02">05</option>
                  <option value="02">06</option>
                  <option value="02">07</option>
                  <option value="02">08</option>
                  <option value="02">09</option>
                  <option value="02">10</option>
                  <option value="02">11</option>
                  <option value="02">12</option>
                </select>
                <p className="flex items-center">/</p>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled selected>
                    YYYY
                  </option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2025">2026</option>
                  <option value="2025">2027</option>
                  <option value="2025">2028</option>
                  <option value="2025">2029</option>
                  <option value="2025">2030</option>
                  <option value="2025">2031</option>
                  <option value="2025">2032</option>
                  <option value="2025">2033</option>
                  <option value="2025">2034</option>
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
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-400 transition duration-300" onClick={() => message.success('付款成功')}
            >
              確定付款
            </button>
          </form>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">購買明細</h3>
          <BookItem books={books} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
