import React, { useEffect, useState } from 'react';
import { FilialCard } from "./FilialCard";
import { IoIosRefreshCircle } from "react-icons/io";
import axios from 'axios';
import { api_main } from './constants'; // путь к вашему файлу constants.js

const api = `${api_main}filials`;

export default function Filials() {
  const [kindergartens, setKindergartens] = useState([]);
  const [loading, setLoading] = useState(true); // Добавляем состояние загрузки

  const refreshKindergartens = async () => {
    try {
      setLoading(true); // Устанавливаем состояние загрузки в true перед запросом
      const response = await axios.get(api);
      setKindergartens(response.data);
    } catch (error) {
      console.error('Error fetching filials:', error);
    } finally {
      setLoading(false); // Устанавливаем состояние загрузки в false после завершения запроса
    }
  };

  const deleteKindergarten = async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      setKindergartens(prevKindergartens => prevKindergartens.filter(k => k.id !== id));
    } catch (error) {
      console.error('Error deleting filial:', error);
    }
  };

  const updateKindergarten = () => {
    refreshKindergartens();
  };

  useEffect(() => {
    refreshKindergartens();
  }, []);

  return (
    <div className='card_main pd20'>
      <div className='textright'><IoIosRefreshCircle onClick={refreshKindergartens} className="refresh-icon" /></div>
      {loading ? ( // Условно рендерим сообщение о загрузке
        <div>Идет загрузка...</div>
      ) : (
        kindergartens.map((kindergarten, index) => (
          <FilialCard
            key={index}
            id={kindergarten.id}
            name={kindergarten.name}
            address={kindergarten.address}
            price={kindergarten.price}
            metro={kindergarten.metro}
            color={kindergarten.metro_color}
            tel={kindergarten.tel}
            comment={kindergarten.comment}
            onDelete={deleteKindergarten}
            onUpdate={updateKindergarten}
            api={api}  // Передаем api как пропс
          />
        ))
      )}
    </div>
  );
}
