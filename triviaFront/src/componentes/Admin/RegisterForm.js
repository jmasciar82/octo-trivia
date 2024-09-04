import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import React, { useState, useCallback } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'; // Asegúrate de importar el CSS

const RegisterForm = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';
            const res = await axios.post(`${backendURL}/admin/auth/register`, { username, password });
            onRegister(res.data.token);
            setError('');
            notifySuccess('Registration successful!');
            navigate('/sistema');
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Error registering';
            setError(errorMessage);
            notifyError(errorMessage);
        }
    };

    const handleNavigateHome = useCallback(() => {
        navigate('/admin/users/acreditaciones');
    }, [navigate]);

    return (
        <div className="body-register">
            <div className="card card-register">
                <h2>Register Admin Users</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="button-container">
                        <Button onClick={handleNavigateHome} className="btn btn-primary register-button">Volver</Button>
                        <Button type="submit" className="btn btn-primary register-button">Register</Button>

                    </div>

                    {error && <p className="text-danger">{error}</p>}
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default RegisterForm;
