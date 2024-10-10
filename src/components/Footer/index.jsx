import "./index.css"
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="footer">
      <div className="container">
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
}

export default Footer;