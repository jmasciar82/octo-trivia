import React, { useState, useRef } from 'react';
import axios from 'axios';
import CredentialCard from './CredentialCard';
import printJS from 'print-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginCodigo.css';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [user, setUser] = useState(null);
  const credentialRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';

    try {
      const response = await axios.get(`${backendURL}/usersAcreditaciones/${code}`);
      setUser(response.data);
      toast.success('Usuario encontrado');
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      if (error.response && error.response.status === 400) {
        toast.warn('Código ya utilizado');
      } else {
        toast.error('Usuario no encontrado');
      }
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
        onPrintDialogClose: () => navigate('/loginHome')
      });
    }
  };

  const handleNavigateHome = () => {
    navigate('/loginHome');
  };

  return (
    <div className="scanner-container-wrapper">
      <div className="scanner-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Ingrese el código"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <Button type="submit" className="btn btn-primary btn-block">Ingresar</Button>
        </form>

        {user && (
          <div className="credential-container">
            <div ref={credentialRef} className="credential mt-4">
              <CredentialCard user={user} />
            </div>
            <div className="boton-login">
              <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={handlePrint}>
                Imprimir Credencial
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="boton-login">
        <Button onClick={handleNavigateHome}>Volver</Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
