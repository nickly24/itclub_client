import React, { useState, useEffect } from "react";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import EditModal from './EditModal';

function TableCard({ schedule, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [time, setTime] = useState(schedule.time);
  const [day, setDay] = useState(schedule.day_of_week);

  useEffect(() => {
    setTime(schedule.time);
    setDay(schedule.day_of_week);
  }, [schedule]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    onSave({ ...schedule, time, day_of_week: day });
    handleClose();
  };

  const handleDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить это расписание?")) {
      onDelete(schedule.id);
    }
  };

  return (
    <div className="table_card" style={{ borderLeft: `5px solid ${schedule.metro_color}` }}>
      <div className="table_card_time">{schedule.time.slice(0, 5)}</div>
      <div className="table_card_name">{schedule.name}</div>
      <div className="table_card_address">{schedule.address}</div>
      <div className="table_card_prepod">{schedule.prepod}</div>
      <MdEdit className="edit-icon" onClick={handleEdit} />
      <MdDeleteForever className="edit-icon" onClick={handleDelete} />

      <EditModal
        isOpen={isEditing}
        onClose={handleClose}
        time={time}
        day={day}
        setTime={setTime}
        setDay={setDay}
        onSave={handleSave}
      />
    </div>
  );
}

export default TableCard;
