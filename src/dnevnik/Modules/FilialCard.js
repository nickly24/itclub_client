import React, { useState } from 'react';
import AttendanceCard from './AttendanceCard';
import { FaPlus } from 'react-icons/fa';

const FilialCard = ({ filial, attendance, addAttendance, editAttendance, deleteAttendance, prepods }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newAttendance, setNewAttendance] = useState({
    date: '',
    number_of_children: '',
    prepod_id: ''
  });

  const totalSum = attendance.reduce((sum, record) => sum + record.number_of_children * record.price_per_session, 0);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleAddSubmit = () => {
    if (!newAttendance.date || !newAttendance.number_of_children || !newAttendance.prepod_id) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }
    
    addAttendance(filial.id, newAttendance, filial.price)
      .then(() => {
        setIsAdding(false);
        setNewAttendance({ date: '', number_of_children: '', prepod_id: '' });
      })
      .catch(error => {
        console.error('Ошибка при добавлении записи о посещаемости:', error);
      });
  };

  return (
    <div className="dnevnik-filial-card">
      <h3>{filial.name}</h3>
      <div>
        <div className="attendance-cards">
          {attendance.map(record => (
            <AttendanceCard
              key={record.id}
              record={record}
              filialId={filial.id}
              editAttendance={editAttendance}
              deleteAttendance={deleteAttendance}
              prepods={prepods}
              pricePerSession={filial.price} // Передаем стоимость занятия
            />
          ))}
          {isAdding ? (
            <div className="add-form">
              <input className='add_dnevnik_input'
                type="date"
                value={newAttendance.date}
                onChange={(e) => setNewAttendance({ ...newAttendance, date: e.target.value })}
              />
              <input className='add_dnevnik_input'
                type="number"
                placeholder="Количество детей"
                value={newAttendance.number_of_children}
                onChange={(e) => setNewAttendance({ ...newAttendance, number_of_children: e.target.value })}
              />
              <select className='add_dnevnik_input'
                value={newAttendance.prepod_id}
                onChange={(e) => setNewAttendance({ ...newAttendance, prepod_id: e.target.value })}
              >
                <option value="">Выберите преподавателя</option>
                {prepods.map(prepod => (
                  <option key={prepod.id} value={prepod.id}>{prepod.name}</option>
                ))}
              </select>
              <button className='table_btn_update' onClick={handleAddSubmit}>Добавить</button>
              <button className='table_btn_back' onClick={() => setIsAdding(false)}>Отмена</button>
            </div>
          ) : (
            <button onClick={handleAddClick} className="add-button add_attendance">
              <FaPlus /> Добавить посещение
            </button>
          )}
        </div>
      </div>
      <div className="total-sum">Сумма: {totalSum} руб.</div>
    </div>
  );
};

export default FilialCard;
