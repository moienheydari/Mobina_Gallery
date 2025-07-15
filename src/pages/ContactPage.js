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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.58939145344!2d10.21733331555794!3d45.53824197910208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47817a2d65c6c6a9%3A0x67b1b2a0d7f0e3c!2sCorso%20Cavour%2C%2031b%2C%2025121%20Brescia%20BS%2C%20Italy!5e0!3m2!1sen!2sus!4v1678886400000"
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
