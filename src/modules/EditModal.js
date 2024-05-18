import React from "react";

function EditModal({ isOpen, onClose, time, day, setTime, setDay, onSave }) {
  const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal_content">
        <h2>Редактировать</h2>
        <label className="edit_label">
          Время:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
        <br/><br/>
        <label className="edit_label">
          День недели:
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            {daysOfWeek.map((day, idx) => (
              <option key={idx} value={day}>{day}</option>
            ))}
          </select>
        </label>
        <br/><br/>
        <button onClick={onSave} className="table_btn_update">Обновить</button>
        <button onClick={onClose} className="table_btn_back">Отмена</button>
      </div>
    </div>
  );
}

export default EditModal;
