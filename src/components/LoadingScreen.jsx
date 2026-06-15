import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1.5초 후에 페이드아웃 애니메이션 시작
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    // 1.8초 후에 로딩 완전히 종료하고 메인 화면 진입
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1850);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loading-container ${fadeOut ? 'fade-out' : ''}`} role="dialog" aria-modal="true" aria-label="Loading VIBE Portal">
      <div className="loading-content">
        {/* 기하학적이고 고급스러운 골드 SVG 로딩 서클 및 파비콘 로고 */}
        <div className="svg-wrapper">
          <svg className="loading-svg" viewBox="0 0 100 100">
            <defs>
              <clipPath id="logo-circle-clip">
                <circle cx="50" cy="50" r="28" />
              </clipPath>
            </defs>
            <circle className="bg-circle" cx="50" cy="50" r="45" />
            <circle className="accent-circle" cx="50" cy="50" r="45" />
            
            {/* 로고 뒷배경 서클 (가시성 확보) */}
            <circle className="inner-logo-bg" cx="50" cy="50" r="28" />
            
            {/* 파비콘 로고 이미지 */}
            <image 
              href={`${import.meta.env.BASE_URL}logo.png`} 
              x="22" 
              y="22" 
              width="56" 
              height="56" 
              clipPath="url(#logo-circle-clip)"
              className="inner-logo-img"
            />
          </svg>
        </div>
        
        {/* 텍스트 타이포그래피 모션 */}
        <div className="brand-text-container">
          <h1 className="brand-logo">V I B E</h1>
          <p className="brand-sub">MUSEUM GUEST PORTAL</p>
        </div>
        
        {/* 하단의 얇고 정교한 게이지 모션 */}
        <div className="progress-bar-container">
          <div className="progress-bar-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
