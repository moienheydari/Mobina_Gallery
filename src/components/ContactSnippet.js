import React from 'react';
import { useTranslation } from 'react-i18next';
import './ContactSnippet.css';

const ContactSnippet = ({ theme }) => {
  const { t } = useTranslation();

  return (
    <div className={`contact-snippet-container ${theme === 'dark' ? 'contact-snippet-dark' : ''}`}>
      <h3 className="contact-snippet-title">{t('contactSnippet.title')}</h3>
      <div className="contact-snippet-info">
        <span className="emoji" role="img" aria-label="address">📍</span>
        <span>{t('contactSnippet.address')}</span>
      </div>
      <div className="contact-snippet-info">
        <span className="emoji" role="img" aria-label="email">📧</span>
        <a href={`mailto:${t('contactSnippet.email')}`}>{t('contactSnippet.email')}</a>
      </div>
      <div className="contact-snippet-info">
        <span className="emoji" role="img" aria-label="phone">📞</span>
        <a href={`tel:${t('contactSnippet.phone')}`}>{t('contactSnippet.phone')}</a>
      </div>
    </div>
  );
};

export default ContactSnippet;
