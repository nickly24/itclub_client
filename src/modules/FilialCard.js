import React, { useState } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import Modal from './Modal';
import axios from 'axios';

export function FilialCard(props) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Вы точно хотите удалить?')) {
      props.onDelete(props.id);
    }
  };

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = async (updatedFilial) => {
    try {
      await axios.put(`${props.api}/${props.id}`, updatedFilial);
      props.onUpdate();
      setShowModal(false);
    } catch (error) {
      console.error('Error updating filial:', error);
    }
  };

  return (
    <div className={props.className}>
    <div className='pd20 card_main mb15 '>
      <div className="flex al_itms_c">
        <div>
          <div className="filial_name">{props.name}</div>
          <div className="filial_adress">{props.address}</div>
        </div>
        <div className="mla textright">
          <div className="filial_price">{props.price} / чел</div>
          <div className="flex al_itms_c textright">
            <div className="filial_metro textright">{props.metro}</div>
            <div className="filial_metro_color ml5 textright" style={{background: props.color}}></div>
          </div>
          <div className="textright">
            <MdEdit className='mt20 mr10' size={24} color="#0000EE" onClick={handleEdit} />
            <MdDeleteForever className='mt20' size={24} color="#EE6E35" onClick={handleDelete} />
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={handleModalClose} onSubmit={handleModalSubmit} filial={props} />
    </div>
    </div>
  );
}
