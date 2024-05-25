import React from 'react';

const monthNames = {
  '01': 'Январь',
  '02': 'Февраль',
  '03': 'Март',
  '04': 'Апрель',
  '05': 'Май',
  '06': 'Июнь',
  '07': 'Июль',
  '08': 'Август',
  '09': 'Сентябрь',
  '10': 'Октябрь',
  '11': 'Ноябрь',
  '12': 'Декабрь',
};

const AnalyticsTable = ({ data }) => {
  const calculateTotals = (data) => {
    return data.map(monthData => {
      const revenue = monthData.records.reduce((sum, record) => sum + record.number_of_children * record.price_per_session, 0);
      const commission = revenue * 0.075;
      const teacherPayments = monthData.records.reduce((sum, record) => {
        const children = record.number_of_children;
        let payment = 1000;
        if (children > 4 && children < 10) {
          payment += (children - 4) * 100;
        } else if (children >= 10) {
          payment = 2000;
        }
        return sum + payment;
      }, 0);
      const profit = revenue - commission - teacherPayments;
      const shareholderProfit = profit / 3;

      return {
        month: monthData.month,
        revenue,
        commission,
        teacherPayments,
        profit,
        shareholderProfit,
      };
    });
  };

  const totals = calculateTotals(data);
  console.log('Table Data:', totals); // Логирование данных таблицы

  return (
    <table className='analytic_table mt20'>
      <thead>
        <tr>
          <th className='table_comp'>Месяц</th>
          <th className='table_comp'>Выручка</th>
          <th className='table_comp'>Комиссия</th>
          <th className='table_comp'>Оплата преподавателям</th>
          <th className='table_comp'>Прибыль</th>
          <th className='table_comp'>Прибыль на каждого акционера</th>
        </tr>
      </thead>
      <tbody>
        {totals.map((total, index) => (
          <tr key={index}>
            <td className='table_comp'>{monthNames[total.month.split('-')[1]]}</td>
            <td className='table_comp'>{total.revenue}</td>
            <td className='table_comp'>{total.commission}</td>
            <td className='table_comp'>{total.teacherPayments}</td>
            <td className='table_comp'>{total.profit}</td>
            <td className='table_comp'>{parseInt(total.shareholderProfit)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnalyticsTable;
