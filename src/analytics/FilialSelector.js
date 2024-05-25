import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './Api';

const FilialSelector = ({ selectedFilial, setSelectedFilial }) => {
  const [filials, setFilials] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/filials`)
      .then(response => {
        setFilials(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении филиалов:', error);
      });
  }, []);

  return (
    <select className='select_form' value={selectedFilial} onChange={(e) => setSelectedFilial(e.target.value)}>
      <option value="all">Все филиалы</option>
      {filials.map(filial => (
        <option key={filial.id} value={filial.id}>{filial.name}</option>
      ))}
    </select>
  );
};

export default FilialSelector;
