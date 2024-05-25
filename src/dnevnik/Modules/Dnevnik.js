import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MonthSelector from './MonthSelector';
import FilialCard from './FilialCard';
import {API_BASE_URL} from'./Api';

export default function Dnevnik() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filials, setFilials] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [prepods, setPrepods] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/filials`)
      .then(response => {
        setFilials(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении филиалов:', error);
      });

    axios.get(`${API_BASE_URL}/prepods`)
      .then(response => {
        setPrepods(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении списка преподавателей:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      fetchAttendanceData();
    }
  }, [selectedMonth]);

  const fetchAttendanceData = () => {
    const [year, month] = selectedMonth.split('-');
    axios.get(`${API_BASE_URL}/dnevnik/${year}/${month}`)
      .then(response => {
        const groupedData = response.data.reduce((acc, record) => {
          if (!acc[record.filial_name]) {
            acc[record.filial_name] = [];
          }
          acc[record.filial_name].push(record);
          return acc;
        }, {});
        setAttendanceData(groupedData);
      })
      .catch(error => {
        console.error('Ошибка при получении данных посещаемости:', error);
      });
  };

  const addAttendance = (filialId, newAttendance, pricePerSession) => {
    return axios.post(`${API_BASE_URL}/dnevnik`, {
      filial_id: filialId,
      date: newAttendance.date,
      number_of_children: newAttendance.number_of_children,
      price_per_session: pricePerSession,
      prepod_id: newAttendance.prepod_id
    })
    .then(response => {
      fetchAttendanceData();
    })
    .catch(error => {
      console.error('Ошибка при добавлении записи о посещаемости:', error);
      throw error; // Проброс ошибки для обработки в handleAddSubmit
    });
  };

  const editAttendance = (filialId, attendanceId, updatedAttendance, pricePerSession) => {
    return axios.put(`${API_BASE_URL}/dnevnik/${attendanceId}`, {
      filial_id: filialId,
      date: updatedAttendance.date,
      number_of_children: updatedAttendance.number_of_children,
      price_per_session: pricePerSession, // Используем pricePerSession, переданный в функцию
      prepod_id: updatedAttendance.prepod_id
    })
    .then(() => {
      fetchAttendanceData();
    })
    .catch(error => {
      console.error('Ошибка при редактировании записи о посещаемости:', error);
      throw error; // Проброс ошибки для обработки в handleEditSubmit
    });
  };

  const deleteAttendance = (filialId, attendanceId) => {
    return axios.delete(`${API_BASE_URL}/dnevnik/${attendanceId}`)
    .then(() => {
      fetchAttendanceData();
    })
    .catch(error => {
      console.error('Ошибка при удалении записи о посещаемости:', error);
      throw error; // Проброс ошибки для обработки в handleDeleteSubmit
    });
  };

  return (
    <div className='card_main pd20'>
      <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      <div className="filials mt20">
        {filials.map(filial => (
          <FilialCard
            key={filial.id}
            filial={filial}
            attendance={attendanceData[filial.name] || []}
            addAttendance={addAttendance}
            editAttendance={editAttendance}
            deleteAttendance={deleteAttendance}
            prepods={prepods}
          />
        ))}
      </div>
    </div>
  );
};
