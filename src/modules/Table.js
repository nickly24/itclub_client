import React, { useState, useEffect } from "react";
import { IoIosRefreshCircle } from "react-icons/io";
import axios from 'axios';
import TableCard from './TableCard';
import AddSchedule from "./AddTable";  // исправить имя файла, если нужно

import { api_main } from './constants'; // путь к вашему файлу constants.js

const api = `${api_main}schedules`;

export default function Table() {
  const [data, setData] = useState([]);
  const [collapsed, setCollapsed] = useState({});

  const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

  const toggleCollapse = (day) => {
    setCollapsed(prevState => ({
      ...prevState,
      [day]: !prevState[day]
    }));
  };

  const refreshKindergartens = async () => {
    try {
      const response = await axios.get(api);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  useEffect(() => {
    refreshKindergartens();
  }, []);

  const sortByTime = (a, b) => {
    const timeA = a.time.split(":").map(Number);
    const timeB = b.time.split(":").map(Number);
    return timeA[0] - timeB[0] || timeA[1] - timeB[1];
  };

  const handleSave = async (updatedSchedule) => {
    try {
      await axios.put(`${api}/${updatedSchedule.id}`, updatedSchedule);
      setData(data.map(item => item.id === updatedSchedule.id ? updatedSchedule : item));
    } catch (error) {
      console.error('Error updating schedule:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const handleScheduleAdded = async (newSchedule) => {
    try {
      const response = await axios.get(`${api}/${newSchedule.filial_id}`);
      const filialData = response.data;

      const updatedSchedule = {
        ...newSchedule,
        name: filialData.name,
        address: filialData.address,
        metro: filialData.metro,
        metro_color: filialData.metro_color,
      };

      setData([...data, updatedSchedule]);
    } catch (error) {
      console.error('Error fetching filial data:', error);
      refreshKindergartens(); // fallback to refresh if there's an error
    }
  };

  return (
    <div className="card_main pd20">
      <AddSchedule onScheduleAdded={handleScheduleAdded} />
      <div className="textright">
        <IoIosRefreshCircle onClick={refreshKindergartens} className="refresh-icon" />
      </div>
      {daysOfWeek.map((day, index) => (
        <div key={index} className="card_main pd20 mb15">
          <div className="weekday">
            <button onClick={() => toggleCollapse(day)} className="cardopen">
              {collapsed[day] ? "+" : "-"}
            </button>
            {day}
          </div>
          {!collapsed[day] && (
            <div className="grid3 mt20">
              {data
                .filter(schedule => schedule.day_of_week === day)
                .sort(sortByTime)
                .map((schedule, idx) => (
                  <TableCard
                    key={idx}
                    schedule={schedule}
                    onSave={handleSave}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
