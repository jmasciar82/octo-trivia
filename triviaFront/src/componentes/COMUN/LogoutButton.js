import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
    const navigate = useNavigate();
    const navigate2 = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');  // Redirige a la ruta /
    };
    const handleRegister = () => {
        
        navigate2('/registerAdmin');  // Redirige a la ruta /
    };

    return (
        <div>
            <button onClick={handleLogout} className="btn btn-danger">
                Logout
            </button>
            <button onClick={handleRegister} className="btn btn-danger">
                Register
            </button>
        </div>

    );
};

export default LogoutButton;
