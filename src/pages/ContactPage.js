import React from 'react';
import { useTranslation } from 'react-i18next';
import './ContactPage.css';

const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <div className="contact-page">
      <h1 className="contact-title">{t('contactPage.title')}</h1>
      <div className="contact-container">
        <div className="contact-info">
          <h2>{t('contactPage.infoTitle')}</h2>
          <p>{t('contactPage.address')}</p>
          <p>{t('contactPage.phone')}<a href="tel:+391234567890">+39 123 456 7890</a></p>
          <p>{t('contactPage.instagram')}<a href="https://www.instagram.com/mobina_gallery" target="_blank" rel="noopener noreferrer">@mobina_gallery</a></p>
        </div>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.895342442437!2d12.4687883154421!3d41.89574497922093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f6045d17a766f%3A0x94838248a6889958!2sVia%20di%20Monserrato%2C%2011%2C%2000186%20Roma%20RM%2C%20Italy!5e0!3m2!1sen!2sus!4v1678886400001"
            title={t('contactPage.mapTitle')}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
