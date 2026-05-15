import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dashboard from '../components/Dashboard';
import HeroSearch from '../components/HeroSearch';
import QuickInfoBar from '../components/QuickInfoBar';
import NoticeSection from '../components/NoticeSection';

// 1. 이미지를 직접 가져옵니다. (파일명/확장자 대소문자 확인 필수!)
import pensiveImg from '../assets/pensive.jpg';
import celadonImg from '../assets/celadon.jpg';
import digitalImg from '../assets/digital.jpg';

const Home = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState({ keyword: '', category: '', month: '' });

  const styles = {
    mainContent: { flexGrow: 1, padding: '80px 10%', wordBreak: 'keep-all' },
    sectionTitle: { textAlign: 'center', marginBottom: '60px', color: 'var(--color-accent)' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' },
    card: { background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
    img: { width: '100%', height: '220px', objectFit: 'cover' },
    info: { padding: '20px' },
    tag: { fontSize: '12px', color: '#888', marginBottom: '8px', display: 'block' }
  };

  const exhibitions = [
    { title: t('exhibitions.pensive.title'), tag: t('exhibitions.pensive.tag'), desc: t('exhibitions.pensive.desc'), img: pensiveImg },
    { title: t('exhibitions.celadon.title'), tag: t('exhibitions.celadon.tag'), desc: t('exhibitions.celadon.desc'), img: celadonImg },
    { title: t('exhibitions.digital.title'), tag: t('exhibitions.digital.tag'), desc: t('exhibitions.digital.desc'), img: digitalImg }
  ];

  return (
    <>
      <header><HeroSearch /></header>
      <QuickInfoBar />
      <main id="exhibitions" style={styles.mainContent}>
        <h2 style={styles.sectionTitle}>{t('exhibitions.sectionTitle')}</h2>
        <div style={styles.grid}>
          {exhibitions.map((ex, i) => (
            <div key={i} style={styles.card}>
              <img src={ex.img} alt={ex.title} style={styles.img} />
              <div style={styles.info}>
                <span style={styles.tag}>{ex.tag}</span>
                <h3 style={{ marginBottom: '10px' }}>{ex.title}</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>{ex.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <NoticeSection />
    </>
  );
};

export default Home;