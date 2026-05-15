import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Directions from './pages/Directions';
import LanguageSwitcher from './components/LanguageSwitcher';
import Navbar from './components/Navbar';


function App() {
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const styles = {
    container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' },
    footer: { padding: '40px 10%', borderTop: '1px solid var(--color-glass-border)', textAlign: 'center', color: 'var(--color-text-body)', fontSize: 'max(0.875rem, 12px)', marginTop: 'auto', wordBreak: 'keep-all', lineHeight: '1.5' }
  };

  return (
    // ★ basename을 다시 넣었습니다. 이게 없으면 깃허브에서 첫 화면이 안 뜹니다.
    <BrowserRouter basename="/public">
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
    </BrowserRouter>
  );
}
export default App;