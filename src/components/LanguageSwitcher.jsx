import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const styles = {
    container: {
      position: 'relative',
      zIndex: 1000,
    },
    select: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'var(--color-accent)',
      border: '1px solid var(--color-accent)',
      padding: '8px 16px',
      borderRadius: 'var(--radius-sm)',
      fontSize: 'max(0.875rem, 12px)',
      fontWeight: '600',
      cursor: 'pointer',
      outline: 'none',
      backdropFilter: 'blur(10px)',
      fontFamily: 'inherit',
    },
    option: {
      background: 'var(--color-secondary)',
      color: 'var(--color-text-title)',
    }
  };

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div style={styles.container}>
      <select 
        style={styles.select} 
        onChange={changeLanguage} 
        value={i18n.language}
        aria-label="Select Language"
      >
        <option style={styles.option} value="ko">한국어 (Korean)</option>
        <option style={styles.option} value="en">English</option>
        <option style={styles.option} value="zh">中文 (Chinese)</option>
        <option style={styles.option} value="ja">日本語 (Japanese)</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
