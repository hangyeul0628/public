import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dashboard from '../components/Dashboard';
import HeroSearch from '../components/HeroSearch';
import ExhibitionCard from '../components/ExhibitionCard';
import FilterPanel from '../components/FilterPanel';
import QuickInfoBar from '../components/QuickInfoBar';
import NoticeSection from '../components/NoticeSection';

// 1. 이미지 임포트 (경로와 대소문자가 파일과 일치해야 함)
import pensiveImg from '../assets/pensive.jpg';
import celadonImg from '../assets/celadon.jpg';
import digitalImg from '../assets/digital.jpg';

const Home = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState({ keyword: '', category: '', month: '' });

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
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '40px',
    }
  };

  const exhibitions = [
    {
      title: t('exhibitions.pensive.title'),
      tagText: t('exhibitions.pensive.tag'),
      description: t('exhibitions.pensive.desc'),
      isClosed: false,
      imageUrl: pensiveImg // 변수 그대로 사용
    },
    {
      title: t('exhibitions.celadon.title'),
      tagText: t('exhibitions.celadon.tag'),
      description: t('exhibitions.celadon.desc'),
      isClosed: false,
      imageUrl: celadonImg // 변수 그대로 사용
    },
    {
      title: t('exhibitions.digital.title'),
      tagText: t('exhibitions.digital.tag'),
      description: t('exhibitions.digital.desc'),
      isClosed: true,
      imageUrl: digitalImg // 변수 그대로 사용
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
            <ExhibitionCard 
              key={index}
              title={ex.title}
              tagText={ex.tagText}
              description={ex.description}
              isClosed={ex.isClosed}
              imageUrl={ex.imageUrl} // ExhibitionCard로 이미지 데이터 전달
            />
          ))}
        </div>
      </main>

      <NoticeSection />
    </>
  );
};

export default Home;