import React from 'react';
import { useTranslation } from 'react-i18next';
import ImageCarousel from '../components/ImageCarousel';
import ContactSnippet from '../components/ContactSnippet';
import './KilimPage.css';

const KilimPage = () => {
  const { t } = useTranslation();

  return (
    <div className="kilim-page">
      <h1 className="kilim-title">{t('kilimPage.title')}</h1>
      <ImageCarousel folder="kilim" />
      <ContactSnippet />
    </div>
  );
};

export default KilimPage;
