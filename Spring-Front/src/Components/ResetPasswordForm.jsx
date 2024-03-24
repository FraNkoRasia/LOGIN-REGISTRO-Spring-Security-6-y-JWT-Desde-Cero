import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Css/ResetPasswordForm.css';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  //con urlParams atrapo el token para restablecer la contraseña 
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const navigate = useNavigate(); // Obtiene la función de navegación

  //console.log(token); // Esto imprimirá el valor del token en la consola


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      setTimeout(() => setMessage(''), 5000); // Establecer el mensaje en blanco después de 5 segundos
      return; // Detener el envío del formulario
    }
  
    try {
      const response = await axios.post(`http://localhost:8080/auth/reset-password/${token}`, { password });
      setMessage(response.data);
      alert('Contraseña Restablecida - Redirigir al Login');
      navigate('/login');
    } catch (error) {
      alert('Hubo un error - Link de Restablecimiento Expirado');
      navigate('/forgot-password');
      setMessage('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.');
    }
  };
  


  return (
    <div className="container">

      <form onSubmit={handleSubmit}>
        <h2 className='Titulo-RestablecerContraseña'>Restablecer Contraseña</h2>
        <label>
          Nueva Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Confirmar Nueva Contraseña:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </label>
        <button id="boton" type="submit">Restablecer Contraseña</button>
        {message && <p className="error">{message}</p>}
      </form>
      

    </div>
  );
}

export default ResetPasswordForm;
