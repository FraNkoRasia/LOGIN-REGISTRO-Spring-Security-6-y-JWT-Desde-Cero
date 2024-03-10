import React from 'react';
import './Css/formEditPassword.css';

export default function EditPassword() {
    return (
        <div className="container">
            <div className='h1'>
               <h1 align="center">Modify Password</h1> 
            </div>
                
            
            <form className='formEditPassword'>
                <input type='hidden' name="id" />
                <div>
                    <label htmlFor="currentPassword" className="form-label">Current password</label>
                    <input type="password" name="currentPassword" placeholder="Ingresa tu contraseña Actual" className="form-control" id="currentPassword" required />
                </div>
                <div>
                    <label htmlFor="newPassword" className="form-label">Enter your new Password</label>
                    <input type='password' name='newPassword' placeholder="Ingresa tu nueva Password" className="form-control" id="newPassword" minLength="6" />
                </div>
                <div>
                    <label htmlFor="newPassword2" className="form-label">Repeat your new Password</label>
                    <input type="password" name='newPassword2' placeholder="Repite tu nueva Password" className="form-control" id="newPassword2" minLength="6" />
                </div>
                <div className='botonEdit'>
                    <button type="submit" className="btn btn-dark">Modify</button>
                </div>
            </form>
        </div>
    );
}
