import React, { useState, useEffect } from 'react';
import './Css/Navbar.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import logo from '../Components/Imagenes/letra 2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'


export default function Navbar({ user, setUser }) {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // State for dropdown visibility

    useEffect(() => {
        const closeProfileDropdown = () => {
            setIsProfileDropdownOpen(false);
        };

        // Close profile dropdown when clicking outside of it
        document.addEventListener('click', closeProfileDropdown);

        // Clean up event listener on unmount
        return () => {
            document.removeEventListener('click', closeProfileDropdown);
        };
    }, []);

    const handleProfileClick = (event) => {
        event.stopPropagation(); // Prevent event propagation to document click listener
        setIsProfileDropdownOpen(!isProfileDropdownOpen); // Toggle dropdown visibility on click
    };

    console.log("Valor actual de user en Navbar:", user); // Log user information

    if (user === null) {
        // Render content for non-authenticated users (unchanged)
        return (
            <header className='navbar'>
                <nav>
                    <ul>
                        <li>
                            <Link id="panel" className='playcode' to="/">
                                <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }} />
                            </Link>
                        </li>
                        <li><Link id="panel" to="/login">Login</Link></li>
                        <li><Link id="panel" to="/registro">Register</Link></li>
                    </ul>
                </nav>
            </header>
        );
    } else {
        // Render content for authenticated users
        const handleLogout = () => {
            localStorage.removeItem('token'); // Remove token from Local Storage
            setUser(null); // Clear user state on logout
        };

        return (
            <header className='navbar'>
                <nav>
                    <ul>
                        <li><Link id="panel" to="/dashboard">Dashboard</Link></li>
                        <li className="profile-container"> {/* Wrap "Profile" in a container */}
                            <Link id="profile" onClick={handleProfileClick}>
                                Profile {isProfileDropdownOpen ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                            </Link>

                            {isProfileDropdownOpen && ( // Conditionally render dropdown content
                                <ul className="profile-dropdown">
                                    <li><Link to="/perfil">Modify Profile</Link></li>
                                    <li><Link to="/editpassword">Modify Password</Link></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button className="cerrarSesion" onClick={handleLogout}>
                                Close Session
                            </button>
                        </li>

                    </ul>
                </nav>
            </header>
        );
    }
}
