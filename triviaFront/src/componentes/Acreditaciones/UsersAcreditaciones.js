import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'

const UsersAcreditaciones = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState(1); // Valor por defecto
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';

    try {
      const response = await axios.post(`${backendURL}/usersAcreditaciones`, { name, email, tipo });
      setUser(response.data);
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
        <select 
          className="form-control mb-3"
          value={tipo} 
          onChange={(e) => setTipo(parseInt(e.target.value))}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
        <button type="submit" className="btn btn-primary btn-block">Registrar</button>
      </form>

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
    </div>
  );
};

export default UsersAcreditaciones;
