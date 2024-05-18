import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { api_main } from './constants'; // путь к вашему файлу constants.js

const api = `${api_main}filials`;


const MetroStations = ({ initialStationName = '', initialStationColor = '' }) => {
  const [stations, setStations] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStation, setSelectedStation] = useState({
    name: initialStationName,
    color: initialStationColor,
  });
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    metro: initialStationName,
    metro_color: initialStationColor,
    price: '',
    tel: '',
    comment: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: `
          [out:json];
          area[name="Москва"]->.searchArea;
          node["railway"="station"](area.searchArea);
          out body;
        `,
      });
      const data = await response.json();
      const stations = data.elements.map(element => ({
        id: element.id,
        name: element.tags.name,
        line: element.tags['railway:ref'],
        color: element.tags['colour'],
      }));
      setStations(stations);
    };

    fetchStations();
  }, []);

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleStationSelect = (station) => {
    setSelectedStation({ name: station.name, color: station.color });
    setSearchText(station.name);
    setFormData({ ...formData, metro: station.name, metro_color: station.color });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(api, formData);
      console.log('Response:', response.data);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

      setFormData({
        name: '',
        address: '',
        metro: '',
        metro_color: '',
        price: '',
        tel: '',
        comment: ''
      });
      setSelectedStation({ name: '', color: '' });
      setSearchText('');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='card_main pd20'>
      <h1>Добавить новый филиал</h1>
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
        <div>
          <label>
            Станция метро:<br/>
            <input className='select_form_gr'
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '300px', padding: '8px', fontSize: '16px' }}
            />
          </label>
          {searchText && (
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '4px' }}>
              {filteredStations.map(station => (
                <li
                  key={station.id}
                  onClick={() => handleStationSelect(station)}
                  style={{ padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: station.color,
                      marginRight: '8px'
                    }}
                  ></span>
                  {station.name}
                </li>
              ))}
            </ul>
          )}
        </div>
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
            Телефон: <br/>
            <input className='select_form_gr'
              type="text"
              name="tel"
              value={formData.tel}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Комментарий: <br/>
            <textarea className='select_form_gr'
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button className='form_btn' type="submit">Отправить</button>
      </form>
      {showSuccess && (
        <div style={{ color: 'green', marginTop: '10px', transition: 'opacity 1s', opacity: showSuccess ? 1 : 0 }}>
          Филиал успешно добавлен!
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

export default MetroStations;
