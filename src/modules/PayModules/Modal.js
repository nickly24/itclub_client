import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Modal.css';
import './PayInfo.css'; // Import the CSS file
import { api_main } from '../constants'; // путь к вашему файлу constants.js

const api1 = `${api_main}filials`;
const api2 = `${api_main}create-payment`;
const Modal = ({ isOpen, onClose, onSave }) => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get(api1);
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

    const handleSave = async () => {
        const paymentData = {
            amount: {
                value: amount,
                currency: 'RUB',
            },
            metadata: {
                custName: selectedClient,
            },
            capture: true,
            confirmation: {
                type: 'redirect',
                return_url: 'https://www.merchant-website.com/return_url'
            },
            description: `Payment for ${selectedClient}`,
            due_date: '2099-12-31T23:59:59.999Z' // Установка большого срока действия
        };

        try {
            const response = await axios.post(api2, paymentData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            onSave(response.data);
        } catch (error) {
            console.error('Error creating payment:', error);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="pm_modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Создать новый платеж</h2>
                <div className='mb15'>
                    <label>Клиент:</label>
                    <select className='ml5 pd20' value={selectedClient} onChange={e => setSelectedClient(e.target.value)}>
                        <option value="">Выберите клиента</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.name}>{client.name}</option>
                        ))}
                    </select>
                </div>
                <div className='mb15 '>
                    <label>Сумма:</label>
                    <input type="number" className='ml5 pd20' value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
                <button onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    );
};

export default Modal;
