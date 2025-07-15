import React from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import FloatingParticles from '../components/FloatingParticles';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="three-canvas-container">
        <Canvas camera={{ position: [0, 0, 30] }}>
          <FloatingParticles />
        </Canvas>
      </div>
      <div className="home-content">
        <h1 className="home-title">Galleria Mobina</h1>
        <p className="home-tagline">Scopri l'Arte dei Tappeti Persiani</p>
        <div className="home-nav-buttons">
          <Link to="/kilim" className="home-nav-button">Kilim</Link>
          <Link to="/tappeti" className="home-nav-button">Tappeti</Link>
          <Link to="/services" className="home-nav-button">Servizi</Link>
          <Link to="/contact" className="home-nav-button">Contattaci</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
