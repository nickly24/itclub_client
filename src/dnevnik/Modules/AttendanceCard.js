import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdPricetags } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

const AttendanceCard = ({ record, filialId, editAttendance, deleteAttendance, prepods, pricePerSession }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAttendance, setEditedAttendance] = useState({
    date: record.date,
    number_of_children: record.number_of_children,
    prepod_id: record.prepod_id
  });

  const dayOfWeek = new Date(record.date).toLocaleDateString('ru-RU', { weekday: 'short' });

  // Extract and format the date to MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}`;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = () => {
    editAttendance(filialId, record.id, editedAttendance, pricePerSession); // Передаем стоимость занятия
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (record.id) {
      deleteAttendance(filialId, record.id);
    } else {
      console.error('Record ID is undefined');
    }
  };

  const updatedPrepod = prepods.find(prepod => prepod.id === editedAttendance.prepod_id);

  return (
    <div className="attendance-card">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="date"
            value={editedAttendance.date}
            onChange={(e) => setEditedAttendance({ ...editedAttendance, date: e.target.value })}
          />
          <input
            type="number"
            placeholder="Количество детей"
            value={editedAttendance.number_of_children}
            onChange={(e) => setEditedAttendance({ ...editedAttendance, number_of_children: e.target.value })}
          />
          <select className='add_dnevnik_input'
                value={editedAttendance.prepod_id}
                onChange={(e) => setEditedAttendance({ ...editedAttendance, prepod_id: e.target.value })}
              >
                <option value="">Выберите преподавателя</option>
                {prepods.map(prepod => (
                  <option key={prepod.id} value={prepod.id}>{prepod.name}</option>
                ))}
              </select>
          <button onClick={handleEditSubmit}>Сохранить</button>
          <button onClick={() => setIsEditing(false)}>Отмена</button>
        </div>
      ) : (
        <>
          <div className='card_data'>{formatDate(record.date)} ({dayOfWeek})</div>
          <div><FaPeopleGroup className='people-icon' /> : {record.number_of_children}</div>
          <div className='icons_mb'><IoMdPricetags className='people-icon'/> : {record.price_per_session} руб.</div>
          <div className='icons_mb prepod_name' >
            <IoPerson style={{ color: updatedPrepod?.color || record.color }} /> {updatedPrepod?.name || record.prepod_name}
          </div>
          <MdEdit onClick={handleEditClick} className='click_icon_edit'/>
          <FaTrash onClick={handleDeleteClick} className='click_icon_delete'/>
        </>
      )}
    </div>
  );
};

export default AttendanceCard;
