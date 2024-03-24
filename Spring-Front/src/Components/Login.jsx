import React, { useState } from "react";
import axios from "axios";
import "./Css/Login.css";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { jwtDecode } from 'jwt-decode';

export default function Login({ setUser }) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate(); // Obtiene la función de navegación

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === "" || password === "") {
            setError(true);
            return;
        }
        setError(false);

        try {
            const response = await axios.post(
                "http://localhost:8080/auth/authenticate",
                {
                    username: name,
                    password,
                }
            );
            if (response.status === 200) {
                const { jwt } = response.data;
                localStorage.setItem("token", jwt);
                setUser(jwtDecode(jwt)); // Decodifica el token y establece el usuario
                navigate('/dashboard'); // Redirige al usuario a la página de inicio del dashboard
            } else {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Método para manejar el evento de clic en "¿Olvidaste tu Contraseña?"
    const handleForgotPassword = (e) => {
        e.preventDefault();
        // Aquí puedes implementar la lógica para redirigir al usuario a la página de restablecimiento de contraseña
        // Por ejemplo:
        navigate('/forgot-password');
    };

    return (
        <div className="contenedor-login">
            <form className="formularioLogin" onSubmit={handleSubmit}>
                <h1 className='titulo'>Login</h1>
                <div className="label-login">
                    <label>User</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Username" />
                </div>
                <div className="label-login">
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" />
                </div>
                <button type="submit">Start Session</button>
                <a className="Olvidaste" href="#" onClick={handleForgotPassword}>Have you forgotten your password?</a>
            </form>
        </div>
    );
}
