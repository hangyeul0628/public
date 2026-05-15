import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Directions from './pages/Directions';
import LanguageSwitcher from './components/LanguageSwitcher';
import Navbar from './components/Navbar';

function App() {
  const { t, i18n } = useTranslation();

  // 현재 언어에 맞춰 html 태그의 lang 속성을 동기화 (CSS 폰트 변수 트리거 용도)
  React.useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    footer: {
      padding: '40px 10%',
      borderTop: '1px solid var(--color-glass-border)',
      textAlign: 'center',
      color: 'var(--color-text-body)',
      fontSize: 'max(0.875rem, 12px)',
      marginTop: 'auto',
      wordBreak: 'keep-all',
      lineHeight: '1.5',
    }
  };

  return (
    <HashRouter>
      <div style={styles.container}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/directions" element={<Directions />} />
        </Routes>
        
        <footer style={styles.footer} role="contentinfo">
          <p>{t('footer.text')}</p>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
