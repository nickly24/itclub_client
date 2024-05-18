import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProbnFilialCard } from "./ProbnFilialCard";
import { IoIosRefreshCircle } from "react-icons/io";
import Modal from 'react-modal';
import { api_main } from './constants'; // путь к вашему файлу constants.js

const api = `${api_main}probfilials`;
Modal.setAppElement('#root');

const formatDateForSQL = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function ProbnFilials() {
  const [trialKindergartens, setTrialKindergartens] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentKindergarten, setCurrentKindergarten] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', address: '', price: '', metro: '', color: '', trialDate: '', dayOfWeek: '', time: '' });

  const fetchTrialKindergartens = async () => {
    try {
      const response = await axios.get(api);
      setTrialKindergartens(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  useEffect(() => {
    fetchTrialKindergartens();
  }, []);

  const refreshTrialKindergartens = async () => {
    await fetchTrialKindergartens();
  };

  const deleteKindergarten = async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      fetchTrialKindergartens();
    } catch (error) {
      console.error('Ошибка при удалении данных:', error);
    }
  };

  const updateKindergarten = async (id, updatedData) => {
    try {
      const response = await axios.put(`${api}/${id}`, updatedData);
      console.log('Response:', response.data); // Логирование ответа сервера
      fetchTrialKindergartens();
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error.response ? error.response.data : error.message);
    }
  };

  const openDeleteModal = (kindergarten) => {
    setCurrentKindergarten(kindergarten);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentKindergarten(null);
  };

  const openEditModal = (kindergarten) => {
    setCurrentKindergarten(kindergarten);
    setEditForm(kindergarten);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentKindergarten(null);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...editForm,
      trialDate: formatDateForSQL(editForm.trialDate)
    };

    console.log('Updated Data:', updatedData); // Логирование данных перед отправкой
    updateKindergarten(currentKindergarten.id, updatedData);
    closeEditModal();
  };

  const sortedKindergartens = [...trialKindergartens].sort((a, b) => {
    const dateA = new Date(`${a.trialDate}T${a.time}:00`);
    const dateB = new Date(`${b.trialDate}T${b.time}:00`);
    return dateA - dateB;
  });

  return (
    <div className='card_main pd20'>
      <div className='textright'>
        <IoIosRefreshCircle onClick={refreshTrialKindergartens} className="refresh-icon" />
      </div>
      {sortedKindergartens.map((kindergarten, index) => (
        <ProbnFilialCard
          key={index}
          kindergarten={kindergarten}
          onDelete={() => openDeleteModal(kindergarten)}
          onEdit={() => openEditModal(kindergarten)}
          isHighlighted={index < 3}
        />
      ))}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation"
        className="custom-modal-content-delete"
        overlayClassName="custom-modal-overlay"
      >
        <button className="custom-modal-close" onClick={closeDeleteModal}>&times;</button>
        <h2>Вы точно хотите удалить?</h2>
        <div className="custom-modal-footer">
          <button onClick={() => { deleteKindergarten(currentKindergarten.id); closeDeleteModal(); }}>Да</button>
          <button onClick={closeDeleteModal}>Нет</button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Kindergarten"
        className="custom-modal-content-edit"
        overlayClassName="custom-modal-overlay"
      >
        <button className="custom-modal-close" onClick={closeEditModal}>&times;</button>
        <h2>Редактировать филиал</h2>
        <form onSubmit={handleEditFormSubmit} className="custom-modal-body">
          <label htmlFor="name">Название</label>
          <input type="text" name="name" value={editForm.name} onChange={handleEditFormChange} placeholder="Название" />
          <label htmlFor="address">Адрес</label>
          <input type="text" name="address" value={editForm.address} onChange={handleEditFormChange} placeholder="Адрес" />
          <label htmlFor="price">Цена</label>
          <input type="text" name="price" value={editForm.price} onChange={handleEditFormChange} placeholder="Цена" />
          <label htmlFor="metro">Метро</label>
          <input type="text" name="metro" value={editForm.metro} onChange={handleEditFormChange} placeholder="Метро" />
          <label htmlFor="color">Цвет</label>
          <input type="text" name="color" value={editForm.color} onChange={handleEditFormChange} placeholder="Цвет" />
          <label htmlFor="trialDate">Дата пробного занятия</label>
          <input type="date" name="trialDate" value={editForm.trialDate.split('T')[0]} onChange={handleEditFormChange} />
          <label htmlFor="dayOfWeek">День недели</label>
          <input type="text" name="dayOfWeek" value={editForm.dayOfWeek} onChange={handleEditFormChange} placeholder="День недели" />
          <label htmlFor="time">Время</label>
          <input type="time" name="time" value={editForm.time} onChange={handleEditFormChange} />
          <div className="custom-modal-footer">
            <button type="submit">Сохранить</button>
            
          </div>
        </form>
      </Modal>
    </div>
  );
}
