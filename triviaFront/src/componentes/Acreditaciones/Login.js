// client/src/componentes/Acreditaciones/Login.js

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import CredentialCard from './CredentialCard';
import printJS from 'print-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = () => {
  const [code, setCode] = useState('');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const credentialRef = useRef();

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
      const response = await axios.get(`${backendURL}/usersAcreditaciones/${code}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      alert('Usuario no encontrado');
    }
  };

  const handlePrint = () => {
    if (user) {
      printJS({
        printable: credentialRef.current.innerHTML,
        type: 'raw-html',
        style: `
          .credential-card {
            border: 1px solid black;
            padding: 20px;
            width: 300px;
            text-align: center;
            background-color: #fff;
            border-radius: 10px;
            margin: 0 auto;
          }
          .credential-logo {
            width: 100px;
            height: auto;
            margin-bottom: 1rem;
          }
          .credential-title {
            margin-bottom: 1.5rem;
          }
          .credential-card p {
            color: #343a40;
            margin-bottom: 0.5rem;
          }
          .qr-code {
            max-width: 100%;
            height: auto;
            margin-top: 1rem;
          }
        `,
      });
    }
  };

  return (
    <div className="login-container-wrapper">
      <div className="login-container">
        <h1>Login de Usuario</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Ingrese el código"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-block">Ingresar</button>
        </form>

        {user && (
          <div>
            <div ref={credentialRef} className="credential mt-4">
              <CredentialCard user={user} />
            </div>
            <button onClick={handlePrint} className="btn btn-secondary btn-block mt-3">Imprimir Credencial</button>
          </div>
        )}

        <h2>Usuarios Registrados</h2>
        <div className="user-list-container">
          <ul className="list-group">
            {users.map((u) => (
              <li key={u._id} className="list-group-item">
                <p><strong>Nombre:</strong> {u.name}</p>
                <p><strong>Email:</strong> {u.email}</p>
                <p><strong>Código:</strong> {u.code}</p>
                <img src={u.qrCode} alt="Código QR" className="qr-code" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
