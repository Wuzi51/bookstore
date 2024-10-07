import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faGlobe, faMoon } from '@fortawesome/free-solid-svg-icons'
import './index.css'
import i18n from '@/i18n'
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/user"


const NavItems = () => {
	const { t } = useTranslation()
  const { language, setLanguage } = useUserStore()
  const languageList = {
    zh: "zh_TW",
    en: "en_US",
  }
  
  const changeLanguage = () => {
    const newLanguage = language === languageList.zh ? languageList.en : languageList.zh
    i18n.changeLanguage(newLanguage) //i18n
    setLanguage(newLanguage) //狀態持久化
  }
  
  return (
    <ul className="topNavItem">
    <li> <a href="#">{t('login')}</a> </li>
    {/* {language === "zh_TW" ? "zh_TW" : "en_US"} */}
    <li> <FontAwesomeIcon onClick={changeLanguage} icon={faGlobe} /> </li>
    <li> <FontAwesomeIcon icon={faMoon} /> </li>
    <li> <FontAwesomeIcon icon={faCartShopping} /> </li>
  </ul>
  )
  }

export default NavItems

