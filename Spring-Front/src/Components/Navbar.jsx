import React from 'react';
import './Css/Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../Components/Imagenes/letra 2.png';

export default function Navbar({ user, setUser }) {
    console.log("Valor actual de user en Navbar:", user); // Agrega este console.log para verificar el valor de user

    if (user === null) { // Cambiado a null
        // Renderizar contenido para usuarios no autenticados
        return (
            <header className='navbar'>
                <nav>

                    <ul >
                        <li><Link id="panel" className='playcode' to="/"><img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }} /></Link></li>
                        {/* <li><Link id="panel" to="/">Inicio</Link></li> */}
                        <li><Link id="panel" to="/login">Login</Link></li>
                        <li><Link id="panel" to="/registro">Registro</Link></li>
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
                        <li><Link id="panel" to="/home">Home</Link></li>
                        <li><Link id="panel" to="/perfil">Perfil</Link></li>
                        <li><Link className="cerrarSesion" to="/login" onClick={handleLogout}>Cerrar Sesión</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}