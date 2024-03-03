import React from 'react';
import './Css/Registro.css';

export default function Registro() {
  return (
    <div>
      <div className="contenedor-registro">
        <form className="formularioRegistro">
          <h1 className='titulo'>Registro</h1>
          <div className="nombre-apellido">
            <div className="input-pair">
              <label htmlFor="nombre">Nombre </label>
              <input type="text" name="nombre" id="nombre" placeholder="Ingresa tu nombre" />
            </div>
            <div className="input-pair">
              <label htmlFor="apellido">Apellido </label>
              <input type="text" name="apellido" id="apellido" placeholder="Ingresa tu apellido" />
            </div>
          </div>
          <div className='input-email'>
            <label htmlFor="email">Email </label>
            <input type="email" name="email" id="email" placeholder="Ingresa tu email" />
          </div>
          <div className="passwords">
            <div className="input-pair">
              <label htmlFor="password">Password </label>
              <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña" />
            </div>
            <div className="input-pair">
              <label htmlFor="repitePassword">Repite Password </label>
              <input type="password" name="repitePassword" id="repitePassword" placeholder="Repite tu contraseña" />
            </div>
          </div>
          <div className="documento-pais">
            <div className="input-pair">
              <label htmlFor="dni">Documento </label>
              <input type="number" name="dni" id="dni" placeholder="Ingresa tu documento" />
            </div>
            <div className="input-pair">
              <label htmlFor="telefono">Teléfono </label>
              <input type="text" name="telefono" id="telefono" placeholder="Ingresa tu teléfono" />
            </div>
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}

