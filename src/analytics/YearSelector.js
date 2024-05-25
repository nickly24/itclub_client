import React from 'react';

const YearSelector = ({ selectedYear, setSelectedYear }) => {
  const years = [
    '2023',
    '2024',
    '2025',
    '2026',
    // Добавить другие годы по мере необходимости
  ];

  return (
    <select className='select_form' value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
      <option value="">Выберите год</option>
      {years.map((year, index) => (
        <option key={index} value={year}>{year}</option>
      ))}
    </select>
  );
};

export default YearSelector;
