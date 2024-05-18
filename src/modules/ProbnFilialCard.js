import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

export function ProbnFilialCard({ kindergarten, onDelete, onEdit, isHighlighted }) {
  const { name, address, price, metro, color, trialDate, dayOfWeek, time } = kindergarten;
  const cardStyle = isHighlighted ? { border: '2px solid red' } : {};

  const formatTrialDate = (date) => {
    const options = { month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('ru-RU', options);
  };

  const formatTime = (time) => {
    return time.slice(0, -3); // Remove seconds
  };

  return (
    <div className='pd20 card_main mb15' style={cardStyle}>
      <div className="flex al_itms_c">
        <div>
          <div className="filial_name">{name}</div>
          <div className="filial_adress">{address}</div>
        </div>
        <div className="mla textright">
          <div className="filial_price">{price} / чел</div>
          <div className="flex al_itms_c textright">
            <div className="filial_metro textright">{metro}</div>
            <div className="filial_metro_color ml5 textright" style={{ background: color }}></div>
          </div>
        </div>
      </div>
      <div className="probn_date">{formatTrialDate(trialDate)}</div>
      <div>{dayOfWeek}</div>
      <div>{formatTime(time)}</div>
      <div className="textright">
        <MdEdit className='mt20 mr10' size={24} color="#0000EE" onClick={onEdit} />
        <MdDeleteForever className='mt20' size={24} color="#EE6E35" onClick={onDelete} />
      </div>
    </div>
  );
}
