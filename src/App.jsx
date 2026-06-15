import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Directions from './pages/Directions';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import OnboardingModal from './components/OnboardingModal';

function App() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // 로딩 화면이 끝났을 때 온보딩 모달 노출 여부 결정
  const handleLoadingComplete = () => {
    setIsLoading(false);
    // 로딩 스플래시 종료 직후 화면 상단 스크롤 강제
    window.scrollTo({ top: 0, behavior: 'instant' });
    const completed = localStorage.getItem('vibe_onboarding_completed');
    if (!completed) {
      setIsOnboardingOpen(true);
    }
  };

  const styles = {
    container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' },
    footer: { padding: '40px 10%', borderTop: '1px solid var(--color-glass-border)', textAlign: 'center', color: 'var(--color-text-body)', fontSize: 'max(0.875rem, 12px)', marginTop: 'auto', wordBreak: 'keep-all', lineHeight: '1.5' }
  };

  return (
    <>
      {/* 웰컴 로딩 화면 */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* 온보딩 모달 */}
      <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />

      {/* ★ basename을 다시 넣었습니다. 이게 없으면 깃허브에서 첫 화면이 안 뜹니다. */}
      <BrowserRouter basename="/public">
        <div style={styles.container}>
          {/* 가이드 보기 기능을 위해 Navbar에 openOnboarding 함수 전달 */}
          <Navbar openOnboarding={() => setIsOnboardingOpen(true)} />
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
    </>
  );
}
export default App;