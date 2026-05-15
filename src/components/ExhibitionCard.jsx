import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ExhibitionCard = ({ title, description, isClosed = false, tagText, imageUrl }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const styles = {
    card: {
      padding: '0',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      opacity: isClosed ? 0.6 : 1,
      filter: isClosed ? 'grayscale(80%)' : 'none',
      transition: 'all 0.3s ease',
      wordBreak: 'keep-all',
      background: 'transparent',
      border: 'none',
      boxShadow: 'none',
    },
    imagePlaceholder: {
      aspectRatio: '3/4',
      ...(imageUrl 
        ? {
            backgroundImage: `url("${imageUrl}")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }
        : {
            background: `linear-gradient(135deg, var(--color-secondary), ${isClosed ? 'var(--color-bg-base)' : 'var(--color-accent)'})`
          }),
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontStyle: 'italic',
      color: 'rgba(255, 255, 255, 0.5)',
      overflow: 'hidden',
    },
    tag: {
      position: 'absolute',
      top: '0',
      left: '0',
      background: '#000',
      color: '#fff',
      padding: '4px 12px',
      fontSize: '12px',
      fontWeight: 'bold',
    },
    title: {
      fontSize: '18px',
      marginBottom: '8px',
      fontWeight: '600',
    },
    description: {
      fontSize: '14px',
      color: 'var(--color-text-body)',
      marginBottom: '16px',
      flexGrow: 1,
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: '12px'
    },
    statusText: {
      color: isClosed ? 'var(--color-status-closed)' : 'var(--color-status-open)',
      fontWeight: 600,
      fontSize: '12px',
      border: '1px solid currentColor',
      padding: '2px 8px',
    },
    button: {
      background: isClosed ? 'transparent' : '#f0f0f0',
      color: isClosed ? 'var(--color-text-body)' : '#333',
      padding: '4px 12px',
      fontSize: '12px',
      fontWeight: 600,
      border: isClosed ? '1px solid var(--color-glass-border)' : 'none',
      cursor: isClosed ? 'not-allowed' : 'pointer',
    }
  };

  // 고유 ID 생성을 위해 title의 공백 제거
  const titleId = `exhibit-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <article className="glass-panel hover-effect" style={styles.card} aria-labelledby={titleId}>
      <div style={styles.imagePlaceholder} aria-hidden="true">
        [ {tagText} ]
      </div>
      <h3 id={titleId} className="text-h3" style={styles.title}>{title}</h3>
      <p className="text-body" style={styles.description}>{description}</p>
      
      <footer style={styles.footer}>
        <span style={styles.statusText} aria-live="polite">
          <span className="visually-hidden">{t('exhibitions.ariaStatus')}</span>
          {isClosed ? t('exhibitions.statusClosed') : t('exhibitions.statusOpen')}
        </span>
        <button 
          style={styles.button} 
          disabled={isClosed}
          aria-disabled={isClosed}
          onClick={() => navigate(`/booking?item=${encodeURIComponent(title)}`)}
          aria-label={isClosed ? t('exhibitions.ariaMaintenance', { title }) : t('exhibitions.ariaBook', { title })}
        >
          {isClosed ? t('exhibitions.btnMaintenance') : t('exhibitions.btnBook')}
        </button>
      </footer>

      <style>{`
        .hover-effect:hover, .hover-effect:focus-within {
          transform: ${isClosed ? 'none' : 'translateY(-8px)'};
          border-color: ${isClosed ? 'var(--color-glass-border)' : 'var(--color-accent)'};
        }
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </article>
  );
};

export default ExhibitionCard;
