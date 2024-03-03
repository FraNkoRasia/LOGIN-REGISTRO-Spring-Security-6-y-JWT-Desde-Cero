import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { Home } from './Components/Home'; // Suponiendo que tengas un componente llamado Home
import Inicio from './Components/Inicio'; // Suponiendo que tengas un componente llamado Inicio
import { FormularioLogin } from './Components/Login'; // Suponiendo que tengas un componente llamado Login
import Registro from './Components/Registro'; // Suponiendo que tengas un componente llamado Registro
import Perfil from './Components/Perfil'; // Suponiendo que tengas un componente llamado Perfil

function App() {
  const [user, setUser] = useState(null); // Cambiado a null

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(token);
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<FormularioLogin setUser={setUser} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
}

export default App;
