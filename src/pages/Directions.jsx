import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// 핵심: 파일을 src/assets로 옮긴 후 아래 경로가 정확해야 배포 에러가 안 납니다.
import mapImg from '../assets/map.png';

const Directions = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('subway');

  const styles = {
    container: { maxWidth: '1000px', margin: '0 auto', padding: '120px 20px 60px', minHeight: '80vh', wordBreak: 'keep-all' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-accent)', marginBottom: '40px', textAlign: 'center' },
    mapContainer: { width: '100%', marginBottom: '40px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' },
    mapImage: { width: '100%', height: 'auto', display: 'block' },
    tabContainer: { display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
    tabBtn: (isActive) => ({ padding: '16px 32px', fontSize: '1.2rem', fontWeight: 'bold', color: isActive ? 'var(--color-accent)' : '#888', background: 'transparent', border: 'none', borderBottom: isActive ? '3px solid var(--color-accent)' : '3px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }),
    section: { background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '40px', marginBottom: '40px', border: '1px solid rgba(255,255,255,0.1)' },
    subTitle: { fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', marginTop: '24px', marginBottom: '16px' },
    list: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '24px' },
    listItem: { display: 'flex', alignItems: 'flex-start', gap: '16px', color: '#ccc', lineHeight: '1.6' },
    badge: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '6px 16px', borderRadius: '20px', color: '#fff', fontSize: '0.9rem', fontWeight: 'bold', minWidth: '80px' },
    note: { marginTop: '32px', padding: '20px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', fontSize: '0.95rem', color: '#ccc', borderLeft: '4px solid var(--color-accent)' }
  };

  const lineColors = { '4호선': '#00A4E3', '경의중앙': '#77C4A3', '3호선': '#F37321', '6호선': '#CD7C2F', '7호선': '#747F00', '9호선': '#BDB092', '간선버스': '#0068B7' };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{t('directions.title')}</h1>
      <div style={styles.mapContainer}>
        <img src={mapImg} alt={t('directions.mapAlt')} style={styles.mapImage} />
      </div>
      <div style={styles.tabContainer}>
        <button style={styles.tabBtn(activeTab === 'subway')} onClick={() => setActiveTab('subway')}>{t('directions.tabSubway')}</button>
        <button style={styles.tabBtn(activeTab === 'bus')} onClick={() => setActiveTab('bus')}>{t('directions.tabBus')}</button>
      </div>
      {activeTab === 'subway' && (
        <div style={styles.section}>
          <h3 style={styles.subTitle}>{t('directions.subway.mainTitle')}</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={{...styles.badge, background: lineColors['4호선']}}>{t('directions.subway.line4')}</span>
              <span>{t('directions.subway.line4Desc1')}<br/>{t('directions.subway.line4Desc2')}</span>
            </li>
            <li style={styles.listItem}>
              <span style={{...styles.badge, background: lineColors['경의중앙']}}>{t('directions.subway.gyeongui')}</span>
              <span>{t('directions.subway.gyeonguiDesc1')}<br/>{t('directions.subway.line4Desc2')}</span>
            </li>
          </ul>
          <div style={styles.note}>{t('directions.subway.noteElevator')}<br/>{t('directions.subway.notePath')}</div>
        </div>
      )}
      {activeTab === 'bus' && (
        <div style={styles.section}>
          <h3 style={styles.subTitle}>{t('directions.bus.mainTitle')}</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              <span style={{...styles.badge, background: lineColors['간선버스']}}>{t('directions.bus.bus400')}</span>
              <span>{t('directions.bus.bus400Desc')}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Directions;