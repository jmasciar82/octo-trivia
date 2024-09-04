import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AcreditacionAutoServicio.css';

const AcreditacionesAutoServicio = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';

    setLoading(true);

    try {
      const response = await axios.post(`${backendURL}/usersAcreditaciones`, { name, email, tipo });
      setUser(response.data);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    } finally {
      setLoading(false);
    }
  };

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
        ) : user ? (
          <div className="user-credential mt-4">
            <h2>Completado</h2>
            <p>La información de su usuario ha sido registrada exitosamente.</p>
            <p>Recibirá todos los detalles en su correo electrónico.</p>
            <div className="credential-card">
              <p><strong>Nombre:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Código:</strong> {user.code}</p>
              <p><strong>Empresa:</strong> {user.tipo}</p>
              <img src={user.qrCode} alt="Código QR" className="img-fluid qr-code" />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
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
      </div>
    </div>
  );
};

export default AcreditacionesAutoServicio;
