import React from 'react';
import { useTranslation } from 'react-i18next';
import ImageCarousel from '../components/ImageCarousel';
import ContactSnippet from '../components/ContactSnippet';
import './TappetiPage.css';

const TappetiPage = () => {
  const { t } = useTranslation();

  return (
    <div className="tappeti-page">
      <h1 className="tappeti-title">{t('tappetiPage.title')}</h1>
      <ImageCarousel folder="tappeti" />
      <ContactSnippet />
    </div>
  );
};

export default TappetiPage;
