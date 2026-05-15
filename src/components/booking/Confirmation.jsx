import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Confirmation = ({ data }) => {
  const { t } = useTranslation();

  const styles = {
    container: {
      textAlign: 'center',
      padding: '40px 20px',
      background: 'var(--color-secondary)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-glass-border)',
      wordBreak: 'keep-all',
    },
    successIcon: {
      width: '80px',
      height: '80px',
      background: 'rgba(197, 160, 89, 0.2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      color: 'var(--color-accent)',
      fontSize: '2rem',
    },
    title: {
      color: 'var(--color-text-title)',
      marginBottom: '16px',
    },
    qrBox: {
      background: 'rgba(255, 255, 255, 0.05)',
      padding: '32px',
      borderRadius: 'var(--radius-md)',
      maxWidth: '300px',
      margin: '0 auto 40px',
      border: '1px dashed var(--color-glass-border)',
    },
    qrPlaceholder: {
      width: '150px',
      height: '150px',
      background: 'var(--color-bg-base)',
      margin: '0 auto 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-text-body)',
      fontSize: '0.875rem',
    },
    btn: {
      display: 'inline-block',
      background: 'var(--color-accent)',
      color: 'var(--color-primary)',
      padding: '12px 32px',
      borderRadius: 'var(--radius-md)',
      fontWeight: 600,
      textDecoration: 'none',
      minHeight: '44px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.successIcon} aria-hidden="true">✓</div>
      <h2 className="text-h2" style={styles.title}>{t('booking.confirm.title')}</h2>
      <p className="text-body" style={{marginBottom: '40px'}}>
        {t('booking.confirm.ticketSent')} <strong>{data.email}</strong>
      </p>
      
      <div style={styles.qrBox} aria-label={t('booking.confirm.qrAria')}>
        <div style={styles.qrPlaceholder} aria-hidden="true">
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Reservation%20Confirmed%20for%20${encodeURIComponent(data.name)}`} alt="QR Code" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
        <h3 className="text-h3" style={{color: 'var(--color-accent)'}}>{data.name}</h3>
        <p style={{fontSize: '0.9rem', marginTop: '10px'}}>
          {t('booking.confirm.date', { day: data.date, time: data.time })}
        </p>
        <p style={{fontSize: '0.8rem', marginTop: '10px', opacity: 0.6}}>
          {t('booking.confirm.exhibit', { name: data.exhibit })} <br/>
          {t('booking.confirm.entrance')}
        </p>
      </div>

      <Link
        to="/"
        style={{...styles.btn, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', textDecoration: 'none', display: 'inline-block'}}
      >
        {t('booking.confirm.btnHome')}
      </Link>
    </div>
  );
};

export default Confirmation;
