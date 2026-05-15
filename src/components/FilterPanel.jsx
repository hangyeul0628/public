import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FilterPanel = ({ onFilterChange }) => {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [month, setMonth] = useState('');

  const handleChange = () => {
    onFilterChange({ keyword, category, month });
  };

  return (
    <section aria-label={t('filter.ariaLabel')} style={{ marginBottom: '30px' }}>
      <input
        type="text"
        placeholder={t('filter.keywordPlaceholder')}
        value={keyword}
        onChange={e => { setKeyword(e.target.value); handleChange(); }}
        style={{ marginRight: '10px', padding: '8px' }}
      />
      <select
        value={category}
        onChange={e => { setCategory(e.target.value); handleChange(); }}
        style={{ marginRight: '10px', padding: '8px' }}
      >
        <option value="">{t('filter.allCategories')}</option>
        <option value="pensive">{t('exhibitions.pensive.title')}</option>
        <option value="celadon">{t('exhibitions.celadon.title')}</option>
        <option value="digital">{t('exhibitions.digital.title')}</option>
      </select>
      <input
        type="month"
        value={month}
        onChange={e => { setMonth(e.target.value); handleChange(); }}
        style={{ padding: '8px' }}
      />
    </section>
  );
};

export default FilterPanel;
