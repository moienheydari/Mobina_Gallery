import React from 'react';
import { useTranslation } from 'react-i18next';
import './ServicesPage.css';

const ServicesPage = () => {
  const { t } = useTranslation();
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

  return (
    <div className="services-page">
      <h1 className="services-title">{t('servicesPage.title')}</h1>
      <div className="services-grid">
        {services.map((service, index) => (
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
