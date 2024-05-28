// client/src/componentes/Acreditaciones/UsersAcreditaciones.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'

const UsersAcreditaciones = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';
      try {
        const response = await axios.get(`${backendURL}/usersAcreditaciones`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';

    try {
      const response = await axios.post(`${backendURL}/usersAcreditaciones`, { name, email });
      setUser(response.data);
      setUsers([...users, response.data]);  // Añadir el nuevo usuario a la lista de usuarios
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="form-control mb-3"
          placeholder="Nombre" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          className="form-control mb-3"
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button type="submit" className="btn btn-primary btn-block">Registrar</button>
      </form>

      {user && (
        <div className="user-credential mt-4">
          <h2>Credencial de Usuario</h2>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Código:</strong> {user.code}</p>
          <img src={user.qrCode} alt="Código QR" className="img-fluid" />
        </div>
      )}

      <div className="users-list mt-5">
        <h2>Usuarios Registrados</h2>
        <ul className="list-group">
          {users.map((user, index) => (
            <li key={index} className="list-group-item">
              <strong>Nombre:</strong> {user.name}<br/>
              <strong>Email:</strong> {user.email}<br/>
              <strong>Código:</strong> {user.code}<br/>
              <img src={user.qrCode} alt="Código QR" className="img-fluid mt-2" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsersAcreditaciones;
