import React, { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X, Mail, CalendarCheck, ChevronDown } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useLanguage, type Language } from '../i18n';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'cz', label: 'CZ' },
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="container header-content">
        <a href="#" className="logo" aria-label="Znojmo Autodoprava">
          <span className="logo-main">Znojmo</span>
          <span className="logo-sub">{t.logoSub}</span>
        </a>

        {/* Clean Minimal Header Actions: Phone + Compact Language Dropdown + Hamburger */}
        <div className="header-actions">
          <a
            href={`tel:${CONTACT_INFO.phones[0]}`}
            className="btn-phone"
            aria-label={`${t.nav.callTitle} ${CONTACT_INFO.phones[0]}`}
            title={`${t.nav.callTitle} ${CONTACT_INFO.phones[0]}`}
          >
            <Phone size={17} />
            <span className="btn-phone-text">{CONTACT_INFO.phones[0]}</span>
          </a>

          {/* Single Compact Language Dropdown Button */}
          <div className="lang-dropdown" ref={langDropdownRef}>
            <button
              type="button"
              className="lang-dropdown-trigger"
              onClick={() => setIsLangOpen((prev) => !prev)}
              aria-expanded={isLangOpen}
              aria-label="Language"
            >
              <span>{lang.toUpperCase()}</span>
              <ChevronDown size={13} className={`lang-chevron ${isLangOpen ? 'open' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="lang-dropdown-menu">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    className={`lang-dropdown-item ${lang === item.code ? 'active' : ''}`}
                    onClick={() => {
                      setLang(item.code);
                      setIsLangOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="hamburger-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Backdrop overlay for desktop drawer */}
      {isMenuOpen && (
        <div className="menu-drawer-backdrop" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Slide-out Navigation Drawer (Desktop right panel & Mobile fullscreen) */}
      <div className={`mobile-menu-drawer ${isMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <a href="#vozovy-park" onClick={handleLinkClick}>{t.nav.fleet}</a>
          <a href="#sluzby" onClick={handleLinkClick}>{t.nav.services}</a>
          <a href="#o-nas" onClick={handleLinkClick}>{t.nav.references}</a>
          <a href="#kontakt" onClick={handleLinkClick}>{t.nav.contact}</a>
        </nav>

        <div className="mobile-drawer-footer">
          <div className="lang-switcher mobile-lang-switcher" role="group" aria-label="Language switcher">
            {LANGUAGES.map((item) => (
              <button
                key={item.code}
                type="button"
                className={`lang-btn ${lang === item.code ? 'active' : ''}`}
                onClick={() => setLang(item.code)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <a href="#poptavkovy-formular" onClick={handleLinkClick} className="btn btn-primary drawer-btn">
            <CalendarCheck size={18} /> {t.nav.ctaMobile}
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
