import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faGlobe, faMoon, faHeart } from '@fortawesome/free-solid-svg-icons';
import i18n from '@/i18n';
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/user"
import { Modal, message } from 'antd';
import { useState } from 'react';
import { userApi } from '@/api/user';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import Cart from '@/components/Cart';
import { useBookStore } from '@/store/book';

const NavItems = ({ setIsOpen }) => {
  const { darkMode, setDarkMode } = useUserStore();
  const { cart } = useBookStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
	const { t } = useTranslation()
  const { language, setLanguage, token, setToken } = useUserStore();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const languageList = {
    zh: "zh_TW",
    en: "en_US",
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode)
    message.success(`${!darkMode ? '暗黑' : '明亮'}模式`)
  };

  const handleModalOpen = (bool) => {
    setIsModalOpen(bool)
  };

  const handleCartOpen = (bool) => {
    setIsCartOpen(bool)
    setIsOpen(false); // 點擊後關閉漢堡選單
  };

  const handleFavoriteClick = () => {
    setIsOpen(false);
  };

  // 登出事件
  const handleClick = () => {
    localStorage.removeItem("accessToken")
    setToken("")
  };


  // 存取token後存在前端頁面
  const login = async() => {
    // 防呆
    if (!username || !password) {
      message.warning(t("warning"))
      return
    }
    try {
      const { accessToken } = await userApi.login(username, password)
      setToken(accessToken)
      setUsername(username)
      message.success(t("success"))
    } catch (err) {
      message.error(t("error"))
      console.error(err)
    } finally {
      // 成功或失敗都會執行
      handleModalOpen(false);
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
      <ul className="flex items-center text-xl gap-8">
        <li> {token && <p className='username'>{username}</p>} </li>
        <li className="cursor-pointer transition-transform hover:scale-110">
          {token ? <p onClick={handleClick}>{t("login_out")}</p> : 
          <p onClick={() => handleModalOpen(true)}>{t("login")}</p>} 
        </li>
        <li className="cursor-pointer transition-transform hover:scale-110">
          <FontAwesomeIcon onClick={changeLanguage} icon={faGlobe} />
        </li>
        <li className="cursor-pointer transition-transform hover:scale-110">
          <FontAwesomeIcon onClick={handleDarkMode} icon={faMoon} /> 
        </li>
        <li className="cursor-pointer transition-transform hover:scale-110">
          <Badge count={cart.length} size='small'>
            <FontAwesomeIcon className='text-[18px] cart' onClick={() => handleCartOpen(true)} 
              icon={faCartShopping} /> 
          </Badge>
        </li>
        <li className="cursor-pointer transition-transform hover:scale-110">
          <Link to="/favorite"
            onClick={handleFavoriteClick}
          >
            <FontAwesomeIcon icon={faHeart} />
          </Link>
        </li>
        <Cart open={isCartOpen} onCancel={setIsCartOpen} items={cart}/>
        <Modal okText={t("login")} cancelText={t("cancel")} open={isModalOpen} onOk={login} 
          onCancel={handleCancel}>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {t("login")}
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("account")}
                  </label>
                  <div className="mt-2">
                  <input
                    id="username"
                    type="text"
                      value={username}
                      autoComplete="username"
                      required
                      className="block w-full rounded-md border-2 p-2 text-gray-900 ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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