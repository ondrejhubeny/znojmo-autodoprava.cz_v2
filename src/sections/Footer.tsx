import React from 'react';
import { useLanguage } from '../i18n';

interface FooterProps {
  onOpenGdpr?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGdpr }) => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#" className="logo footer-logo" aria-label="Znojmo Autodoprava">
              <span className="logo-main">Znojmo</span>
              <span className="logo-sub">{t.logoSub}</span>
            </a>
            <p className="footer-tagline">{t.footer.tagline}</p>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} znojmo-autodoprava.cz &bull; {t.footer.rights} &bull;{' '}
              <button type="button" className="footer-gdpr-link" onClick={onOpenGdpr}>
                {t.footer.gdprLink}
              </button>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
