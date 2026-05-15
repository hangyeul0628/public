import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StepIndicator from '../components/booking/StepIndicator';
import CalendarSelector from '../components/booking/CalendarSelector';
import TimeSelector from '../components/booking/TimeSelector';
import GuestInfoForm from '../components/booking/GuestInfoForm';
import Confirmation from '../components/booking/Confirmation';

const Booking = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const preSelectedExhibit = searchParams.get('item');

  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: null,
    time: null,
    name: '',
    email: '',
    visitors: '1',
    exhibit: preSelectedExhibit || t('booking.form.defaultExhibit')
  });

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '120px 20px 40px 20px',
      minHeight: '80vh',
      wordBreak: 'keep-all',
    },
    nav: {
      marginBottom: '40px',
    },
    backLink: {
      color: 'var(--color-accent)',
      fontWeight: 600,
      whiteSpace: 'nowrap'
    },
    title: {
      textAlign: 'center',
      color: 'var(--color-accent)',
      marginBottom: '40px',
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
    },
    buttonContainer: {
      marginTop: '40px',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px'
    },
    primaryBtn: {
      background: 'var(--color-accent)',
      color: 'var(--color-primary)',
      padding: '0 24px',
      borderRadius: 'var(--radius-md)',
      fontWeight: 600,
      minHeight: '44px',
    },
    secondaryBtn: {
      background: 'transparent',
      color: 'var(--color-accent)',
      border: '1px solid var(--color-accent)',
      padding: '0 24px',
      borderRadius: 'var(--radius-md)',
      fontWeight: 600,
      minHeight: '44px',
    }
  };

  const handleNextStep = () => {
    if (step === 1 && (!bookingData.date || !bookingData.time)) {
      alert(t('booking.step1.alert'));
      return;
    }
    if (step === 2 && (!bookingData.name || !bookingData.email)) {
      alert(t('booking.step2.alert'));
      return;
    }
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={styles.container}>
      <div className="glass-panel" style={{ padding: '40px' }}>
        <h1 className="text-h1" style={styles.title}>{t('booking.title')}</h1>

        <StepIndicator currentStep={step} />

        <div role="region" aria-live="polite">
          {step === 1 && (
            <section aria-label={t('booking.step1.aria')}>
              <h2 className="text-h2" style={{marginBottom: '20px'}}>{t('booking.step1.title')}</h2>
              <div style={styles.mainGrid} className="responsive-grid">
                <CalendarSelector 
                  selectedDate={bookingData.date} 
                  onSelect={(d) => setBookingData({...bookingData, date: d})} 
                />
                <TimeSelector 
                  selectedTime={bookingData.time}
                  onSelect={(t) => setBookingData({...bookingData, time: t})} 
                />
              </div>
              <div style={{...styles.buttonContainer, justifyContent: 'flex-end'}}>
                <button style={styles.primaryBtn} onClick={handleNextStep}>{t('booking.step1.btnNext')}</button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section aria-label={t('booking.step2.aria')}>
              <GuestInfoForm 
                data={bookingData} 
                onChange={(key, val) => setBookingData({...bookingData, [key]: val})} 
              />
              <div style={styles.buttonContainer}>
                <button style={styles.secondaryBtn} onClick={() => setStep(1)}>{t('booking.step2.btnBack')}</button>
                <button style={styles.primaryBtn} onClick={handleNextStep}>{t('booking.step2.btnNext')}</button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section aria-label={t('booking.step3.aria')}>
              <Confirmation data={bookingData} />
            </section>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Booking;
