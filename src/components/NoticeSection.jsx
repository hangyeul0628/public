import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NoticeSection = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('notice');

  const tabs = [
    { id: 'notice', label: t('notice.tabs.notice') },
    { id: 'announcement', label: t('notice.tabs.announcement') },
    { id: 'recruit', label: t('notice.tabs.recruit') },
    { id: 'press', label: t('notice.tabs.press') }
  ];

  // We fetch notices dynamically from i18n
  const notices = t('notice.items', { returnObjects: true });

  const styles = {
    section: {
      padding: '60px 10%',
      background: 'var(--color-bg-base)',
      wordBreak: 'keep-all',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '32px',
    },
    icon: {
      width: '32px',
      height: '32px',
      objectFit: 'contain',
      filter: 'invert(1) brightness(0.85) sepia(1) hue-rotate(5deg) saturate(3)',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'var(--color-text-title)',
      margin: 0,
    },
    content: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: '40px',
    },
    tabsContainer: {
      borderTop: '2px solid var(--color-text-title)',
    },
    tabList: {
      display: 'flex',
      borderBottom: '1px solid var(--color-glass-border)',
    },
    tabBtn: (isActive) => ({
      padding: '16px 24px',
      fontSize: '14px',
      fontWeight: isActive ? 'bold' : 'normal',
      color: isActive ? 'var(--color-text-title)' : 'var(--color-text-body)',
      background: 'transparent',
      border: 'none',
      borderBottom: isActive ? '2px solid var(--color-text-title)' : '2px solid transparent',
      cursor: 'pointer',
      marginBottom: '-1px',
    }),
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 0',
      borderBottom: '1px solid var(--color-glass-border)',
      cursor: 'pointer',
    },
    itemTitle: {
      color: 'var(--color-text-body)',
      fontSize: 'max(0.875rem, 14px)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '80%',
    },
    itemTitleHover: {
      color: 'var(--color-text-title)',
    },
    itemDate: {
      color: 'var(--color-text-body)',
      fontSize: 'max(0.75rem, 12px)',
      opacity: 0.7,
    },
    banner: {
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      position: 'relative',
      height: '100%',
      minHeight: '250px',
      background: 'linear-gradient(45deg, #1A2980 0%, #26D0CE 100%)', // Placeholder gradient
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '40px',
      color: '#fff',
    },
    bannerTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '16px',
    },
    bannerSubtitle: {
      fontSize: '16px',
      marginBottom: '32px',
      opacity: 0.9,
    },
    bannerButton: {
      padding: '10px 24px',
      background: 'rgba(255,255,255,0.2)',
      border: '1px solid rgba(255,255,255,0.5)',
      color: '#fff',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      alignSelf: 'flex-start',
      backdropFilter: 'blur(4px)',
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          {/* Mic body */}
          <rect x="20" y="6" width="20" height="28" rx="10" stroke="var(--color-text-title)" strokeWidth="2.5" fill="none"/>
          {/* Grille lines */}
          <line x1="25" y1="16" x2="39" y2="16" stroke="var(--color-text-title)" strokeWidth="2" strokeLinecap="round"/>
          <line x1="25" y1="21" x2="39" y2="21" stroke="var(--color-text-title)" strokeWidth="2" strokeLinecap="round"/>
          <line x1="25" y1="26" x2="39" y2="26" stroke="var(--color-text-title)" strokeWidth="2" strokeLinecap="round"/>
          {/* Arm left */}
          <rect x="14" y="30" width="5" height="6" rx="2" stroke="var(--color-text-title)" strokeWidth="2" fill="none"/>
          {/* Arm right */}
          <rect x="45" y="30" width="5" height="6" rx="2" stroke="var(--color-text-title)" strokeWidth="2" fill="none"/>
          {/* Stand arc */}
          <path d="M16 33 Q16 50 32 50 Q48 50 48 33" stroke="var(--color-text-title)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          {/* Stand pole */}
          <line x1="32" y1="50" x2="32" y2="57" stroke="var(--color-text-title)" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Stand base */}
          <rect x="22" y="56" width="20" height="4" rx="2" stroke="var(--color-text-title)" strokeWidth="2" fill="none"/>
          {/* Sound waves */}
          <line x1="50" y1="13" x2="55" y2="9" stroke="var(--color-text-title)" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="52" y1="20" x2="58" y2="20" stroke="var(--color-text-title)" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="50" y1="27" x2="55" y2="31" stroke="var(--color-text-title)" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <h2 style={styles.title}>{t('notice.sectionTitle').replace('📢', '').trim()}</h2>
      </div>

      <div style={styles.content} className="notice-content">
        {/* Left Side: Tabs and List */}
        <div style={styles.tabsContainer}>
          <div style={styles.tabList}>
            {tabs.map((tab) => (
              <button 
                key={tab.id} 
                style={styles.tabBtn(activeTab === tab.id)}
                onClick={() => setActiveTab(tab.id)}
                className="tab-button"
              >
                {tab.label}
              </button>
            ))}
          </div>
          <ul style={styles.list}>
            {notices[activeTab]?.map((item, idx) => (
              <li 
                key={idx} 
                style={styles.listItem}
                className="notice-item"
              >
                <span style={styles.itemTitle} className="notice-title">
                  <span style={{marginRight: '8px', color: 'var(--color-accent)'}}>•</span>
                  {item.title}
                </span>
                <span style={styles.itemDate}>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Banner */}
        <div style={styles.banner}>
          <div style={styles.bannerTitle}>{t('notice.bannerTitle')}</div>
          <div style={styles.bannerSubtitle} dangerouslySetInnerHTML={{__html: t('notice.bannerSubtitle').replace('\n', '<br/>')}}></div>
          <button style={styles.bannerButton} className="banner-button">{t('notice.bannerBtn')}</button>
        </div>
      </div>
      <style>{`
        .notice-item:hover .notice-title {
          color: var(--color-accent) !important;
          text-decoration: underline;
        }
        .banner-button {
          transition: all 0.3s ease;
        }
        .banner-button:hover {
          background: rgba(255, 255, 255, 0.4) !important;
          color: var(--color-bg-base) !important;
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          .notice-content {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .tab-button {
            font-size: 12px !important;
            padding: 12px 12px !important;
          }
        }
        @media (max-width: 480px) {
          .tab-button {
            font-size: 11px !important;
            padding: 10px 8px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default NoticeSection;
