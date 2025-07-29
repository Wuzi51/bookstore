import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="mt-5 bg-gray-100 p-3 text-center border-t border-gray-300 dark:bg-surface">
      <div className="mb-2 grid grid-cols-1 lg:grid-cols-3 gap-4 text-center">
        <div>
          <h4>{t('welcome')}</h4>
        </div>
        <div>
          <h4 className="text-center">{t('footer_personal_use')}</h4>
        </div>
        <div className='mb-2'>
          <h4 className='mb-2'>{t('social_media')}</h4>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className='hover:text-gray-600'
          >
            <FontAwesomeIcon icon={faFacebook} className="text-xl transition-transform hover:scale-125" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 hover:text-gray-600"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-xl transition-transform hover:scale-125" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4"
          >
            <FontAwesomeIcon icon={faXTwitter} className="text-xl transition-transform hover:scale-125" />
          </a>
        </div>
      </div>
      <p className='mt-2 text-s text-gray-400'>Copyright © 2024</p>
    </footer>
  );
};

export default Footer;
