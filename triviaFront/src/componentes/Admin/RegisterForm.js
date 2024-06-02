import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';
        const res = await axios.post(`${backendURL}/admin/auth/register`, { username, password });
            onRegister(res.data.token);
            setError('');
        } catch (err) {
            setError(err.response.data.error || 'Error registering');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default RegisterForm;
