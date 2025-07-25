import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import ImageCarousel from '../components/ImageCarousel';
import ContactSnippet from '../components/ContactSnippet';
import './KilimPage.css';

const KilimPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('kilimPage.title') + " | Mobina Gallery"}</title>
        <meta name="description" content={"Galleria di squisiti Tappeti e Kilim."} />
      </Helmet>
      <div className="kilim-page">
        <h1 className="kilim-title">{t('kilimPage.title')}</h1>
        <ImageCarousel folder="kilim" />
        <ContactSnippet />
      </div>
    </>
  );
};

export default KilimPage;
