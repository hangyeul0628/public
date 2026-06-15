import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = ({ openOnboarding }) => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Vite의 base 경로를 가져옵니다. (/public/)
  const baseUrl = import.meta.env.BASE_URL;

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
      color: '#ffffff', // 텍스트 로고 색상
    },
    logoImg: {
      height: '32px', // 이미지 크기 최적화
      width: 'auto',
      objectFit: 'contain',
      filter: 'brightness(0) invert(1)', // 검은색 로고를 흰색으로 반전
    },
    logoText: {
      fontSize: '1.25rem',
      fontWeight: '700',
      letterSpacing: '0.5px',
      whiteSpace: 'nowrap',
    },
    menu: {
      display: 'flex',
      gap: '1.5rem',
      listStyle: 'none',
      alignItems: 'center',
    },
    menuItem: {
      color: '#E6F1FF',
      fontSize: '0.95rem',
      fontWeight: '500',
      textDecoration: 'none',
      transition: 'color 0.2s',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: '8px 4px',
      fontFamily: 'inherit',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
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
        <img 
          src={`${baseUrl}logo.png`} 
          alt="로고 아이콘" 
          style={styles.logoImg} 
        />
        <span style={styles.logoText}>{t('nav.logo')}</span>
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
        
        {/* 온보딩 다시보기 가이드 버튼 */}
        <button 
          onClick={openOnboarding} 
          className="guide-button" 
          aria-label="Show User Guide"
          title={t('onboarding.btnRestart')}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </button>

        <LanguageSwitcher />
      </div>

      <style>{`
        .nav-link:hover {
          color: var(--color-accent) !important;
        }
        .guide-button {
          color: var(--color-text-title);
          opacity: 0.85;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0;
          box-sizing: border-box;
        }
        .guide-button:hover {
          color: var(--color-accent) !important;
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--color-accent);
          transform: scale(1.05);
          box-shadow: 0 0 10px rgba(197, 160, 89, 0.25);
        }
        @media (max-width: 1200px) {
          .nav-menu {
            gap: 1rem !important;
          }
          .logo-text {
            display: none; /* 화면이 좁아지면 텍스트는 숨기고 이미지만 표시 */
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
