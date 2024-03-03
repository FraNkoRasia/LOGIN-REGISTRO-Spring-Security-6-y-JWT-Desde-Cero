import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import Inicio from './Components/Inicio';
import { FormularioLogin } from './Components/Login';
import Registro from './Components/Registro';
import Perfil from './Components/Perfil';
import ForgotPassword from './Components/ForgotPassword'; // Importa el componente ForgotPassword aquí
import ResetPasswordForm from './Components/ResetPasswordForm'; // Importa el componente ResetPasswordForm aquí


function App() {
  const [user, setUser] = useState(null);

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
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Agrega la ruta para el componente ForgotPassword */}
        <Route path="/auth/reset-password" element={<ResetPasswordForm />} />
      </Routes>
    </Router>
  );
}

export default App;
