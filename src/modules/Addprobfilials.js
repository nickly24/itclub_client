import React, { useState } from 'react';
import axios from 'axios';
import MetroStationsSelector from './MetroStationsSelector';
import { api_main } from './constants'; // путь к вашему файлу constants.js

const api = `${api_main}probfilials`;

const AddTrialFilial = () => {
  const [selectedStation, setSelectedStation] = useState({ name: '', color: '' });
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    metro: '',
    color: '',  // Изменено с metro_color на color
    price: '',
    trialDate: '',
    dayOfWeek: '',
    time: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData, metro: selectedStation.name, color: selectedStation.color };  // Изменено с metro_color на color

    try {
      const response = await axios.post(api, dataToSubmit);
      console.log('Response:', response.data);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

      setFormData({
        name: '',
        address: '',
        metro: '',
        color: '',  // Изменено с metro_color на color
        price: '',
        trialDate: '',
        dayOfWeek: '',
        time: ''
      });
      setSelectedStation({ name: '', color: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='card_main pd20'>
      <h1>Добавить пробное занятие</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Название: <br/>
            <input className='select_form_gr'
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Адрес: <br/>
            <input className='select_form_gr'
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <MetroStationsSelector selectedStation={selectedStation} setSelectedStation={setSelectedStation} />
        <div>
          <label>
            Цена: <br/>
            <input className='select_form_gr'
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Дата пробного занятия: <br/>
            <input className='select_form_gr'
              type="date"
              name="trialDate"
              value={formData.trialDate}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            День недели: <br/>
            <select 
              className='select_form_gr'
              name="dayOfWeek"
              value={formData.dayOfWeek}
              onChange={handleInputChange}
              required
            >
              <option value="">Выберите день</option>
              <option value="Понедельник">Понедельник</option>
              <option value="Вторник">Вторник</option>
              <option value="Среда">Среда</option>
              <option value="Четверг">Четверг</option>
              <option value="Пятница">Пятница</option>
              <option value="Суббота">Суббота</option>
              <option value="Воскресенье">Воскресенье</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Время: <br/>
            <input className='select_form_gr'
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <button className='form_btn' type="submit">Отправить</button>
      </form>
      {showSuccess && (
        <div style={{ color: 'green', marginTop: '10px', transition: 'opacity 1s', opacity: showSuccess ? 1 : 0 }}>
          Пробное занятие успешно добавлено!
        </div>
      )}
      <div style={{ marginTop: '20px' }}>
        <h2>Вы выбрали станцию:</h2>
        {selectedStation.name && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                display: 'inline-block',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: selectedStation.color,
                marginRight: '8px'
              }}
            ></span>
            {selectedStation.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTrialFilial;
