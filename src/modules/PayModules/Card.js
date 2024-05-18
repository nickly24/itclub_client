import React from 'react';
import './PayCard.css';

const Card = ({ invoice }) => {
    const { id, amount, status, paid, metadata, confirmation } = invoice;
    const statusColor = paid ? 'green' : 'red';

    return (
        <div className="card card_main mb20 pd20">
            <h3 className='pc_num'>Счет #{metadata.orderNumber}</h3>
            <p className='pc_client'>Клиент: {metadata.custName}</p>
            <p>Сумма: {amount.value} {amount.currency}</p>
            <p style={{ color: statusColor }}>Статус: {paid ? 'Оплачен' : 'Не оплачен'}</p>
            <p>ID: {id}</p>
            <p>Статус: {status}</p>
            {confirmation && confirmation.confirmation_url && (
                <p><a href={confirmation.confirmation_url} target="_blank" rel="noopener noreferrer">Перейти к оплате</a></p>
            )}
        </div>
    );
};

export default Card;
