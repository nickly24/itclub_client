import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Modal from './Modal';
import './PayInfo.css'; // Import the CSS file
import { api_main } from '../constants'; // путь к вашему файлу constants.js

const api = `${api_main}payinfo`;
const PayInfo = () => {
    const [invoices, setInvoices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState(''); // Состояние фильтра по статусу
    const [currentPage, setCurrentPage] = useState(1); // Состояние текущей страницы
    const itemsPerPage = 3; // Количество элементов на странице

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get(api);
                setInvoices(response.data.items);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchInvoices();
    }, []);

    useEffect(() => {
        setStatusFilter('succeeded'); // Установка фильтра по умолчанию при монтировании компонента
    }, []);

    const handleSave = async (paymentData) => {
        try {
            const response = await axios.post(api, paymentData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setInvoices([...invoices, response.data]);
        } catch (error) {
            console.error('Error creating payment:', error);
        }
    };

    const filterInvoices = (invoices) => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return invoices.filter(invoice => {
            const invoiceDate = new Date(invoice.created_at);
            const invoiceMonth = invoiceDate.getMonth();
            const invoiceYear = invoiceDate.getFullYear();
            
            // Фильтрация по текущему месяцу и году
            const isCurrentMonth = invoiceMonth === currentMonth && invoiceYear === currentYear;
            
            // Фильтрация по статусу
            const matchesStatus = statusFilter ? invoice.status === statusFilter : true;

            return isCurrentMonth && matchesStatus;
        });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginatedInvoices = (filteredInvoices) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredInvoices.slice(startIndex, endIndex);
    };

    const filteredInvoices = filterInvoices(invoices);
    const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

    const handleFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1); // Сброс пагинации при изменении фильтра
    };

    return (
        <div>
            <h2>Список счетов</h2>
            <div>
                <label>
                    Фильтр по статусу:
                    <select value={statusFilter} onChange={handleFilterChange} className='ml5 pd5 select_form_small'>
                        <option value="">Все</option>
                        <option value="succeeded">Успешные</option>
                        <option value="pending">В ожидании</option>
                        <option value="canceled">Отмененные</option>
                        {/* Добавить другие опции фильтра, если нужно */}
                    </select>
                </label>
            </div>
            <button className='button_m1 mt20 mb15' onClick={() => setIsModalOpen(true)}>Добавить новый платеж</button>
            <div>
                {paginatedInvoices(filteredInvoices).map(invoice => (
                    <Card key={invoice.id} invoice={invoice} />
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={index + 1 === currentPage ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
        </div>
    );
};

export default PayInfo;
