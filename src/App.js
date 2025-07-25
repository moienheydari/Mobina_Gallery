import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { OverlayProvider } from './contexts/OverlayContext';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import KilimPage from './pages/KilimPage';
import TappetiPage from './pages/TappetiPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <OverlayProvider>
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/kilim" element={<KilimPage />} />
              <Route path="/tappeti" element={<TappetiPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </Router>
      </HelmetProvider>
    </OverlayProvider>
  );
}

export default App;
