import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/forgot-password', { email });
            setMessage(response.data);
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data);
            } else {
                setMessage('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.');
            }
        }
    };

    return (
        <div className="container">
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Correo Electrónico:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    />
                </label>
                <button id="boton" type="submit">Enviar Solicitud</button>
            </form>
            {message && <p id="message">{message}</p>}
        </div>
    );

}

export default ForgotPassword;
