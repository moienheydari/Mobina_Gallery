import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './ServicesPage.css';
import SkeletonLoader from '../components/SkeletonLoader';

const services = [
  {
    titleKey: 'servicesPage.lavaggio.title',
    descriptionKey: 'servicesPage.lavaggio.description',
    imageUrl: 'https://picsum.photos/seed/lavaggio/400/300',
  },
  {
    titleKey: 'servicesPage.riparazione.title',
    descriptionKey: 'servicesPage.riparazione.description',
    imageUrl: 'https://picsum.photos/seed/servizio/400/300',
  },
  {
    titleKey: 'servicesPage.restauro.title',
    descriptionKey: 'servicesPage.restauro.description',
    imageUrl: 'https://picsum.photos/seed/restauro/400/300',
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
              <div className="service-card" key={index}>
                <img src={service.imageUrl} alt={t(service.titleKey)} />
                <div className="service-card-content">
                  <h2 className="service-card-title">{t(service.titleKey)}</h2>
                  <p className="service-card-description">{t(service.descriptionKey)}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ServicesPage;
