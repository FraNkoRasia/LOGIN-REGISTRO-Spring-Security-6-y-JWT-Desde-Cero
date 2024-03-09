import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Login from './Components/Login';
import Registro from './Components/Registro';
import Perfil from './Components/Perfil';
import EditPassword from './Components/EditPassword';
import ForgotPassword from './Components/ForgotPassword'; // Importa el componente ForgotPassword aquí
import ResetPasswordForm from './Components/ResetPasswordForm'; // Importa el componente ResetPasswordForm aquí
import ProtectedRoute from './Components/ProtectedRoute';
import { useLocalStorage } from 'react-use';


function App() {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useLocalStorage('user');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(token);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* RUTA - DASHBOARD Y PERFIL - PROTEGIDA */}
        <Route element={<ProtectedRoute canActivate={user} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/editPassword" element={<EditPassword />} />
        </Route>

        {/* Rutas para usuarios no logueados */}
        <Route element={<ProtectedRoute canActivate={!user} />}>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPasswordForm />} />
        </Route>
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;
