import BookItem from "@/components/BookItem";
import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookStore } from "@/store/book";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  //使用全局狀態獲取資料
  const { cart, getTotalPrice, removeCart, orderList, setOrderList } = useBookStore()
  const [payment, setPayment] = useState('visa')
  const [cardNumber, setCardNumber] = useState('')
  const [expirationMonth, setExpirationMonth] = useState('')
  const [expirationYear, setExpirationYear] = useState('')
  const [cvv, setCvv] = useState('')
  const { t } = useTranslation();

  const handleRemoveClick = (idx) => {
    removeCart(idx)
  }  

  const navigate = useNavigate()
  const changePage = (url) => {
    navigate(url)
    message.success(t('Payment_Success'))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // 檢查是否有填寫付款資訊
    if (payment === 'visa' && (!cardNumber || !expirationMonth || !expirationYear || !cvv)) {
      message.warning(t('Incomplete_Card_Info'));
      return;
    }

    const orderDate = {
      payment,
      cardNumber,
      expirationMonth,
      expirationYear,
      cvv,
      createdAt: Math.round(new Date().getTime() / 1000), 
      products: cart,
      totalPrice: getTotalPrice(),
    };

    setOrderList([...orderList, orderDate]);
    console.log(orderList);
    changePage('/');
};

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
        <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-surface">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-primary">{t('Payment')}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input type="radio" 
              id="credit-card" 
              name="payment" 
              className="mr-2"
              checked={payment === 'visa'}
              onChange={() => setPayment('visa')}
              />
              <label htmlFor="credit-card" className="text-lg font-medium text-gray-700 dark:text-secondary">
                {t('CreditCard_Label')}
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 dark:text-secondary">
                {t('Card_Number')}
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                id="card-number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-primary"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 dark:text-secondary">
                {t('Expiration_Date')}
              </label>
              <div className="flex space-x-2">
                <select
                  value={expirationMonth}
                  onChange={(e) => setExpirationMonth(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-secondary"
                >
                  <option value="" disabled >
                    MM
                  </option>
                  {monthDropdown()}
                </select>
                <p className="flex items-center">/</p>
                <select
                  value={expirationYear}
                  onChange={(e) => setExpirationYear(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-secondary"
                >
                  <option value="" disabled>
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
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-primary"
                placeholder="123"
              />
            </div>
            <div className="mb-6">
              <input type="radio" 
              id="apple-pay" 
              name="payment" 
              className="mr-2" 
              checked={payment === 'applepay'}
              onChange={() => setPayment('applepay')}
              />
              <label htmlFor="apple-pay" className="text-lg font-medium text-gray-700 dark:text-secondary">
                Apple Pay
              </label>
            </div>
            <button
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-400 transition duration-300" onClick={handleSubmit}
            >
              {t('Confirm_Payment')}
            </button>
          </form>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-surface">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-primary">
            {t('Purchase_Details')}
          </h3>
          <BookItem  books={cart} onRemoveClick={handleRemoveClick}/>
          <p className="my-4 border border-solid border-stone-500"></p>
          <div className="total-price flex justify-between text-base font-medium text-gray-900 dark:text-primary">
            <p>{t('Total_Amount')}</p>
            <p>NT${getTotalPrice()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
