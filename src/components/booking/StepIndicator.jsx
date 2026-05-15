import React from 'react';
import { useTranslation } from 'react-i18next';

const StepIndicator = ({ currentStep }) => {
  const { t } = useTranslation();

  const steps = [
    { id: 1, label: t('booking.step1.label') },
    { id: 2, label: t('booking.step2.label') },
    { id: 3, label: t('booking.step3.label') },
  ];

  return (
    <>
      <div
        role="list"
        aria-label={t('booking.progressAria')}
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '40px',
        }}
      >
        {steps.map((step, idx) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isPending = currentStep < step.id;

          return (
            <React.Fragment key={step.id}>
              <div
                role="listitem"
                aria-current={isActive ? 'step' : undefined}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background: isCompleted
                    ? 'rgba(197, 160, 89, 0.15)'
                    : isActive
                    ? 'var(--color-accent)'
                    : 'rgba(255,255,255,0.04)',
                  border: isCompleted
                    ? '1.5px solid var(--color-accent)'
                    : isActive
                    ? 'none'
                    : '1.5px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* 번호 원형 */}
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    background: isCompleted
                      ? 'var(--color-accent)'
                      : isActive
                      ? 'rgba(0,0,0,0.25)'
                      : 'rgba(255,255,255,0.08)',
                    color: isCompleted
                      ? 'var(--color-primary)'
                      : isActive
                      ? '#fff'
                      : 'var(--color-text-body)',
                  }}
                >
                  {isCompleted ? '✓' : step.id}
                </div>

                {/* 라벨 */}
                <span
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive
                      ? 'var(--color-primary)'
                      : isCompleted
                      ? 'var(--color-accent)'
                      : 'var(--color-text-body)',
                    wordBreak: 'keep-all',
                    lineHeight: 1.3,
                  }}
                >
                  {step.label}
                </span>
              </div>

              {/* 화살표 구분선 (마지막 제외) */}
              {idx < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'var(--color-glass-border)',
                    fontSize: '1.2rem',
                  }}
                >
                  ›
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default StepIndicator;

