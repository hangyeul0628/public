import React from 'react';
import { useTranslation } from 'react-i18next';

const CalendarSelector = ({ selectedDate, onSelect }) => {
  const { t } = useTranslation();
  
  // Simplified static calendar for May 2026 for demonstration
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDayOfWeek = 5; // May 1, 2026 is a Friday

  const styles = {
    container: {
      background: 'var(--color-secondary)',
      padding: '24px',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-glass-border)',
      wordBreak: 'keep-all',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '8px',
      marginTop: '16px',
    },
    dayHeader: {
      textAlign: 'center',
      fontSize: 'max(0.75rem, 12px)',
      color: 'var(--color-text-body)',
      marginBottom: '8px',
    },
    dayBtn: (isMuted, isSelected) => ({
      aspectRatio: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      background: isSelected ? 'var(--color-accent)' : 'transparent',
      color: isMuted ? 'rgba(255,255,255,0.2)' : (isSelected ? 'var(--color-primary)' : 'var(--color-text-title)'),
      cursor: isMuted ? 'not-allowed' : 'pointer',
      fontWeight: isSelected ? 'bold' : 'normal',
      minHeight: '44px', // a11y touch target
      minWidth: '44px',
      border: 'none',
      position: 'relative',
    })
  };

  const dayLabels = t('booking.calendar.days', { returnObjects: true });

  return (
    <div style={styles.container}>
      <h3 className="text-h3" style={{color: 'var(--color-text-body)', marginBottom: '10px'}}>{t('booking.calendar.title')}</h3>
      
      <div style={styles.grid} role="grid" aria-label={t('booking.calendar.aria')}>
        {Array.isArray(dayLabels) && dayLabels.map((lbl, i) => (
          <div key={i} style={styles.dayHeader} role="columnheader">{lbl}</div>
        ))}

        {/* Empty slots for days before the 1st */}
        {Array.from({ length: startDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} role="presentation"></div>
        ))}

        {days.map(day => {
          const currentDayOfWeek = (startDayOfWeek + day - 1) % 7;
          const isMonday = currentDayOfWeek === 1; // Error-proofing: Closed on Mondays
          const isSelected = selectedDate === day;

          return (
            <button
              key={day}
              style={styles.dayBtn(isMonday, isSelected)}
              disabled={isMonday}
              aria-disabled={isMonday}
              aria-pressed={isSelected}
              aria-label={isMonday ? t('booking.calendar.ariaClosed', { day }) : t('booking.calendar.ariaOpen', { day })}
              onClick={() => !isMonday && onSelect(day)}
              className={isMonday ? 'tooltip-trigger' : 'hover-day'}
              title={isMonday ? t('booking.calendar.tooltipClosed') : ""}
            >
              <span aria-hidden="true">{day}</span>
            </button>
          );
        })}
      </div>

      <style>{`
        .hover-day:hover {
          background: rgba(197, 160, 89, 0.2) !important;
          color: var(--color-accent) !important;
        }
      `}</style>
    </div>
  );
};

export default CalendarSelector;
