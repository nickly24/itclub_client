import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

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

const ProfitChart = ({ data }) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const chartData = {
      labels: data.map(monthData => monthNames[monthData.month.split('-')[1]]),
      datasets: [
        {
          label: 'Прибыль',
          data: data.map(monthData => monthData.profit),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Выручка',
          data: data.map(monthData => monthData.revenue),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
        {
          label: 'Оплата преподам',
          data: data.map(monthData => monthData.teacherPayments),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    };

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          x: {
            type: 'category',
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={canvasRef} id="profitChart" className='chart mt20' height={100}></canvas>;
};

export default ProfitChart;
