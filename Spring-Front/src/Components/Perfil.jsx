import './Css/Perfil.css';
import React, { useState } from 'react';
import axios from 'axios';

export default function Perfil({ user }) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [passport, setPassport] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/users/${user.userId}/modifyProfile`, {
        currentPassword: currentPassword,
        name: name,
        lastname: lastname,
        username: username,
        phone: phone,
        passport: passport
      });
      console.log(response.data);
      alert("Perfil modificado exitosamente");
      window.location.href = "/dashboard";
      // Aquí podrías redirigir al usuario a otra página o realizar cualquier otra acción necesaria después de modificar la contraseña
    } catch (error) {
      console.error(error);
      alert("Error al modificar el Perfil");
    }
  };
  return (

    <div className="container">

      <h1 className='h1'>Modify your Profile</h1>

      <form className='perfil' onSubmit={handleSubmit}>

        <div>
          <label for="name" class="form-label">Name</label>
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Your Name' />
        </div>

        <div>
          <label for="lastname" class="form-label">Lastname</label>
          <input type="text" name="lastname" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder='Your Lastname' />
        </div>

        <div>
          <label htmlFor="username">Email</label>
          <input type="email" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your Email" />
        </div>

        <div>
          <label for="phone" class="form-label">Phone</label>
          <input type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}  placeholder='Your Phone' />
        </div>

        <div>
          <label for="passport" class="form-label">Passport</label>
          <input type="text" name="passport" id="passport" value={passport} onChange={(e) => setPassport(e.target.value)} placeholder='Your Passport' />
        </div>

        <div>
          <label for="currentPassword" class="form-label" >Enter Current Password</label>
          <input type="password" name="currentPassword" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}  placeholder="Ingresar contraseña Actual" required />
        </div>

        <div className='botonPerfil'>
          <button type="submit">Modify</button>
        </div>
      </form>
    </div>

  );
}
