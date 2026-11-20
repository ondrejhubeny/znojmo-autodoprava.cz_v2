import React from 'react';

interface FooterProps {
  onOpenGdpr?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGdpr }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#" className="logo footer-logo" aria-label="Znojmo Autodoprava Domů">
              <span className="logo-main">Znojmo</span>
              <span className="logo-sub">Autodoprava</span>
            </a>
            <p className="footer-tagline">Prémiová osobní, mikrobusová a autobusová doprava</p>
          </div>

          <nav className="footer-nav" aria-label="Patička navigace">
            <a href="#vozovy-park">Vozový park</a>
            <a href="#sluzby">Služby</a>
            <a href="#o-nas">Reference</a>
            <a href="#kontakt">Kontakt</a>
            <button type="button" className="footer-gdpr-link" onClick={onOpenGdpr}>
              Ochrana osobních údajů (GDPR)
            </button>
          </nav>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} znojmo-autodoprava.cz &bull; Všechna práva vyhrazena.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
