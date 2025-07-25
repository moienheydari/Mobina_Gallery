import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './ServicesPage.css';
import SkeletonLoader from '../components/SkeletonLoader';
import ContactSnippet from '../components/ContactSnippet';
import washingImage from '../images/Services/Washing.jpg';
import repairImage from '../images/Services/Repair.jpg';
import restorationImage from '../images/Services/Restoration.webp';

const services = [
  {
    titleKey: 'servicesPage.lavaggio.title',
    descriptionKey: 'servicesPage.lavaggio.description',
    imageUrl: washingImage,
  },
  {
    titleKey: 'servicesPage.riparazione.title',
    descriptionKey: 'servicesPage.riparazione.description',
    imageUrl: repairImage,
  },
  {
    titleKey: 'servicesPage.restauro.title',
    descriptionKey: 'servicesPage.restauro.description',
    imageUrl: restorationImage,
  },
];

const ServicesPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imagePromises = services.map((service) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = service.imageUrl;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => setLoading(false))
      .catch((err) => {
        console.error("Failed to load service images", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('servicesPage.title') + " | Mobina Gallery"}</title>
        <meta name="description" content={"Galleria di squisiti Tappeti e Kilim."} />
      </Helmet>
      <div className="services-page">
        <h1 className="services-title">{t('servicesPage.title')}</h1>
        <div className="services-grid">
          {loading
            ? services.map((_, index) => (
              <div className="service-card" key={index}>
                <SkeletonLoader style={{ height: '200px', width: '100%' }} />
                <div className="service-card-content">
                  <SkeletonLoader style={{ height: '2rem', width: '80%', marginBottom: '1rem' }} />
                  <SkeletonLoader style={{ height: '1rem', width: '100%' }} />
                  <SkeletonLoader style={{ height: '1rem', width: '90%' }} />
                </div>
              </div>
            ))
            : services.map((service, index) => (
              <Link to="/contact" key={index} className="service-card-link">
                <div className="service-card">
                  <img src={service.imageUrl} alt={t(service.titleKey)} />
                  <div className="service-card-content">
                    <h2 className="service-card-title">{t(service.titleKey)}</h2>
                    <p className="service-card-description">{t(service.descriptionKey)}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <ContactSnippet />
      </div>
    </>
  );
};

export default ServicesPage;
