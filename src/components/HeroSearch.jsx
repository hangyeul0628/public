import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Dashboard from './Dashboard';

const HeroSearch = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const treasures = [
    { 
      name: t('treasures.pensiveBodhisattva.name'), 
      category: t('treasures.pensiveBodhisattva.category'), 
      room: t('treasures.pensiveBodhisattva.room') 
    },
    { 
      name: t('treasures.goryeoCeladon.name'), 
      category: t('treasures.goryeoCeladon.category'), 
      room: t('treasures.goryeoCeladon.room') 
    },
    { 
      name: t('treasures.tenStoryPagoda.name'), 
      category: t('treasures.tenStoryPagoda.category'), 
      room: t('treasures.tenStoryPagoda.room') 
    }
  ];

  const results = query.length > 1 
    ? treasures.filter(t => t.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSearchSubmit = () => {
    if (query.length <= 1) return;
    
    if (results.length > 0) {
      // Navigate to booking page if a valid result is found
      navigate('/booking');
    } else {
      // Show error alert if no results match
      alert(t('hero.noResults', '검색 결과가 없습니다. 정확한 검색어를 입력해 주세요. (No results found)'));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const styles = {
    hero: {
      padding: '180px 10% 120px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      wordBreak: 'keep-all',
      backgroundImage: "url('https://images.unsplash.com/photo-1541887089-130ab7815b3c?auto=format&fit=crop&w=1920&q=80')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      minHeight: '80vh',
      justifyContent: 'center',
    },
    overlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(2, 12, 27, 0.7), rgba(2, 12, 27, 0.4) 50%, rgba(2, 12, 27, 0.9))',
      zIndex: 0,
    },
    contentWrapper: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    title: {
      marginBottom: '24px',
      color: '#ffffff',
      textShadow: '0 4px 20px rgba(0,0,0,0.5)',
      fontWeight: 700,
      letterSpacing: '-1px'
    },
    subtitle: {
      color: '#e2e8f0',
      maxWidth: '650px',
      marginBottom: '48px',
      fontSize: '1.125rem',
      lineHeight: '1.6',
      textShadow: '0 2px 10px rgba(0,0,0,0.5)',
    },
    searchContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '600px',
    },
    input: {
      width: '100%',
      padding: '16px 24px',
      borderRadius: 'var(--radius-full)',
      border: isFocused ? '2px solid var(--color-accent)' : '2px solid transparent',
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'var(--color-text-title)',
      fontSize: 'max(1rem, 12px)',
      outline: 'none',
      backdropFilter: 'blur(10px)',
      boxShadow: isFocused ? '0 0 20px rgba(197, 160, 89, 0.2)' : 'none',
      transition: 'all 0.3s ease',
      minHeight: '44px',
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: '8px',
      background: 'var(--color-bg-base)',
      border: '1px solid var(--color-glass-border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      display: results.length > 0 && query.length > 1 ? 'block' : 'none',
      zIndex: 10,
    },
    resultItem: {
      padding: '16px 24px',
      cursor: 'pointer',
      borderBottom: '1px solid var(--color-glass-border)',
      textAlign: 'left',
      minHeight: '44px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    resultTitle: {
      color: 'var(--color-text-title)',
      fontWeight: 600,
      marginBottom: '4px',
    },
    resultMeta: {
      color: 'var(--color-text-body)',
      fontSize: 'max(0.75rem, 12px)',
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <section style={styles.hero} aria-labelledby="hero-title">
      <div style={styles.overlay}></div>
      <div style={styles.contentWrapper}>
        <Dashboard />
        <h1 id="hero-title" className="text-h1" style={styles.title}>{t('hero.title')}</h1>
        <p className="text-body" style={styles.subtitle}>
          {t('hero.subtitle')}
        </p>

        <div style={styles.searchContainer} role="search">
        <div className="visually-hidden" aria-live="polite" aria-atomic="true">
          {query.length > 1 ? t('hero.resultsFound', { count: results.length }) : ''}
        </div>

        <input 
          type="search" 
          id="museum-search"
          aria-label={t('hero.searchAria')}
          aria-autocomplete="list"
          aria-controls="search-results-listbox"
          placeholder={t('hero.searchPlaceholder')}
          style={styles.input}
          value={query}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        
        <div 
          id="search-results-listbox" 
          role="listbox" 
          aria-label={t('hero.resultsLabel')}
          style={styles.dropdown}
        >
          {results.map((item, idx) => (
            <div 
              key={idx} 
              role="option"
              aria-selected="false"
              tabIndex="0"
              style={styles.resultItem}
              className="search-result-hover"
              onClick={() => navigate('/booking')}
              onKeyDown={(e) => {
                if(e.key === 'Enter') navigate('/booking');
              }}
            >
              <div style={styles.resultTitle}>{item.name}</div>
              <div style={styles.resultMeta}>{item.category} | {item.room}</div>
            </div>
          ))}
          <style>{`
            .search-result-hover:hover, .search-result-hover:focus {
              background: rgba(255, 255, 255, 0.05);
              outline: 2px solid var(--color-accent);
              outline-offset: -2px;
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
              word-break: break-all;
            }
          `}</style>
        </div>
      </div>
      </div>
    </section>
  );
};

export default HeroSearch;
