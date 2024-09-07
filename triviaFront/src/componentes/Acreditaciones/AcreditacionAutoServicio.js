import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AcreditacionAutoServicio.css';
import Social from '../COMUN/Social.js';

const AcreditacionesAutoServicio = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('');
  const [empresaOtro, setEmpresaOtro] = useState(''); // Estado para la empresa personalizada
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const mail = 'registro@dataflow-services.com';

  // Fetch de usuarios
  useEffect(() => {
    const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backendURL}/usersAcreditaciones`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  // Manejo de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';

    setLoading(true);
    setErrorMessage('');

    try {
      // Usar el valor de empresaOtro si el tipo seleccionado es "Otro"
      const finalTipo = tipo === 'Otro' ? empresaOtro : tipo;

      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        setErrorMessage(
          <span>
            El correo ya está registrado. <br /> Consultas:  <br /> <a href={`mailto:${mail}`}>{mail}</a>
          </span>
        );
        setLoading(false);
        return;
      }

      const response = await axios.post(`${backendURL}/usersAcreditaciones`, { name, email, tipo: finalTipo });
      setUser(response.data);
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setErrorMessage('Hubo un error al registrar el usuario. Por favor, inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Manejo de navegación de vuelta a Home
  const handleNavigateHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const tipoOptions = [
    'Química Montpellier', 'Nutricia', 'Bioprofarma-Bagó',
    'Synthon Bagó', 'Sinergium Biotech', 'Biogénesis-Bagó',
    'Intercom', 'Novofarma', 'Disprofarma', 'Otro'
  ];

  return (
    <div className="login-container-wrapper-auto">
      <div className="login-container-auto">
        <h1 id='h1-registro'>Registro</h1>

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
            <button onClick={handleNavigateHome} id="restart-button-login" className="btn btn-primary mt-4">Volver</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <select
              className="form-control mb-3"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            >
              <option value="" disabled>Seleccionar Empresa</option>
              {tipoOptions.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>

            {tipo === 'Otro' && (
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Nombre de la Empresa"
                value={empresaOtro}
                onChange={(e) => setEmpresaOtro(e.target.value)}
              />
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

            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}

            <button id='btn-register-user' type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrar'}
            </button>

          </form>
        )}
        <div className="social-auto"><Social /></div>
      </div>
    </div>
  );
};

export default AcreditacionesAutoServicio;
