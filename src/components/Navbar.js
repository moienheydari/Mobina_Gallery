import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`navbar-list ${isMobileMenuOpen ? 'active' : ''}`}>
        <li className="navbar-item"><NavLink to="/" className="navbar-link" onClick={toggleMobileMenu}>Home</NavLink></li>
        <li className="navbar-item"><NavLink to="/kilim" className="navbar-link" onClick={toggleMobileMenu}>Kilim</NavLink></li>
        <li className="navbar-item"><NavLink to="/tappeti" className="navbar-link" onClick={toggleMobileMenu}>Tappeti</NavLink></li>
        <li className="navbar-item"><NavLink to="/services" className="navbar-link" onClick={toggleMobileMenu}>Servizi</NavLink></li>
        <li className="navbar-item"><NavLink to="/contact" className="navbar-link" onClick={toggleMobileMenu}>Contattaci</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
