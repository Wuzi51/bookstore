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
      console.error('登出失敗:', err);
      messageApi.error('登出失敗，請稍後再試');
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
            個人資料
          </Link>
        ),
        icon: <ProfileOutlined />,
      },
      {
        key: 'orders',
        label: (
          <Link to="/orders" onClick={() => setIsOpen(false)}>
            訂單歷史
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
      messageApi.warning('密碼不一致');
      return;
    }
    if (password.length < 6) {
      messageApi.warning('密碼至少需要 6 個字元');
      return;
    }

    setLoading(true);
    try {
      const { session } = await userApi.signup(email, password);
      if (session) {
        setSession(session);
        messageApi.success('註冊成功並已自動登入');
      } else {
        messageApi.success('註冊成功，請檢查您的信箱確認註冊');
      }
      handleCancel();
    } catch (err) {
      messageApi.error(err?.message || '註冊失敗');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      messageApi.warning('請輸入電子郵件');
      return;
    }

    setLoading(true);
    try {
      await userApi.resetPassword(email);
      messageApi.success('重設密碼連結已寄出，請查看您的信箱');
      changeAuthMode('login');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      messageApi.error(err?.message || '重設密碼失敗，請稍後再試');
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
          okText={isForgotMode ? '寄出重設連結' : isRegisterMode ? '註冊' : t('login')}
          cancelText={t('cancel')}
          open={isModalOpen}
          onOk={handleModalSubmit}
          onCancel={handleCancel}
          confirmLoading={loading}
        >
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-primary">
                {isForgotMode ? '忘記密碼' : isRegisterMode ? '註冊' : t('login')}
              </h2>
              {isForgotMode && (
                <p className="mt-2 text-center text-sm text-gray-500">
                  請輸入您的註冊電子郵件，我們會寄送重設密碼的連結。
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
                          忘記密碼？
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
                      確認密碼
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
                    返回登入
                  </button>
                ) : (
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                    onClick={() => changeAuthMode(isRegisterMode ? 'login' : 'register')}
                  >
                    {isRegisterMode ? '已有帳號？登入' : '沒有帳號？註冊'}
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
