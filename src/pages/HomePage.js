import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { useTranslation } from 'react-i18next';
import FloatingParticles from '../components/FloatingParticles';
import ContactSnippet from '../components/ContactSnippet';
import ImageCarousel from '../components/ImageCarousel';
import './HomePage.css';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Mobina Gallery</title>
        <meta name="description" content={"Galleria di squisiti Tappeti e Kilim."} />
      </Helmet>
      <div className="home-page-wrapper">
        {/* <div className="three-canvas-container">
        <Canvas camera={{ position: [0, 0, 30] }}>
          <FloatingParticles />
        </Canvas>
      </div> */}
        <div className="home-container">
          <div className="hero-image"></div>
          <div className="home-content">
            <h1 className="home-title">{t('homePage.title')}</h1>
            <p className="home-tagline">{t('homePage.tagline')}</p>
            <div className="home-nav-buttons">
              <Link to="/tappeti" className="home-nav-button">{t('navbar.tappeti')}</Link>
              <Link to="/kilim" className="home-nav-button">{t('navbar.kilim')}</Link>
              <Link to="/services" className="home-nav-button">{t('navbar.services')}</Link>
              <Link to="/contact" className="home-nav-button">{t('navbar.contact')}</Link>
            </div>
          </div>
        </div>
        <h2 className="our-shop-title">{t('home.ourShop')}</h2>
        <ImageCarousel folder="homepage" />
        <ContactSnippet theme="dark" />
      </div>
    </>
  );
};

export default HomePage;
