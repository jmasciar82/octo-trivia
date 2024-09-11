import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const [isFormVisible, setIsFormVisible] = useState(true);
  const credentialRef = useRef();
  const timeoutRef = useRef(null); // Usar useRef para almacenar el timeoutId

  const handleNavigateHome = useCallback(() => {
    navigate('/loginHome');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';
    // Actualizar el estado codeUsed a true

    try {
      const response = await axios.get(`${backendURL}/usersAcreditaciones/${code}`);
      setUser(response.data);
      toast.success('Usuario encontrado');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Cancelar el temporizador
      }

      setIsFormVisible(false); // Ocultar el formulario al encontrar un usuario
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      if (error.response && error.response.status === 400) {
        toast.warn('Código ya utilizado');
      } else {
        toast.error('Usuario no encontrado');
      }
    }

    try {
      await axios.put(`${backendURL}/usersAcreditaciones/codeUsed/${code}`, {
        codeUsed: true
      });
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      toast.error('Verifique su código');
    }
    
  };

  // Usar useCallback para memorizar la función y evitar que se recree en cada render
  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Iniciar un nuevo temporizador de 30 segundos
    timeoutRef.current = setTimeout(() => {
      handleNavigateHome();
    }, 30000);
  }, [handleNavigateHome]);

  useEffect(() => {
    // Iniciar el temporizador al montar el componente
    resetTimer();

    return () => {
      // Limpiar el temporizador al desmontar el componente
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resetTimer]);

  const handleInputChange = (e) => {
    setCode(e.target.value);
    resetTimer(); // Reiniciar el temporizador cada vez que el usuario escribe
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
        onPrintDialogClose: () => {
          navigate('/loginHome'); // Redirigir después de imprimir
        }
      });

      setTimeout(() => {
        navigate('/loginHome');
      }, 3000); // Ajusta el tiempo según sea necesario
    }
  };

  return (
    <div className="scanner-container-wrapper-login">
      <div className="scanner-container-login">
        {isFormVisible && ( // Mostrar el formulario y los botones solo si isFormVisible es true
          <form className='btn-codigo' onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Ingrese el código"
              value={code}
              onChange={handleInputChange} // Usar la nueva función handleInputChange
              required
            />
            <div className="button-container mt-3">
              <Button type="submit" className="btn-primary me-2">Enviar</Button>
              <Button onClick={handleNavigateHome} className="btn-primary">Volver</Button>
            </div>
          </form>
        )}

        {user && (
          <div className="credential-container">
            <div ref={credentialRef} className="credential mt-4">
              <CredentialCard user={user} />
            </div>
            <div className="boton-login">
              <Button onClick={handlePrint}>
                Imprimir
              </Button>
              <Button onClick={handleNavigateHome} className="btn-primary">Volver</Button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
