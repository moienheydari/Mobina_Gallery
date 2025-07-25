import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import './ContactPage.css';

const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('navbar.contact') + " | Mobina Gallery"}</title>
        <meta name="description" content={"Contact page for Mobina Gallery"} />
      </Helmet>
      <div className="contact-page">
        <h1 className="contact-title">{t('contactPage.title')}</h1>
        <div className="contact-container">
          <div className="contact-info">
            <h2>{t('contactPage.infoTitle')}</h2>
            <p><span className="emoji" role="img" aria-label="address">📍</span>{t('contactPage.address')}</p>
            <p><span className="emoji" role="img" aria-label="phone">📞</span>{t('contactPage.phone')}<a href="tel:+390302399077">+39 030 2399077</a></p>
            <p><span className="emoji" role="img" aria-label="instagram">📸</span>{t('contactPage.instagram')}<a href="https://www.instagram.com/mobinagalleryit" target="_blank" rel="noopener noreferrer">@mobinagalleryit</a></p>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.813142785252!2d10.21472331554841!3d45.54155297910114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4781766e2e1f7b7f%3A0x9f0e7f1b0f6f7f8e!2sCorso%20Cavour%2C%2031b%2C%2025121%20Brescia%20BS%2C%20Italy!5e0!3m2!1sit!2sit!4v1689600000000"
              title={t('contactPage.mapTitle')}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
