import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  //con urlParams atrapo el token para restablecer la contraseña 
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  console.log(token); // Esto imprimirá el valor del token en la consola


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8080/auth/reset-password/${token}`, { password });
      setMessage(response.data);
    } catch (error) {
      setMessage('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.');
    }
  };


  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nueva Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Confirmar Nueva Contraseña:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </label>
        <button id="boton" type="submit">Restablecer Contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPasswordForm;
