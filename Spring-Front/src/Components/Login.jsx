import React, { useState } from "react";
import axios from "axios";
import "./Css/Login.css";

export function FormularioLogin({ setUser }) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña
    const [error, setError] = useState(false);

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
                const { jwt } = response.data; // Extraer el token del objeto de respuesta
                localStorage.setItem("token", jwt); // Guardar el token en el Local Storage
                setUser(jwt); // Establecer el token como el valor de usuario en el estado
                window.location.href = "/home"; // Redirigir al usuario a la página de inicio
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
        window.location.href = '/forgot-password';
    };

    return (
        <section>
            <form className="formularioLogin" onSubmit={handleSubmit}>
                <h1 className='titulo'>Login</h1>
                <div className="label-login">
                    <label>Usuario</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Username" />
                </div>
                <div className="label-login">
                    <label>Contraseña</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" />
                </div>
                <button type="submit">Iniciar Sesión</button>
                <a className="Olvidaste" href="#" onClick={handleForgotPassword}>¿Olvidaste tu Contraseña?</a>
            </form>
        </section>
    );
}
