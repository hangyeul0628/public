import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const QuickInfoBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '24px 10%',
      background: 'var(--color-bg-base)',
      borderBottom: '1px solid var(--color-glass-border)',
      flexWrap: 'wrap',
      gap: '20px',
    },
    infoGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      color: 'var(--color-text-body)',
      fontSize: 'max(0.875rem, 14px)',
    },
    infoLabel: {
      fontWeight: '600',
      color: 'var(--color-text-title)',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    actionGroup: {
      display: 'flex',
      gap: '12px',
    },
    button: {
      padding: '12px 24px',
      borderRadius: 'var(--radius-full)',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: '1px solid var(--color-accent)',
      background: 'transparent',
      color: 'var(--color-accent)',
    },
    primaryButton: {
      padding: '12px 24px',
      borderRadius: 'var(--radius-full)',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: '1px solid var(--color-accent)',
      background: 'var(--color-accent)',
      color: 'var(--color-primary)',
      boxSizing: 'border-box',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.infoGroup}>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>{t('quickInfo.hoursTitle')}</span>
          <span>{t('quickInfo.hoursText')}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>{t('quickInfo.feeTitle')}</span>
          <span>{t('quickInfo.feeText')}</span>
        </div>
      </div>
      <div style={styles.actionGroup}>
        <button 
          style={styles.button} 
          onClick={() => navigate('/directions')}
          onMouseOver={(e) => { e.target.style.background = 'var(--color-accent)'; e.target.style.color = 'var(--color-primary)'; }}
          onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--color-accent)'; }}
        >
          {t('quickInfo.btnDirections')}
        </button>
        <button 
          style={styles.primaryButton} 
          onClick={() => navigate('/booking')}
          onMouseOver={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--color-accent)'; }}
          onMouseOut={(e) => { e.target.style.background = 'var(--color-accent)'; e.target.style.color = 'var(--color-primary)'; }}
        >
          {t('quickInfo.btnBooking')}
        </button>
      </div>
    </div>
  );
};

export default QuickInfoBar;
