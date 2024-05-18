import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('RUB');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/create-payment', {
                amount: amount,
                currency: currency,
                description: description
            });

            // Redirect user to the payment confirmation URL
            window.location.href = response.data.confirmation.confirmation_url;
        } catch (error) {
            console.error('Error creating payment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Amount:</label>
                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
                <label>Currency:</label>
                <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button type="submit">Pay</button>
        </form>
    );
};

export default PaymentForm;
