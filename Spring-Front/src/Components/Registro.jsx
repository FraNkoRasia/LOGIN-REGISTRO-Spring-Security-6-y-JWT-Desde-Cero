import React, { useState } from 'react';
import axios from 'axios';
import './Css/Registro.css';
import { Link } from 'react-router-dom';

export default function Registro() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    username: '',
    password: '',
    repitePassword: '',
    passport: '',
    phone: ''
  });

  const [passwordError, setPasswordError] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState(''); // Agrega este estado para manejar el mensaje de registro

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que las contraseñas sean iguales
    if (formData.password !== formData.repitePassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const response = await axios.post('http://localhost:8080/registro', formData);
      console.log(response.data); // Manejar la respuesta del backend según sea necesario
      setRegistrationMessage('Registro Exitoso'); // Establecer el mensaje de éxito
    } catch (error) {
      console.error('Error al registrar: Email en uso', error);
      setRegistrationMessage('El Email ya se encuentra Registrado'); // Establecer el mensaje de error
    }
  };

  return (
    <div>
      <div className="contenedor-registro">
        <form className="formularioRegistro" onSubmit={handleSubmit}>
          <h1 className='titulo'>Registro</h1>
          <div className="nombre-apellido">
            <div className="input-pair">
              <label htmlFor="name">Nombre </label>
              <input type="text" name="name" id="name" placeholder="Ingresa tu nombre" onChange={handleChange} required />
            </div>
            <div className="input-pair">
              <label htmlFor="lastname">Apellido </label>
              <input type="text" name="lastname" id="lastname" placeholder="Ingresa tu apellido" onChange={handleChange} required />
            </div>
          </div>
          <div className='input-email'>
            <label htmlFor="username">Email </label>
            <input type="email" name="username" id="username" placeholder="Ingresa tu email" onChange={handleChange} required />
          </div>
          <div className="passwords">
            <div className="input-pair">
              <label htmlFor="password">Password </label>
              <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña" onChange={handleChange} required />
            </div>
            <div className="input-pair">
              <label htmlFor="repitePassword">Repite tu Password </label>
              <input type="password" name="repitePassword" id="repitePassword" placeholder="Repite tu contraseña" onChange={handleChange} required />

            </div>
          </div>
          <div className="documento-pais">
            <div className="input-pair">
              <label htmlFor="passport">Documento </label>
              <input type="number" name="passport" id="passport" placeholder="Ingresa tu documento" onChange={handleChange} required />
            </div>
            <div className="input-pair">
              <label htmlFor="phone">Teléfono </label>
              <input type="text" name="phone" id="phone" placeholder="Ingresa tu teléfono" onChange={handleChange} required />
            </div>
          </div>
          <button type="submit">Registrar</button>
          <p className='tienes-cuenta'>¿Ya tienes una cuenta? =&gt; <Link to="/login">Login</Link></p>
        </form>
        {passwordError && <p className="error-message">{passwordError}</p>}
        {registrationMessage && <p className={`registration-message ${registrationMessage === 'Registro Exitoso' ? 'success' : 'error'}`}>{registrationMessage}</p>}
      </div>
    </div>
  );
}
