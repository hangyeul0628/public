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

  // 전시 메뉴: 홈이면 바로 스크롤, 다른 페이지면 홈으로 이동 후 스크롤
  const handleExhibitionsClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById('exhibitions');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/');
      // 페이지 이동 후 스크롤 (약간의 딜레이 필요)
      setTimeout(() => {
        const el = document.getElementById('exhibitions');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  // 일반 메뉴: 홈(/)으로 이동
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
      background: 'none',
      border: 'none',
      padding: 0,
      fontFamily: 'inherit',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    }
  };

  // key별 동작 정의
  // - exhibitions: 주요전시 스크롤
  // - 나머지(visit, education, collections, about): 홈으로 이동
  const menus = [
    { key: 'visit',       action: handleMenuClick },
    { key: 'exhibitions', action: handleExhibitionsClick },
    { key: 'education',   action: handleMenuClick },
    { key: 'collections', action: handleMenuClick },
    { key: 'about',       action: handleMenuClick },
  ];

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo} className="nav-logo">{t('nav.logo')}</Link>
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
          {/* 예약하기 */}
          <li>
            <Link to="/booking" style={styles.menuItem} className="nav-link">
              {t('quickInfo.btnBooking')}
            </Link>
          </li>
          {/* 오시는 길 */}
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
