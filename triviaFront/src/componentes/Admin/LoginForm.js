import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'

const LoginForm = ({ onLogin }) => {
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
            const res = await axios.post(`${backendURL}/admin/auth/login`, { username, password });
            onLogin(res.data.token);
            setError('');
            notifySuccess('Login successful!');
            navigate('/admin');  // Redirige a la ruta /admin
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Invalid credentials';
            setError(errorMessage);
            notifyError(errorMessage);
            console.error('Error during login:', err);
        }
    };

    return (
        <div className="body-log  d-flex justify-content-center align-items-center  ">
            <div className="card p-4" style={{ width: '20rem' }}>
                <h2 className="mb-4">Login</h2>
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
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    {error && <p className="text-danger mt-3">{error}</p>}
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default LoginForm;
