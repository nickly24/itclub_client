import axios from 'axios';
import React, { useState, useEffect } from 'react';
import api from '../api';
const api = axios.create({
  baseURL: 'https://api.gigachat.sber.ru/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'a523675b-4186-45d3-b590-92b4c2653a30' // замените на ваш API-ключ
  }
});

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    api.get('conversations')
      .then(response => {
        setMessages(response.data.messages);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSendMessage = () => {
    api.post('messages', {
      text: inputValue,
      conversation_id: 'YOUR_CONVERSATION_ID' // замените на ваш ID разговора
    })
      .then(response => {
        setMessages([...messages, response.data]);
        setInputValue('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h1>Чат-бот</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Введите сообщение"
      />
      <button onClick={handleSendMessage}>Отправить</button>
    </div>
  );
};

export default Chatbot;