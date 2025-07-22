import React, { useContext } from 'react';
import { OverlayContext } from '../contexts/OverlayContext';
import { useTranslation } from 'react-i18next';
import './ContactSnippet.css';

const ContactSnippet = ({ theme }) => {
  const { inOverlay } = useContext(OverlayContext);
  const { t } = useTranslation();
  if (inOverlay) return null;

  return (
    <div className={`contact-snippet-container ${theme === 'dark' ? 'contact-snippet-dark' : ''}`}>
      <h3 className="contact-snippet-title">{t('contactSnippet.title')}</h3>
      <div className="contact-snippet-info">
        <span className="emoji" role="img" aria-label="address">📍</span>
        <span>Corso Cavour, 31b, 25121, Brescia, Italia</span>
      </div>
      <div className="contact-snippet-info">
        <span className="emoji" role="img" aria-label="instagram">📸</span>
        <a href="https://www.instagram.com/mobinagalleryit" target="_blank" rel="noopener noreferrer">@mobinagalleryit</a>
      </div>
      <div className="contact-snippet-info">
        <span className="emoji" role="img" aria-label="phone">📞</span>
        <a href="tel:+390302399077">+39 030 2399077</a>
      </div>
    </div>
  );
};

export default ContactSnippet;
