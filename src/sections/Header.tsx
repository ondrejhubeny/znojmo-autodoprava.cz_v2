import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Mail, CalendarCheck } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="container header-content">
        <a href="#" className="logo" aria-label="Autodoprava Chochola Domů">
          <span className="logo-main">Chochola</span>
          <span className="logo-sub">Autodoprava Znojmo</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav desktop-nav">
          <a href="#vozovy-park">Vozový park</a>
          <a href="#sluzby">Služby</a>
          <a href="#o-nas">Reference</a>
          <a href="#kontakt">Kontakt</a>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          <a 
            href={`tel:${CONTACT_INFO.phones[0]}`} 
            className="btn-phone" 
            aria-label={`Volejte ${CONTACT_INFO.phones[0]}`}
            title={`Volejte ${CONTACT_INFO.phones[0]}`}
          >
            <Phone size={17} />
            <span className="btn-phone-text">{CONTACT_INFO.phones[0]}</span>
          </a>

          <a href="#kontakt" className="btn btn-primary btn-header-cta">
            <CalendarCheck size={16} />
            <span>Poptat jízdu</span>
          </a>

          <button 
            className="hamburger-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Zavřít menu" : "Otevřít menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-drawer ${isMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <a href="#vozovy-park" onClick={handleLinkClick}>Vozový park</a>
          <a href="#sluzby" onClick={handleLinkClick}>Služby</a>
          <a href="#o-nas" onClick={handleLinkClick}>Reference</a>
          <a href="#kontakt" onClick={handleLinkClick}>Poptávka a kontakt</a>
        </nav>
        <div className="mobile-drawer-footer">
          <a href="#kontakt" onClick={handleLinkClick} className="btn btn-primary drawer-btn">
            <CalendarCheck size={18} /> Nezávazná poptávka
          </a>
          <a href={`tel:${CONTACT_INFO.phones[0]}`} className="btn btn-outline drawer-btn">
            <Phone size={18} /> {CONTACT_INFO.phones[0]}
          </a>
          <a href={`mailto:${CONTACT_INFO.email}`} className="btn btn-outline drawer-btn">
            <Mail size={18} /> {CONTACT_INFO.email}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
