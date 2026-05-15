import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dashboard from '../components/Dashboard';
import HeroSearch from '../components/HeroSearch';
import FilterPanel from '../components/FilterPanel';
import QuickInfoBar from '../components/QuickInfoBar';
import NoticeSection from '../components/NoticeSection';

// 1. src/assets에 있는 이미지를 직접 가져옵니다.
import pensiveImg from '../assets/pensive.jpg';
import celadonImg from '../assets/celadon.jpg';
import digitalImg from '../assets/digital.jpg';

const Home = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState({ keyword: '', category: '', month: '' });

  // 스타일 설정 (기존 레이아웃 유지)
  const styles = {
    mainContent: {
      flexGrow: 1,
      padding: '80px 10%',
      wordBreak: 'keep-all',
    },
    sectionTitle: {
      textAlign: 'center',
      marginBottom: '60px',
      color: 'var(--color-accent)',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '40px',
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s ease',
    },
    imageWrapper: {
      width: '100%',
      height: '200px',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    cardBody: {
      padding: '20px',
    },
    tag: {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      backgroundColor: '#f0f4f8',
      fontSize: '12px',
      marginBottom: '10px',
      color: '#555'
    }
  };

  const exhibitions = [
    {
      title: t('exhibitions.pensive.title'),
      tagText: t('exhibitions.pensive.tag'),
      description: t('exhibitions.pensive.desc'),
      isClosed: false,
      imageUrl: pensiveImg 
    },
    {
      title: t('exhibitions.celadon.title'),
      tagText: t('exhibitions.celadon.tag'),
      description: t('exhibitions.celadon.desc'),
      isClosed: false,
      imageUrl: celadonImg
    },
    {
      title: t('exhibitions.digital.title'),
      tagText: t('exhibitions.digital.tag'),
      description: t('exhibitions.digital.desc'),
      isClosed: true,
      imageUrl: digitalImg
    }
  ];

  const filteredExhibitions = exhibitions.filter((ex) => {
    const keywordMatch = filter.keyword
      ? ex.title.toLowerCase().includes(filter.keyword.toLowerCase()) || 
        ex.description.toLowerCase().includes(filter.keyword.toLowerCase())
      : true;
    const categoryMatch = filter.category 
      ? ex.tagText.includes(t(`exhibitions.${filter.category}.tag`)) 
      : true;
    return keywordMatch && categoryMatch;
  });

  return (
    <>
      <header>
        <HeroSearch />
      </header>
      
      <QuickInfoBar />

      <main id="main-content" style={styles.mainContent}>
        <h2 className="text-h2" style={styles.sectionTitle}>
          {t('exhibitions.sectionTitle')}
        </h2>
        
        <div style={styles.grid}>
          {filteredExhibitions.map((ex, index) => (
            <div key={index} style={styles.card} className="hover-up">
              <div style={styles.imageWrapper}>
                {/* 핵심: import한 이미지를 src에 바로 꽂습니다 */}
                <img src={ex.imageUrl} alt={ex.title} style={styles.image} />
              </div>
              <div style={styles.cardBody}>
                <span style={styles.tag}>{ex.tagText}</span>
                <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>{ex.title}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  {ex.description}
                </p>
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