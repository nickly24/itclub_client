import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YearSelector from './YearSelector';
import FilialSelector from './FilialSelector';
import AnalyticsTable from './AnalyticsTable';
import ProfitChart from './ProfitChart';
import { API_BASE_URL } from './Api';

const Analytics = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedFilial, setSelectedFilial] = useState('all');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectedYear) {
      fetchAllData();
    }
  }, [selectedYear, selectedFilial]);

  const fetchAllData = async () => {
    try {
      const dataJan = await fetchData('01');
      const dataFeb = await fetchData('02');
      const dataMar = await fetchData('03');
      const dataApr = await fetchData('04');
      const dataMay = await fetchData('05');
      const dataJun = await fetchData('06');
      const dataJul = await fetchData('07');
      const dataAug = await fetchData('08');
      const dataSep = await fetchData('09');
      const dataOct = await fetchData('10');
      const dataNov = await fetchData('11');
      const dataDec = await fetchData('12');

      const allData = [
        ...dataJan, 
        ...dataFeb, 
        ...dataMar, 
        ...dataApr, 
        ...dataMay, 
        ...dataJun, 
        ...dataJul, 
        ...dataAug, 
        ...dataSep, 
        ...dataOct, 
        ...dataNov, 
        ...dataDec
      ];

      console.log('All Data:', allData);
      const groupedData = groupDataByMonth(allData);
      console.log('Grouped Data:', groupedData);
      setData(groupedData);
    } catch (error) {
      console.error('Ошибка при получении данных аналитики:', error);
    }
  };

  const fetchData = async (month) => {
    try {
      let response;
      if (selectedFilial === 'all') {
        response = await axios.get(`${API_BASE_URL}/dnevnik/${selectedYear}/${month}`);
      } else {
        response = await axios.get(`${API_BASE_URL}/analytics/${selectedYear}/${month}/${selectedFilial}`);
      }
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении данных за месяц ${month}:`, error);
      return [];
    }
  };

  const groupDataByMonth = (data) => {
    const grouped = data.reduce((acc, record) => {
      const month = record.date.substring(0, 7);
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(record);
      return acc;
    }, {});
    return Object.keys(grouped).map(month => {
      const monthData = grouped[month];
      const revenue = monthData.reduce((sum, record) => sum + record.number_of_children * record.price_per_session, 0);
      const commission = revenue * 0.075;
      const teacherPayments = monthData.reduce((sum, record) => {
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
      
      return {
        month,
        revenue,
        commission,
        teacherPayments,
        profit,
        records: monthData,
      };
    });
  };

  return (
    <div className='analytics wrapper mt20 card_main pd20'>
      <div className='analytic_select_cont'>
        <YearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
        <FilialSelector selectedFilial={selectedFilial} setSelectedFilial={setSelectedFilial} />
      </div>
      <AnalyticsTable data={data} />
      <ProfitChart data={data} />
    </div>
  );
};

export default Analytics;
