import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api_main } from './constants'; // путь к вашему файлу constants.js
const api = api_main.replace(/\/$/, '');


export default function AddSchedule({ onScheduleAdded }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filials, setFilials] = useState([]);
  const [selectedFilial, setSelectedFilial] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('Понедельник');
  const [time, setTime] = useState('');

  const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

  useEffect(() => {
    const fetchFilials = async () => {
      try {
        const response = await axios.get(`${api}/filials`);
        setFilials(response.data);
      } catch (error) {
        console.error('Error fetching filials:', error);
      }
    };

    fetchFilials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/schedules`, {
        day_of_week: dayOfWeek,
        time,
        filial_id: selectedFilial,
      });
      onScheduleAdded(response.data);
      setIsFormVisible(false);
      setSelectedFilial('');
      setDayOfWeek('Понедельник');
      setTime('');
    } catch (error) {
      console.error('Error adding schedule:', error);
    }
  };

  return (
    <div className="add-schedule mt20">
      <button className="add-schedule-button" onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Отмена' : 'Добавить'}
      </button>
      {isFormVisible && (
        <form className="add-schedule-form" onSubmit={handleSubmit}>
          <div className='grid3 mb15'>
            <label>
              Сад:
              <select className='select_form' value={selectedFilial} onChange={(e) => setSelectedFilial(e.target.value)} required>
                <option value="">Выберите сад</option>
                {filials.map((filial) => (
                  <option key={filial.id} value={filial.id}>
                    {filial.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              День недели:
              <select className='select_form' value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} required>
                {daysOfWeek.map((day, idx) => (
                  <option key={idx} value={day}>{day}</option>
                ))}
              </select>
            </label>
            <label>
              Время:
              <input className='select_form' type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </label>
          </div>
          <button className='form_btn' type="submit">Добавить расписание</button>
        </form>
      )}
    </div>
  );
}
