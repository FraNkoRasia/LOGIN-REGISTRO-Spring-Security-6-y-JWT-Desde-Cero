import React from 'react';
import './Css/Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
    console.log("Valor actual de user en Navbar:", user); // Agrega este console.log para verificar el valor de user

    if (user === null) { // Cambiado a null
        // Renderizar contenido para usuarios no autenticados
        return (
            <header className='navbar'>
                <nav>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/registro">Registro</Link></li>
                    </ul>
                </nav>
            </header>
        );
    } else {
        // Renderizar contenido para usuarios autenticados
        const handleLogout = () => {
            localStorage.removeItem('token'); // Eliminar el token del Local Storage
            setUser(null); // Limpiar el estado de usuario al hacer logout
        };

        return (
            <header className='navbar'>
                <nav>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/perfil">Perfil</Link></li>
                        <li><Link to="/login" onClick={handleLogout}>Cerrar Sesión</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}