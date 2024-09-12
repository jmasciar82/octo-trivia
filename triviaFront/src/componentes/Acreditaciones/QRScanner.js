import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BrowserQRCodeReader } from '@zxing/library';
import CredentialCard from './CredentialCard';
import printJS from 'print-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './QRScanner.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';

const QRScanner = () => {
  const [user, setUser] = useState(null);
  const [isVideoHidden, setIsVideoHidden] = useState(false);
  const videoRef = useRef(null);
  const credentialRef = useRef(null);
  const codeReaderRef = useRef(null);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const stopScanner = useCallback(() => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset(); // Detener el lector QR
      codeReaderRef.current = null; // Limpiar la referencia
    }
  
    // Detener las pistas de la cámara si el videoRef existe
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop()); // Detener todas las pistas
      videoRef.current.srcObject = null; // Limpiar el srcObject
    }
  }, []);

  const handleNavigateHome = useCallback(() => {
    stopScanner(); // Asegurar la detención del escáner
    navigate('/loginHome'); // Navegar a la página principal
  }, [navigate, stopScanner]);
  

  const handleScanSuccess = useCallback(async (decodedText) => {
    const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';
    try {
      const response = await axios.get(`${backendURL}/usersAcreditaciones/${decodedText}`);
      setUser(response.data);
      setIsVideoHidden(true);
      toast.success('Usuario encontrado');
      stopScanner();
      
      await axios.put(`${backendURL}/usersAcreditaciones/codeUsed/${decodedText}`, { codeUsed: true });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } catch (err) {
      console.error('Error al obtener el usuario:', err);
      if (err.response && err.response.status === 400) {
        toast.warn('Código ya utilizado');
        stopScanner();
      } else {
        toast.error('Usuario no encontrado');
      }
    }
  }, [stopScanner]);

  const handleScanFailure = useCallback((err) => {
    console.error('Error en la lectura del QR:', err);
  }, []);

  const startScanner = useCallback(async () => {
    try {
      if (!videoRef.current) {
        throw new Error("Video element is not available");
      }
  
      const codeReader = new BrowserQRCodeReader();
      codeReaderRef.current = codeReader;

      // Iniciar el lector de códigos QR desde la cámara
      const result = await codeReader.decodeFromInputVideoDevice(undefined, videoRef.current);
      handleScanSuccess(result.text);

    } catch (err) {
      if (err.name === 'NotAllowedError') {
        console.error("Acceso a la cámara denegado");
      } else if (err.name === 'NotFoundError') {
        console.error("No se encontró cámara en el dispositivo");
      } else {
        console.error("Error durante el escaneo del código QR:", err);
      }
      handleScanFailure(err);
    }
  }, [handleScanSuccess, handleScanFailure]);

  useEffect(() => {
    startScanner(); // Iniciar el escáner cuando se monta el componente
  
    timeoutRef.current = setTimeout(() => {
      handleNavigateHome(); // Navegar a la página principal después de un tiempo
    }, 30000); // 30 segundos
  
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Limpiar el temporizador
      }
      stopScanner(); // Detener el escáner al desmontar el componente
    };
  }, [startScanner, stopScanner, handleNavigateHome]);
  

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
          stopScanner();
          navigate('/loginHome'); // Redirigir después de imprimir
        }
      });

      setTimeout(() => {
        stopScanner();
        navigate('/loginHome');
      }, 3000); // Ajusta el tiempo según sea necesario
    }
  };

  return (
    <div className="scanner-container-wrapper-qr">
      <div className="scanner-container">
        <div className='btn-reinicio-contenedor'>
          <h1 id='h1-qr'>Escáner de QR</h1>
          <div className={`video-container ${isVideoHidden ? 'hidden' : ''}`}>
            <video ref={videoRef} style={{ width: "70%" }}></video>
          </div>
        </div>
        <div>
          {user && (
            <div>
              <div ref={credentialRef} className="credential mt-4">
                <CredentialCard user={user} />
              </div>
              <div className='boton-login'>
                <Button onClick={handlePrint}>Imprimir</Button>
              </div>
            </div>
          )}
        </div>
        <Button onClick={handleNavigateHome} id="restart-button-login">Volver</Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default QRScanner;
