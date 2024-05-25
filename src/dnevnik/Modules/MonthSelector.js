// src/components/MonthSelector.js
import React from 'react';

const MonthSelector = ({ selectedMonth, setSelectedMonth }) => {
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      <label htmlFor="month">Выберите месяц: </label>
      <input
        type="month"
        id="month"
        name="month"
        value={selectedMonth}
        onChange={handleMonthChange}
      />
    </div>
  );
};

export default MonthSelector;
