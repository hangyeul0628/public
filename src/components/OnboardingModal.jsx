import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './OnboardingModal.css';

const OnboardingModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    // 로컬 스토리지에 완료 여부 저장
    localStorage.setItem('vibe_onboarding_completed', 'true');
    onClose();
  };

  const handleSkipAlways = () => {
    handleComplete();
  };

  return (
    <div className="onboarding-overlay" role="dialog" aria-modal="true" aria-label="Onboarding Guide">
      <div className="onboarding-modal glass-panel">
        
        {/* 우측 상단 닫기 X 버튼 */}
        <button className="onboarding-close-btn" onClick={onClose} aria-label="Close guide">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* 슬라이더 컨테이너 */}
        <div className="onboarding-slider-viewport">
          <div 
            className="onboarding-slider-track" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            
            {/* Slide 1: 웰컴 & 문화 예술 */}
            <div className="onboarding-slide">
              <div className="slide-graphic">
                <svg viewBox="0 0 200 200" className="slide-svg s1-svg">
                  <defs>
                    <radialGradient id="ring-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* 중앙 Glow 배경 */}
                  <circle cx="100" cy="100" r="60" fill="url(#ring-glow)" />
                  {/* 퍼져나가는 파동 라인 */}
                  <circle className="wave-pulse wave-1" cx="100" cy="100" r="45" />
                  <circle className="wave-pulse wave-2" cx="100" cy="100" r="60" />
                  <circle className="wave-pulse wave-3" cx="100" cy="100" r="75" />
                  {/* 회전하는 기하학 골든 링 */}
                  <circle className="gold-ring ring-outer" cx="100" cy="100" r="40" />
                  <circle className="gold-ring ring-inner" cx="100" cy="100" r="28" />
                  {/* 중심 브랜드 엠블럼 심볼 */}
                  <polygon className="center-symbol" points="100,82 115,112 85,112" />
                </svg>
              </div>
              <h2 className="slide-title">{t('onboarding.slide1.title')}</h2>
              <p className="slide-desc">{t('onboarding.slide1.desc')}</p>
            </div>

            {/* Slide 2: 예약 시스템 */}
            <div className="onboarding-slide">
              <div className="slide-graphic">
                <svg viewBox="0 0 200 200" className="slide-svg s2-svg">
                  {/* 반짝이는 별 효과들 */}
                  <g className="stars-group">
                    <path className="star star-1" d="M40,60 L42,65 L47,65 L43,68 L45,73 L40,70 L35,73 L37,68 L33,65 L38,65 Z" fill="var(--color-accent)" />
                    <path className="star star-2" d="M160,50 L161.5,54 L165.5,54 L162,56.5 L163.5,60.5 L160,58 L156.5,60.5 L158,56.5 L154.5,54 L158.5,54 Z" fill="var(--color-accent)" />
                    <path className="star star-3" d="M50,140 L51.5,144 L155.5,144 L152,146.5 Z" fill="var(--color-accent)" />
                  </g>
                  {/* 티켓 카드 아웃라인 */}
                  <rect className="ticket-card" x="55" y="45" width="90" height="110" rx="8" />
                  {/* 티켓 절취선 원 홈 (티켓 느낌 부여) */}
                  <circle cx="55" cy="100" r="8" fill="var(--color-bg-base)" className="ticket-notch" />
                  <circle cx="145" cy="100" r="8" fill="var(--color-bg-base)" className="ticket-notch" />
                  {/* 티켓 내부 데코 레이어 */}
                  <line x1="70" y1="70" x2="130" y2="70" className="ticket-line line-thick" />
                  <line x1="70" y1="85" x2="110" y2="85" className="ticket-line" />
                  <line x1="70" y1="100" x2="130" y2="100" className="ticket-line line-dashed" />
                  {/* 예약 확인 체크마크 드로잉 */}
                  <circle className="check-bg" cx="100" cy="122" r="16" />
                  <path className="check-mark" d="M93,122 L98,127 L108,117" />
                </svg>
              </div>
              <h2 className="slide-title">{t('onboarding.slide2.title')}</h2>
              <p className="slide-desc">{t('onboarding.slide2.desc')}</p>
            </div>

            {/* Slide 3: 스마트 편의 안내 */}
            <div className="onboarding-slide">
              <div className="slide-graphic">
                <svg viewBox="0 0 200 200" className="slide-svg s3-svg">
                  {/* 나침반 배경 격자 */}
                  <circle cx="100" cy="100" r="65" className="compass-rim" />
                  <line x1="100" y1="35" x2="100" y2="165" className="compass-axis" />
                  <line x1="35" y1="100" x2="165" y2="100" className="compass-axis" />
                  
                  {/* 나침반 흔들리는 바늘 */}
                  <g className="compass-needle">
                    <polygon points="100,50 110,100 100,115" className="needle-north" />
                    <polygon points="100,150 110,100 100,115" className="needle-south" />
                    <circle cx="100" cy="100" r="6" fill="#020C1B" stroke="var(--color-accent)" strokeWidth="2" />
                  </g>
                  
                  {/* 콩콩 바운스하는 지도 핀 */}
                  <g className="map-pin-group">
                    {/* 핀의 바닥 그림자 */}
                    <ellipse className="pin-shadow" cx="135" cy="125" rx="10" ry="3.5" />
                    {/* 지도 핀 본체 */}
                    <path className="pin-icon" d="M135,85 C125,85 117,93 117,103 C117,115 135,125 135,125 C135,125 153,115 153,103 C153,93 145,85 135,85 Z" />
                    {/* 핀 내부 작은 흰색 홀 */}
                    <circle cx="135" cy="99" r="5" fill="#ffffff" />
                  </g>
                </svg>
              </div>
              <h2 className="slide-title">{t('onboarding.slide3.title')}</h2>
              <p className="slide-desc">{t('onboarding.slide3.desc')}</p>
            </div>

          </div>
        </div>

        {/* 푸터 영역 (인디케이터 & 이동 제어) */}
        <div className="onboarding-footer">
          {/* 다시 보지 않기 */}
          <button className="onboarding-skip-btn" onClick={handleSkipAlways}>
            {t('onboarding.btnSkip')}
          </button>

          {/* 도트 인디케이터 (Stretch Dot Effect) */}
          <div className="onboarding-dots" role="tablist">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                className={`onboarding-dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                role="tab"
                aria-selected={currentSlide === index}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* 이전/다음 버튼 제어 */}
          <div className="onboarding-nav-btns">
            {currentSlide > 0 && (
              <button className="onboarding-btn btn-prev" onClick={handlePrev}>
                {t('onboarding.btnPrev')}
              </button>
            )}
            <button className="onboarding-btn btn-next" onClick={handleNext}>
              {currentSlide === totalSlides - 1 ? t('onboarding.btnStart') : t('onboarding.btnNext')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OnboardingModal;
