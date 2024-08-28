import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UsersAcreditaciones.css';

const UsersAcreditaciones = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState(1); // Valor por defecto
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para manejar el loading

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

    setLoading(true); // Inicia el loading

    try {
      const response = await axios.post(`${backendURL}/usersAcreditaciones`, { name, email, tipo });
      setUser(response.data);
      setUsers(prevUsers => [...prevUsers, response.data]); // Añadir el nuevo usuario a la lista
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    } finally {
      setLoading(false); // Finaliza el loading
    }
  };

  return (
    <div className="login-container-wrapper">
      <div className="login-container">
        <h1>Registro de Usuario</h1>
        
        {/* Muestra el loading si está en proceso */}
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
              onChange={(e) => setTipo(parseInt(e.target.value))}
            >
              {/* Opciones del select */}
              {[...Array(10).keys()].map(num => (
                <option key={num + 1} value={num + 1}>{num + 1}</option>
              ))}
            </select>
            <button id='btn-register-user' type="submit" className="btn btn-primary btn-block">Registrar</button>
          </form>
        )}

        {user && (
          <div className="user-credential mt-4">
            <h2>Credencial de Usuario</h2>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Código:</strong> {user.code}</p>
            <p><strong>Tipo:</strong> {user.tipo}</p>
            <img src={user.qrCode} alt="Código QR" className="img-fluid" />
          </div>
        )}

        <h2 className="mt-5">Usuarios Registrados</h2>
        <div className="user-list-container">
          <ul className="list-group">
            {users.map((u) => (
              <li key={u._id} className="list-group-item">
                <p><strong>Nombre:</strong> {u.name}</p>
                <p><strong>Email:</strong> {u.email}</p>
                <p><strong>Código:</strong> {u.code}</p>
                <p><strong>Tipo:</strong> {u.tipo}</p>
                <img src={u.qrCode} alt="Código QR" className="img-fluid qr-code" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsersAcreditaciones;
