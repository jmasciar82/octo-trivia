  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import './UsersAcreditaciones.css';
  import printJS from 'print-js';
  import LogoutButton from '../COMUN/LogoutButton';

  const UsersAcreditaciones = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tipo, setTipo] = useState('');
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [token, setToken] = useState(localStorage.getItem('token') || null);

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

      // Fetch users initially
      fetchUsers();

      // Set up interval to fetch users every 5 seconds
      const intervalId = setInterval(fetchUsers, 5000);

      // Clear interval on component unmount
      return () => clearInterval(intervalId);
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('token');
      setToken(null);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';

      setLoading(true);
      setErrorMessage(''); // Clear previous error message

      try {
        // Verifica si el email ya está registrado
        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
          setErrorMessage('El correo electrónico ya está registrado.');
          setLoading(false);
          return;
        }

        // Registra el nuevo usuario
        const response = await axios.post(`${backendURL}/usersAcreditaciones`, { name, email, tipo });
        setUser(response.data);
        setUsers((prevUsers) => [...prevUsers, response.data]);
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    const handlePrint = (user) => {
      const credentialHTML = `
        <div class="credential-card">
          <p class="item-name"><strong>Nombre:</strong> ${user.name}</p>
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
            width: 200px;
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
      <div>
        
        <div className="login-container-wrapper">
          <div id="login-container-users">
          {token && (
            <div className="boton-out">
              <LogoutButton onLogout={handleLogout} />
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center">
          
        </div> 
            <h1>Registro de Usuario</h1>

            {loading ? (
              <div className="loading">Generando usuario, por favor espere...</div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <select
                  className="form-control mb-3"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  required
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
                  <li key={u._id} className="list-group-item-admin">
                    <p className='item-name'><strong>Nombre:</strong> {u.name}</p>
                    <p><strong>Email:</strong> {u.email}</p>
                    <p><strong>Código:</strong> {u.code}</p>
                    <p><strong>Empresa:</strong> {u.tipo}</p>
                    <img src={u.qrCode} alt="Código QR" className="img-fluid qr-code-admin" />
                    <button onClick={() => handlePrint(u)} className="btn-success mt-3">Imprimir</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default UsersAcreditaciones;
