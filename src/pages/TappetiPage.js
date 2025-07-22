import React, { useContext } from 'react';
import { OverlayContext } from '../contexts/OverlayContext';
import { useTranslation } from 'react-i18next';
import ImageCarousel from '../components/ImageCarousel';
import ContactSnippet from '../components/ContactSnippet';
import './TappetiPage.css';

const TappetiPage = () => {
  const { inOverlay } = useContext(OverlayContext);
  const { t } = useTranslation();

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 70; // Adjust this value to the actual height of your main navbar
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - 15;
      const offsetPosition = sectionTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (

    <div className="tappeti-page-container">
      {!inOverlay && (
        <nav className="side-nav">
          <ul>
            <li>
              <button onClick={() => scrollToSection('modern-section')}>
                {t('tappetiPage.navModern', 'Modern')}
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('antique-section')}>
                {t('tappetiPage.navAntique', 'Antique')}
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Main Content */}
      <main className="tappeti-content">
        <h1 className="tappeti-main-title">{t('tappetiPage.title')}</h1>

        <section id="modern-section" className="tappeti-collection">
          <h2 className="collection-title">{t('tappetiPage.modernTitle', 'Modern Collection')}</h2>
          <ImageCarousel folder="tappeti/modern" />
        </section>

        <section id="antique-section" className="tappeti-collection">
          <h2 className="collection-title">{t('tappetiPage.antiqueTitle', 'Antique Collection')}</h2>
          <ImageCarousel folder="tappeti/antique" />
        </section>

        <ContactSnippet />
      </main>
    </div>
  );
};

export default TappetiPage;
