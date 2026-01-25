import BookItem from '@/components/BookItem';
// bundle-barrel-imports: 直接匯入減少 bundle size
import message from 'antd/es/message';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookStore } from '@/store/book';
import { useUserStore } from '@/store/user';
import { useTranslation } from 'react-i18next';
import { checkPermission } from '@/api/auth';

// rendering-hoist-jsx: 靜態選項提升到模組層級，避免每次渲染重建
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => {
  const month = String(i + 1).padStart(2, '0');
  return (
    <option key={month} value={month}>
      {month}
    </option>
  );
});

const YEAR_OPTIONS = Array.from({ length: 11 }, (_, i) => {
  const year = 2024 + i;
  return (
    <option key={year} value={year}>
      {year}
    </option>
  );
});

const Checkout = () => {
  const { cart, cartId, getTotalPrice, removeCart, checkout } = useBookStore();
  const { session } = useUserStore();
  const [payment, setPayment] = useState('visa');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvv, setCvv] = useState('');
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  // rerender-functional-setstate: 使用 useCallback 穩定回呼函式
  const handleRemoveClick = useCallback(
    (idx) => {
      removeCart(idx);
    },
    [removeCart]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (cart.length === 0) {
        messageApi.warning(t('Cart_Empty'));
        return;
      }

      if (!session?.user?.id) {
        messageApi.warning(t('Please_Login_First'));
        return;
      }

      if (!cartId) {
        messageApi.warning(t('cart_data_error'));
        return;
      }

      if (payment === 'visa' && (!cardNumber || !expirationMonth || !expirationYear || !cvv)) {
        messageApi.warning(t('Incomplete_Card_Info'));
        return;
      }

      try {
        const orderId = await checkout(session.user.id);
        if (orderId) {
          messageApi.success(t('Payment_Success'));
          setTimeout(() => navigate('/'), 500);
        } else {
          messageApi.error(t('checkout_failed'));
        }
      } catch (err) {
        messageApi.error(err.message || t('Payment_Failure'));
        console.error('Checkout error:', err);
      }
    },
    [cart, cartId, session, payment, cardNumber, expirationMonth, expirationYear, cvv, checkout, messageApi, t, navigate]
  );

  // rerender-derived-state: 計算總金額使用 useMemo
  const totalPrice = useMemo(() => getTotalPrice(), [cart, getTotalPrice]);

  useEffect(() => {
    if (!checkPermission(session)) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <>
      {contextHolder}
      <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-surface">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-primary">
              {t('Payment')}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="radio"
                  id="credit-card"
                  name="payment"
                  className="mr-2"
                  checked={payment === 'visa'}
                  onChange={() => setPayment('visa')}
                />
                <label
                  htmlFor="credit-card"
                  className="text-lg font-medium text-gray-700 dark:text-secondary"
                >
                  {t('CreditCard_Label')}
                </label>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="card-number"
                  className="block text-sm font-medium text-gray-700 dark:text-secondary"
                >
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
                <label
                  htmlFor="expiry-date"
                  className="block text-sm font-medium text-gray-700 dark:text-secondary"
                >
                  {t('Expiration_Date')}
                </label>
                <div className="flex space-x-2">
                  <select
                    value={expirationMonth}
                    onChange={(e) => setExpirationMonth(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-secondary"
                  >
                    <option value="" disabled>
                      MM
                    </option>
                    {MONTH_OPTIONS}
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
                    {YEAR_OPTIONS}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
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
                <input
                  type="radio"
                  id="apple-pay"
                  name="payment"
                  className="mr-2"
                  checked={payment === 'applepay'}
                  onChange={() => setPayment('applepay')}
                />
                <label
                  htmlFor="apple-pay"
                  className="text-lg font-medium text-gray-700 dark:text-secondary"
                >
                  Apple Pay
                </label>
              </div>
              <button
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-400 transition duration-300"
                type="submit"
                onClick={handleSubmit}
              >
                {t('Confirm_Payment')}
              </button>
            </form>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-surface">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-primary">
              {t('Purchase_Details')}
            </h3>
            <BookItem books={cart} onRemoveClick={handleRemoveClick} />
            <p className="my-4 border border-solid border-stone-500"></p>
            <div className="total-price flex justify-between text-base font-medium text-gray-900 dark:text-primary">
              <p>{t('Total_Amount')}</p>
              <p>NT${totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
