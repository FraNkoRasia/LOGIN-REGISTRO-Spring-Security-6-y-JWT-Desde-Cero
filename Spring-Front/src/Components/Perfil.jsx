import './Css/Perfil.css';
import React from 'react';

export default function Perfil() {
  return (

    <div className="container">

      <h1 className='h1'>Modify your Profile</h1>

      <form className='perfil'>

        <div>
          <label for="nombre" class="form-label">Name</label>
          <input type="text" name="nombre" id="nombre" placeholder='Your Name' />
        </div>

        <div>
          <label for="apellido" class="form-label">Lastname</label>
          <input type="text" name="apellido" id="apellido"  placeholder='Your Lastname'/>
        </div>

        <div>
          <label for="email" class="form-label">Email</label>
          <input type="text" name="email" id="email"  placeholder='Your Email'/>
        </div>

        <div>
          <label for="telefono" class="form-label">Phone</label>
          <input type="text" name="telefono" id="telefono"  placeholder='Your Phone'/>
        </div>

        <div>
          <label for="currentPassword" class="form-label" >Enter Current Password</label>
          <input type="password" name="currentPassword" id="currentPassword" placeholder="Ingresar contraseña Actual" required />
        </div>

        <div className='botonPerfil'>
          <button type="submit">Modify</button>
        </div>
      </form>
    </div>

  );
}
