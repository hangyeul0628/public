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
    tag: { fontSize: '12px', color: '#636363', marginBottom: '8px', display: 'block' } // #888 -> #636363 명비 개선
  };

  const exhibitions = [
    { title: t('exhibitions.pensive.title'), tag: t('exhibitions.pensive.tag'), desc: t('exhibitions.pensive.desc'), img: pensiveImg },
    { title: t('exhibitions.celadon.title'), tag: t('exhibitions.celadon.tag'), desc: t('exhibitions.celadon.desc'), img: celadonImg },
    { title: t('exhibitions.digital.title'), tag: t('exhibitions.digital.tag'), desc: t('exhibitions.digital.desc'), img: digitalImg }
  ];

  return (
    <>
      <header><HeroSearch /></header>
      <main> {/* 전체 본문 콘텐츠 영역을 main 태그로 래핑하여 region 결함 완전 조치 */}
        <QuickInfoBar />
        <section id="exhibitions" style={styles.mainContent} aria-labelledby="exhibitions-title">
          <h2 id="exhibitions-title" style={styles.sectionTitle}>{t('exhibitions.sectionTitle')}</h2>
          <div style={styles.grid}>
            {exhibitions.map((ex, i) => (
              <div key={i} style={styles.card}>
                <img src={ex.img} alt={ex.title} style={styles.img} />
                <div style={styles.info}>
                  <span style={styles.tag}>{ex.tag}</span>
                  <h3 style={{ marginBottom: '10px', color: '#0f172a' }}>{ex.title}</h3> {/* 명시적으로 고대비 어두운 색 부여 */}
                  <p style={{ color: '#555', fontSize: '14px' }}>{ex.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <NoticeSection />
      </main>
    </>
  );
};

export default Home;