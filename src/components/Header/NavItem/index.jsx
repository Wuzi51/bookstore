import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faGlobe, faMoon, faHeart } from '@fortawesome/free-solid-svg-icons';
import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/user';
import { Modal, message, Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, ProfileOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { userApi } from '@/api/user';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import Cart from '@/components/Cart';
import { useBookStore } from '@/store/book';

const NavItems = ({ setIsOpen = () => {} }) => {
  const { darkMode, setDarkMode } = useUserStore();
  const { cart, clearLocalCart } = useBookStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { t } = useTranslation();
  const { language, setLanguage, session, setSession } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authMode, setAuthMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const isRegisterMode = authMode === 'register';
  const isForgotMode = authMode === 'forgot';
  const languageList = {
    zh: 'zh_TW',
    en: 'en_US',
  };
  const [messageApi, contextHolder] = message.useMessage();

  const changeAuthMode = (mode) => {
    setAuthMode(mode);
    if (mode !== 'register') {
      setConfirmPassword('');
    }
    if (mode === 'forgot') {
      setPassword('');
    }
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleModalOpen = (bool) => {
    setIsModalOpen(bool);
    if (bool) {
      changeAuthMode('login');
      setPassword('');
      setConfirmPassword('');
    }
  };

  const handleCartOpen = (bool) => {
    setIsCartOpen(bool);
    setIsOpen(false); // 點擊後關閉漢堡選單
  };

  // 登出事件
  const handleClick = async () => {
    try {
      setSession(null);
      clearLocalCart();
      await userApi.logout();
    } catch (err) {
      console.error('Logout failed:', err);
      messageApi.error(t('logout_failed'));
    }
  };

  const userMenu = {
    items: [
      {
        key: 'email',
        label: session?.user?.email || 'No email',
        disabled: true,
      },
      {
        type: 'divider',
      },
      {
        key: 'profile',
        label: (
          <Link to="/profile" onClick={() => setIsOpen(false)}>
            {t('profile')}
          </Link>
        ),
        icon: <ProfileOutlined />,
      },
      {
        key: 'orders',
        label: (
          <Link to="/orders" onClick={() => setIsOpen(false)}>
            {t('order_details')}
          </Link>
        ),
        icon: <ShoppingOutlined />,
      },
      {
        key: 'logout',
        label: t('login_out'),
        icon: <LogoutOutlined />,
        onClick: handleClick,
      },
    ],
  };

  const login = async () => {
    if (!email || !password) {
      messageApi.warning(t('warning'));
      return;
    }
    setLoading(true);
    try {
      const { session } = await userApi.login(email, password);
      if (!session) {
        messageApi.error(t('error'));
        return;
      }
      setSession(session);
      messageApi.success(t('success'));
      handleCancel();
    } catch (err) {
      messageApi.error(err?.message || t('error'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    if (!email || !password || !confirmPassword) {
      messageApi.warning(t('warning'));
      return;
    }
    if (password !== confirmPassword) {
      messageApi.warning(t('password_mismatch'));
      return;
    }
    if (password.length < 6) {
      messageApi.warning(t('password_min_length'));
      return;
    }

    setLoading(true);
    try {
      const { session } = await userApi.signup(email, password);
      if (session) {
        setSession(session);
        messageApi.success(t('register_success_auto_login'));
      } else {
        messageApi.success(t('register_success_check_email'));
      }
      handleCancel();
    } catch (err) {
      messageApi.error(err?.message || t('register_failed'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      messageApi.warning(t('please_enter_email'));
      return;
    }

    setLoading(true);
    try {
      await userApi.resetPassword(email);
      messageApi.success(t('reset_link_sent'));
      changeAuthMode('login');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      messageApi.error(err?.message || t('reset_password_failed'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = () => {
    if (isForgotMode) {
      handleResetPassword();
    } else if (isRegisterMode) {
      register();
    } else {
      login();
    }
  };

  const handleCancel = () => {
    handleModalOpen(false);
    changeAuthMode('login');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const changeLanguage = () => {
    const newLanguage = language === languageList.zh ? languageList.en : languageList.zh;
    i18n.changeLanguage(newLanguage); //i18n
    setLanguage(newLanguage); //狀態持久化
  };

  return (
    <>
      {contextHolder}
      <ul className="flex items-center text-xl gap-8 ml-8">
        <li className="cursor-pointer transition-transform hover:scale-110 active:scale-95">
          <FontAwesomeIcon onClick={changeLanguage} icon={faGlobe} />
        </li>
        <li className="cursor-pointer transition-transform hover:scale-110 active:scale-95">
          <FontAwesomeIcon onClick={handleDarkMode} icon={faMoon} />
        </li>
        <li className="cursor-pointer transition-transform hover:scale-110">
          <Badge count={cart.length} size="small">
            <FontAwesomeIcon
              className="text-lg dark:text-primary"
              onClick={() => handleCartOpen(true)}
              icon={faCartShopping}
            />
          </Badge>
        </li>
        <li className="cursor-pointer transition-transform hover:scale-110 active:scale-95">
          <Link to="/favorite" onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faHeart} />
          </Link>
        </li>
        <li className="cursor-pointer transition-transform hover:scale-110 active:scale-95">
          {session ? (
            <Dropdown menu={userMenu} trigger={['click']}>
              <Avatar className="cursor-pointer" size={32} icon={<UserOutlined />} />
            </Dropdown>
          ) : (
            <p onClick={() => handleModalOpen(true)}>{t('login')}</p>
          )}
        </li>

        <Cart open={isCartOpen} onCancel={() => setIsCartOpen(false)} items={cart} />

        <Modal
          okText={isForgotMode ? t('send_reset_link') : isRegisterMode ? t('register') : t('login')}
          cancelText={t('cancel')}
          open={isModalOpen}
          onOk={handleModalSubmit}
          onCancel={handleCancel}
          confirmLoading={loading}
        >
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-primary">
                {isForgotMode ? t('forgot_password') : isRegisterMode ? t('register') : t('login')}
              </h2>
              {isForgotMode && (
                <p className="mt-2 text-center text-sm text-gray-500">
                  {t('forgot_password_hint')}
                </p>
              )}
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleModalSubmit(); }}>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-secondary"
                  >
                    {t('Email')}
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      autoComplete="username"
                      required
                      className="block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-surface dark:text-primary dark:ring-gray-600"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {!isForgotMode && (
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-secondary"
                      >
                        {t('password')}
                      </label>
                      {!isRegisterMode && (
                        <button
                          type="button"
                          className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400"
                          onClick={() => changeAuthMode('forgot')}
                        >
                          {t('forgot_password')}?
                        </button>
                      )}
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        type="password"
                        value={password}
                        required
                        autoComplete={isRegisterMode ? 'new-password' : 'current-password'}
                        className="block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-surface dark:text-primary dark:ring-gray-600"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {isRegisterMode && (
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-secondary"
                    >
                      {t('confirm_password')}
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        required
                        autoComplete="new-password"
                        className="block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-surface dark:text-primary dark:ring-gray-600"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </form>

              <div className="mt-6 text-center">
                {isForgotMode ? (
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    onClick={() => changeAuthMode('login')}
                  >
                    {t('back_to_login')}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    onClick={() => changeAuthMode(isRegisterMode ? 'login' : 'register')}
                  >
                    {isRegisterMode ? t('has_account_login') : t('no_account_register')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      </ul>
    </>
  );
};

export default NavItems;
