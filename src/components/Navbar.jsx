import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const styles = {
    nav: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 5%',
      background: scrolled ? 'rgba(2, 12, 27, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
      transition: 'all 0.3s ease',
      zIndex: 1000,
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#ffffff',
      textDecoration: 'none',
      letterSpacing: '1px',
    },
    menu: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none',
    },
    menuItem: {
      color: '#E6F1FF',
      fontSize: '1rem',
      fontWeight: '500',
      textDecoration: 'none',
      transition: 'color 0.2s',
      cursor: 'pointer',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    }
  };

  const menus = [
    { key: 'visit' },
    { key: 'exhibitions' },
    { key: 'education' },
    { key: 'collections' },
    { key: 'about' }
  ];

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo} className="nav-logo">{t('nav.logo')}</Link>
      <div style={styles.rightSection} className="nav-right">
        <ul style={styles.menu} className="nav-menu">
          {menus.map((m, i) => (
            <li key={i}>
              <a style={styles.menuItem} className="nav-link" href="#">{t(`nav.menu.${m.key}`)}</a>
            </li>
          ))}
        </ul>
        <LanguageSwitcher />
      </div>
      <style>{`
        .nav-link:hover {
          color: var(--color-accent) !important;
        }
        @media (max-width: 1024px) {
          .nav-menu {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .nav-logo {
            font-size: 1.1rem !important;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 60%;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
