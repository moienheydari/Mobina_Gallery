import React, { useContext } from 'react';
import { OverlayContext } from '../contexts/OverlayContext';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const Navbar = () => {
  const { inOverlay } = useContext(OverlayContext);
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navListRef = React.useRef(null);
  const hamburgerRef = React.useRef(null);
  if (inOverlay) return null;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Always close the menu when a navigation link is clicked
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      {/* Overlay for closing menu on empty space click in mobile view */}
      {isMobileMenuOpen && (
        <div
          className="navbar-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul role="navigation" className={`navbar-list ${isMobileMenuOpen ? 'active' : ''}`}>
        <li className="navbar-item"><NavLink to="/" className="navbar-link" onClick={closeMobileMenu}>{t('navbar.home')}</NavLink></li>
        <li className="navbar-item"><NavLink to="/tappeti" className="navbar-link" onClick={closeMobileMenu}>{t('navbar.tappeti')}</NavLink></li>
        <li className="navbar-item"><NavLink to="/kilim" className="navbar-link" onClick={closeMobileMenu}>{t('navbar.kilim')}</NavLink></li>
        <li className="navbar-item"><NavLink to="/services" className="navbar-link" onClick={closeMobileMenu}>{t('navbar.services')}</NavLink></li>
        <li className="navbar-item"><NavLink to="/contact" className="navbar-link" onClick={closeMobileMenu}>{t('navbar.contact')}</NavLink></li>
        <li className={`navbar-item language-switcher ${i18n.language}`}>
          <div className="lang-toggle-switch" onClick={() => changeLanguage(i18n.language === 'it' ? 'en' : 'it')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className={i18n.language === 'it' ? 'active' : ''}>IT</span>
            <span className={i18n.language === 'en' ? 'active' : ''}>EN</span>
            <div className="slider"></div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
