import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="mt-5 bg-gray-100 p-5 text-center border-t border-gray-300">
      <div className="flex justify-around flex-wrap mb-5">
        <div>
          <h4>{t('welcome')}</h4>
        </div>
        <div>
          <h4>{t('terms_of_service')}</h4>
        </div>
        <div>
          <h4>{t('social_media')}</h4>
        </div>
      </div>
      <p>Copyright © 2024</p>
    </footer>
  );
};

export default Footer;