import React from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { useTranslation } from 'react-i18next';
import FloatingParticles from '../components/FloatingParticles';
import './HomePage.css';
import ContactSnippet from '../components/ContactSnippet';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="home-page-wrapper">
      <div className="three-canvas-container">
        <Canvas camera={{ position: [0, 0, 30] }}>
          <FloatingParticles />
        </Canvas>
      </div>
      <div className="home-container">
        <div className="hero-image"></div>
        <div className="home-content">
          <h1 className="home-title">{t('homePage.title')}</h1>
          <p className="home-tagline">{t('homePage.tagline')}</p>
          <div className="home-nav-buttons">
            <Link to="/kilim" className="home-nav-button">{t('navbar.kilim')}</Link>
            <Link to="/tappeti" className="home-nav-button">{t('navbar.tappeti')}</Link>
            <Link to="/services" className="home-nav-button">{t('navbar.services')}</Link>
            <Link to="/contact" className="home-nav-button">{t('navbar.contact')}</Link>
          </div>
        </div>
      </div>
      <ContactSnippet theme="dark" />
    </div>
  );
};

export default HomePage;
