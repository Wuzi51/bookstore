import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faGlobe, faMoon, faHeart } from '@fortawesome/free-solid-svg-icons';
import i18n from '@/i18n';
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/user"
import { Modal, message, Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { userApi } from '@/api/user';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import Cart from '@/components/Cart';
import { useBookStore } from '@/store/book';

const NavItems = ({ setIsOpen = () => {} }) => {
  const { darkMode, setDarkMode } = useUserStore();
  const { cart } = useBookStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
	const { t } = useTranslation()
  const { language, setLanguage, session, setSession } = useUserStore();
  const [email, setEmail] = useState('lufy5656@test.com');
  const [password, setPassword] = useState('d565656');
  const languageList = {
    zh: "zh_TW",
    en: "en_US",
  };
  const [messageApi, contextHolder] = message.useMessage();

  const handleDarkMode = () => {
    setDarkMode(!darkMode)
  };

  const handleModalOpen = (bool) => {
    setIsModalOpen(bool)
  };

  const handleCartOpen = (bool) => {
    setIsCartOpen(bool)
    setIsOpen(false); // 點擊後關閉漢堡選單
  };

  // 登出事件
  const handleClick = () => {
    setSession(null);
    userApi.logout()
  };

  const userMenu = {
    items: [
      {
        key: 'profile',
        label: session?.user?.email || 'No email',
        disabled: true
      },
      {
        type: 'divider'
      },
      {
        key: 'logout',
        label: t("login_out"),
        icon: <LogoutOutlined />,
        onClick: handleClick
      }
    ]
  };

  const login = async() => {
    // 防呆
    if (!email || !password) {
      messageApi.warning(t("warning"))
      return
    }
    try {
      const { session } = await userApi.login(email, password)
      setSession(session)
      messageApi.success(t("success"))
      handleCancel()
    } catch (err) {
      messageApi.error(t("error"))
      console.error(err)
    } 
  };

  const handleCancel = () => {
    handleModalOpen(false);
  };

  const changeLanguage = () => {
    const newLanguage = language === languageList.zh ? languageList.en : languageList.zh
    i18n.changeLanguage(newLanguage) //i18n
    setLanguage(newLanguage) //狀態持久化
  };

  return (
    <>
      {contextHolder}
      <ul className="flex items-center text-xl gap-8 ml-8">
        <li className="cursor-pointer transition-transform hover:scale-110">
          <FontAwesomeIcon onClick={changeLanguage} icon={faGlobe} />
        </li>
        <li className="cursor-pointer transition-transform hover:scale-110">
          <FontAwesomeIcon onClick={handleDarkMode} icon={faMoon} /> 
        </li>
        <li className="cursor-pointer transition-transform hover:scale-110">
          <Badge count={cart.length} size='small'>
            <FontAwesomeIcon className="text-lg dark:text-primary" onClick={() => handleCartOpen(true)} 
              icon={faCartShopping} /> 
          </Badge>
        </li>
        <li className="cursor-pointer transition-transform hover:scale-110">
          <Link to="/favorite"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </Link>
        </li>
        <li className="cursor-pointer transition-transform hover:scale-110"> 
          { session ? (
          <Dropdown menu={userMenu} trigger={['click']}>
            <Avatar className="cursor-pointer" size={32} icon={<UserOutlined />} />
          </Dropdown>
          ): <p onClick={() => handleModalOpen(true)}>{t("login")}</p>} 
        </li>
        
        <Cart open={isCartOpen} onCancel={() => setIsCartOpen(false)} items={cart}/>

        <Modal okText={t("login")} cancelText={t("cancel")} open={isModalOpen} onOk={login} 
            onCancel={handleCancel}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-primary">
                  {t("login")}
                </h2>
              </div>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 dark:text-secondary">
                      {t("Email")}
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        type="text"
                          value={email}
                          autoComplete="username"
                          required
                          className="block w-full rounded-md border-2 p-2 text-gray-900 ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-secondary">
                        {t("password")}
                    </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        type="password"
                          value={password}
                          required
                          autoComplete="current-password"
                          className="block w-full rounded-md border-2 p-2 text-gray-900 ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                  </div>
                </form>
              </div>
            </div>
        </Modal>
      </ul>
    </>
  );
};

export default NavItems;