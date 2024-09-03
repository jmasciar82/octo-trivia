import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UsersAcreditaciones.css';
import printJS from 'print-js';

const UsersAcreditaciones = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

    setLoading(true);

    try {
      const response = await axios.post(`${backendURL}/usersAcreditaciones`, { name, email, tipo });
      setUser(response.data);
      setUsers(prevUsers => [...prevUsers, response.data]);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = (user) => {
    const credentialHTML = `
      <div class="credential-card">
        <p><strong>Nombre:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Código:</strong> ${user.code}</p>
        <p><strong>Empresa:</strong> ${user.tipo}</p>
        <img src="${user.qrCode}" alt="Código QR" class="img-fluid qr-code" />
      </div>
    `;

    printJS({
      printable: credentialHTML,
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
        .credential-card p {
          color: #343a40;
          margin-bottom: 0.5rem;
        }
        .qr-code {
          max-width: 50%;
          height: auto;
          margin-top: 1rem;
        }
      `,
    });
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tipoOptions = [
    'Química Montpellier',
    'Nutricia',
    'Bioprofarma-Bagó',
    'Synthon Bagó',
    'Sinergium Biotech',
    'Biogénesis-Bagó',
    'Intercom',
    'Novofarma',
    'Disprofarma',
    'Laboratorios Bagó Brasil'
  ];

  return (
    <div className="login-container-wrapper">
      <div className="login-container">
        <h1>Registro de Usuario</h1>

        {loading ? (
          <div className="loading">Generando usuario, por favor espere...</div>
        ) : (
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
            <select
              className="form-control mb-3"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="" disabled>Seleccionar Empresa</option>
              {tipoOptions.map((tipo, index) => (
                <option key={index} value={tipo}>{tipo}</option>
              ))}
            </select>
            <button id='btn-register-user' type="submit" className="btn btn-primary btn-block">Registrar</button>
          </form>
        )}

        {user && (
          <div className="user-credential mt-4">
            <h2>Credencial de Usuario</h2>
            <div className="credential-card">
              <p><strong>Nombre:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Código:</strong> {user.code}</p>
              <p><strong>Empresa:</strong> {user.tipo}</p>
              <img src={user.qrCode} alt="Código QR" className="img-fluid qr-code" />
            </div>
            <button onClick={() => handlePrint(user)} className="btn btn-success mt-3">Imprimir Credencial</button>
          </div>
        )}

        <h2 className="mt-5">Usuarios Registrados</h2>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Buscar por nombre o email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="user-list-container">
          <ul className="list-group">
            {filteredUsers.map((u) => (
              <li key={u._id} className="list-group-item">
                <p className='item-name'><strong>Nombre:</strong> {u.name}</p>
                <p><strong>Email:</strong> {u.email}</p>
                <p><strong>Código:</strong> {u.code}</p>
                <p><strong>Empresa:</strong> {u.tipo}</p>
                <img src={u.qrCode} alt="Código QR" className="img-fluid qr-code" />
                <button onClick={() => handlePrint(u)} className="btn btn-success mt-3">Imprimir</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsersAcreditaciones;
