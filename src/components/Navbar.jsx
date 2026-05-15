import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExhibitionsClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById('exhibitions');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('exhibitions');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      background: scrolled ? 'rgba(2, 12, 27, 0.95)' : 'rgba(2, 12, 27, 0.4)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
      transition: 'all 0.3s ease',
      zIndex: 1000,
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      textDecoration: 'none',
    },
    logoImg: {
      height: '45px', // 로고 높이 조절
      width: 'auto',
      objectFit: 'contain',
      filter: 'brightness(1.2)', // 이미지 선명도 조절
    },
    menu: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none',
      alignItems: 'center',
    },
    menuItem: {
      color: '#E6F1FF',
      fontSize: '1rem',
      fontWeight: '500',
      textDecoration: 'none',
      transition: 'color 0.2s',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: 0,
      fontFamily: 'inherit',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '30px',
    }
  };

  const menus = [
    { key: 'visit',       action: handleMenuClick },
    { key: 'exhibitions', action: handleExhibitionsClick },
    { key: 'education',   action: handleMenuClick },
    { key: 'collections', action: handleMenuClick },
    { key: 'about',       action: handleMenuClick },
  ];

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logoContainer} className="nav-logo">
        <img src="/logo.png" alt="국립중앙박물관 로고" style={styles.logoImg} />
      </Link>
      
      <div style={styles.rightSection} className="nav-right">
        <ul style={styles.menu} className="nav-menu">
          {menus.map((m, i) => (
            <li key={i}>
              <button
                style={styles.menuItem}
                className="nav-link"
                onClick={m.action}
              >
                {t(`nav.menu.${m.key}`)}
              </button>
            </li>
          ))}
          <li>
            <Link to="/booking" style={styles.menuItem} className="nav-link">
              {t('quickInfo.btnBooking')}
            </Link>
          </li>
          <li>
            <Link to="/directions" style={styles.menuItem} className="nav-link">
              {t('quickInfo.btnDirections')}
            </Link>
          </li>
        </ul>
        <LanguageSwitcher />
      </div>

      <style>{`
        .nav-link:hover {
          color: var(--color-accent) !important;
        }
        @media (max-width: 1200px) {
          .nav-menu {
            gap: 1.2rem !important;
          }
        }
        @media (max-width: 1024px) {
          .nav-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
