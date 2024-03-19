import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Login from './Components/Login';
import Registro from './Components/Registro';
import Perfil from './Components/Perfil';
import Contacto from './Components/Contacto';
import EditPassword from './Components/EditPassword';
import ForgotPassword from './Components/ForgotPassword'; // Importa el componente ForgotPassword aquí
import ResetPasswordForm from './Components/ResetPasswordForm'; // Importa el componente ResetPasswordForm aquí
import ProtectedRoute from './Components/ProtectedRoute';
import { useLocalStorage } from 'react-use';
import { jwtDecode } from 'jwt-decode';
import Footer from './Components/Footer';


function App() {
  const [user, setUser] = useLocalStorage('user');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);


  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* RUTAS PROTEGIDAS - PARA USUARIOS LOGUEADOS */}
        <Route element={<ProtectedRoute canActivate={user} />}>
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/perfil" element={<Perfil user={user} />} />
          <Route path="/editPassword" element={<EditPassword user={user} />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>

        {/* Rutas para usuarios no logueados */}
        <Route element={<ProtectedRoute canActivate={!user} />}>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPasswordForm />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
