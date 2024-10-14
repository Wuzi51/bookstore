import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faGlobe, faMoon } from '@fortawesome/free-solid-svg-icons'
import './index.css'
import i18n from '@/i18n'
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/user"
import { Modal, message } from 'antd';
import { useState } from 'react';
import { userApi } from '@/api/user';



const NavItems = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
	const { t } = useTranslation()
  const { language, setLanguage, token, setToken } = useUserStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const languageList = {
    zh: "zh_TW",
    en: "en_US",
  }

  const handleModalOpen = (bool) => {
    setIsModalOpen(bool)
  }

  // 登出事件
  const handleClick = () => {
    localStorage.removeItem("accessToken")
    setToken("")
  }


  // 存取token後存存在前端頁面
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
   } 

   const handleCancel = () => {
    handleModalOpen(false);
  }

  const changeLanguage = () => {
    const newLanguage = language === languageList.zh ? languageList.en : languageList.zh
    i18n.changeLanguage(newLanguage) //i18n
    setLanguage(newLanguage) //狀態持久化
  }
  
  return (
    <>
      <ul className="topNavItem">
        <li> {token ? <p className='username'>{username}</p> : <p></p>} </li>
        <li>
          {token ? <p onClick={handleClick}>{t("login_out")}</p> : <p onClick={() => handleModalOpen(true)}>{t("login")}</p>} 
        </li>
        <li> <FontAwesomeIcon onClick={changeLanguage} icon={faGlobe} /> </li>
        <li> <FontAwesomeIcon icon={faMoon} /> </li>
        <li> <FontAwesomeIcon icon={faCartShopping} /> </li>
        <Modal okText={t("login")} cancelText={t("cancel")} open={isModalOpen} onOk={login} onCancel={handleCancel}>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {t("login")}
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    {t("account")}
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      type="text"
                      value={username}
                      autoComplete="username"
                      required
                      className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
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
                      className="block w-full rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
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
  )
  }

export default NavItems

