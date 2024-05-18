import React, { useState, useEffect } from 'react';
import MetroStationsSelector from './MetroStationsSelector';

export default function Modal({ show, onClose, onSubmit, filial }) {
  const [selectedStation, setSelectedStation] = useState({
    name: filial.metro,
    color: filial.metro_color,
  });

  const [formData, setFormData] = useState({ ...filial });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, metro: selectedStation.name, metro_color: selectedStation.color }));
  }, [selectedStation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Редактировать филиал</h2>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <label>
              Название:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Адрес:
              <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </label>
            <MetroStationsSelector selectedStation={selectedStation} setSelectedStation={setSelectedStation} />
            <label>
              Цена:
              <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </label>
            <label>
              Телефон:
              <input type="text" name="tel" value={formData.tel} onChange={handleChange} required />
            </label>
            <label>
              Комментарий:
              <textarea name="comment" value={formData.comment} onChange={handleChange} required></textarea>
            </label>
          </div>
          <div className="modal-footer">
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
}
