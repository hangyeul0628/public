import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      // KST (UTC+9) 기준 시간 계산 (간이 구현)
      const hour = (now.getUTCHours() + 9) % 24;
      
      if (hour >= 10 && hour < 18) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const styles = {
    dashboard: {
      background: 'rgba(23, 42, 69, 0.7)',
      padding: '16px 24px',
      borderRadius: 'var(--radius-md)',
      display: 'inline-flex',
      alignItems: 'center',
      marginBottom: '40px',
      border: '1px solid var(--color-glass-border)',
      wordBreak: 'keep-all',
      flexWrap: 'wrap',
      gap: '12px'
    },
    badge: {
      background: isOpen ? 'var(--color-status-open)' : 'var(--color-status-closed)',
      color: 'var(--color-primary)',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: 'max(0.75rem, 12px)',
      fontWeight: 'bold',
    },
    text: {
      color: 'var(--color-text-title)',
      fontSize: 'max(0.875rem, 12px)',
    }
  };

  const timeText = t(isOpen ? 'dashboard.openTime' : 'dashboard.tomorrowTime');
  const badgeText = t(isOpen ? 'dashboard.badgeOpen' : 'dashboard.badgeClosed');
  const ariaStatus = t(isOpen ? 'dashboard.ariaOpen' : 'dashboard.ariaClosed');

  return (
    <div style={styles.dashboard} role="status" aria-live="polite" aria-atomic="true">
      <div style={styles.badge}>
        <span>{badgeText}</span>
      </div>
      <span style={styles.text}>
        {timeText} 
        <span style={{opacity: 0.6, marginLeft: '12px'}} className="live-updates-text">
           {t('dashboard.liveUpdates')}
        </span>
      </span>
      <style>{`
        .live-updates-text {
          display: inline;
        }
        @media (max-width: 768px) {
          .live-updates-text {
            display: block;
            margin-left: 0 !important;
            margin-top: 4px;
            opacity: 0.75;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
