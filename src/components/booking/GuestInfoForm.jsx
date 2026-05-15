import React from 'react';
import { useTranslation } from 'react-i18next';

const GuestInfoForm = ({ data, onChange }) => {
  const { t } = useTranslation();

  const styles = {
    container: {
      background: 'var(--color-secondary)',
      padding: '30px',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-glass-border)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      wordBreak: 'keep-all',
    },
    label: {
      display: 'block',
      color: 'var(--color-text-body)',
      fontSize: 'max(0.875rem, 12px)',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--color-glass-border)',
      background: 'rgba(255,255,255,0.05)',
      color: 'var(--color-text-title)',
      fontSize: 'max(1rem, 12px)',
      outline: 'none',
      minHeight: '44px', // a11y touch target
    }
  };

  return (
    <div style={styles.container}>
      <h2 className="text-h2" style={{textAlign: 'center', marginBottom: '20px'}}>{t('booking.step2.title')}</h2>
      
      <div>
        <label htmlFor="guest-name" style={styles.label}>{t('booking.form.name')}</label>
        <input 
          id="guest-name"
          type="text" 
          placeholder={t('booking.form.namePlaceholder')} 
          style={styles.input}
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="guest-email" style={styles.label}>{t('booking.form.email')}</label>
        <input 
          id="guest-email"
          type="email" 
          placeholder={t('booking.form.emailPlaceholder')} 
          style={styles.input}
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="guest-visitors" style={styles.label}>{t('booking.form.visitors')}</label>
        <select 
          id="guest-visitors"
          style={{...styles.input, cursor: 'pointer'}}
          value={data.visitors}
          onChange={(e) => onChange('visitors', e.target.value)}
        >
          <option value="1" style={{color: 'black'}}>{t('booking.form.v1')}</option>
          <option value="2" style={{color: 'black'}}>{t('booking.form.v2')}</option>
          <option value="3" style={{color: 'black'}}>{t('booking.form.v3')}</option>
          <option value="4+" style={{color: 'black'}}>{t('booking.form.v4')}</option>
        </select>
      </div>

      <div>
        <label htmlFor="guest-exhibit" style={styles.label}>{t('booking.form.exhibit')}</label>
        <input 
          id="guest-exhibit"
          type="text" 
          style={styles.input}
          value={data.exhibit}
          disabled
          aria-disabled="true"
        />
      </div>
      
      <style>{`
        input:focus, select:focus {
          border-color: var(--color-accent) !important;
          background: rgba(255,255,255,0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default GuestInfoForm;
