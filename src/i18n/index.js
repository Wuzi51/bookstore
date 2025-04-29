import { initReactI18next } from "react-i18next";
import i18n from "i18next";

// 翻譯檔
import en_US from "./locales/en_US.json";
import zh_TW from "./locales/zh_TW.json";

const language = localStorage.getItem('user');

i18n.use(initReactI18next).init({
  resources: {
    en_US: {
      translation: en_US,
    },
    zh_TW: {
      translation: zh_TW,
    },
  },
  fallbackLng: "en_US",
  lng: language ? JSON.parse(language).state.language : "zh_TW", //預設語言
  interpolation: {
    escapeValue: false,
  }
});

export default i18n;
