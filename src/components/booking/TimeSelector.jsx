import React from 'react';
import { useTranslation } from 'react-i18next';

const TimeSelector = ({ selectedTime, onSelect }) => {
  const { t } = useTranslation();

  const times = [
    { time: '10:00', full: true },
    { time: '11:00', full: false },
    { time: '13:00', full: false },
    { time: '14:00', full: false },
    { time: '15:00', full: false },
    { time: '16:00', full: false }
  ];

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      wordBreak: 'keep-all',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
    },
    timeBtn: (isFull, isSelected) => ({
      padding: '12px',
      border: '1px solid var(--color-glass-border)',
      borderRadius: 'var(--radius-md)',
      background: isSelected ? 'var(--color-accent)' : 'var(--color-secondary)',
      color: isFull ? 'rgba(255,255,255,0.3)' : (isSelected ? 'var(--color-primary)' : 'var(--color-text-title)'),
      cursor: isFull ? 'not-allowed' : 'pointer',
      textAlign: 'center',
      minHeight: '44px', // a11y touch target
      textDecoration: isFull ? 'line-through' : 'none',
      fontWeight: isSelected ? 'bold' : 'normal',
      transition: 'all 0.2s',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    })
  };

  return (
    <div style={styles.container}>
      <h3 className="text-h3" style={{color: 'var(--color-text-body)', marginBottom: '10px'}}>{t('booking.time.title')}</h3>
      
      <div style={styles.grid} role="group" aria-label={t('booking.time.aria')}>
        {times.map((timeObj, i) => (
          <button
            key={i}
            style={styles.timeBtn(timeObj.full, selectedTime === timeObj.time)}
            disabled={timeObj.full}
            aria-disabled={timeObj.full}
            aria-pressed={selectedTime === timeObj.time}
            aria-label={timeObj.full ? t('booking.time.ariaFull', { time: timeObj.time }) : t('booking.time.ariaSelect', { time: timeObj.time })}
            onClick={() => !timeObj.full && onSelect(timeObj.time)}
            className={timeObj.full ? '' : 'hover-time'}
          >
            <span>{timeObj.time}</span>
            {timeObj.full && <span aria-hidden="true" style={{fontSize: '0.75rem', marginTop: '4px'}}>{t('booking.time.full')}</span>}
          </button>
        ))}
      </div>

      <style>{`
        .hover-time:hover {
          border-color: var(--color-accent) !important;
          background: rgba(197, 160, 89, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default TimeSelector;
