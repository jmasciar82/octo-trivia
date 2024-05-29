// client/src/componentes/Acreditaciones/QRScanner.js

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
 
  const videoRef = useRef(null);
  const credentialRef = useRef(null);
  const codeReaderRef = useRef(null);
  const navigate = useNavigate();

  const stopScanner = useCallback(() => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }
  }, []);

  const handleScanSuccess = useCallback(async (decodedText) => {
    const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';
    try {
      const response = await axios.get(`${backendURL}/usersAcreditaciones/${decodedText}`);
      setUser(response.data);
      toast.success('Usuario encontrado');
      stopScanner();
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
    console.warn(`Error scanning QR code: ${err}`);
    toast.error('Error scanning QR code: ' + err.message);
  }, []);

  const startScanner = useCallback(() => {
    const codeReader = new BrowserQRCodeReader();
    codeReaderRef.current = codeReader;

    codeReader.decodeFromInputVideoDevice(undefined, videoRef.current)
      .then(result => {
        handleScanSuccess(result.text);
      })
      .catch(err => {
        handleScanFailure(err);
      });
  }, [handleScanSuccess, handleScanFailure]);

  useEffect(() => {
    startScanner();
    return () => {
      stopScanner();
    };
  }, [startScanner, stopScanner]);

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
    }
  };

  const handleNavigateHome = () => {
    stopScanner();
    navigate('/loginHome');
  };

  return (
    <div className="scanner-container-wrapper">
      <div className="scanner-container">
        <h1>Escáner de QR</h1>
        <div className="video-container">
          <video ref={videoRef} style={{ width: "50%" }}></video>
        </div>
        {user && (
          <div>
            <div ref={credentialRef} className="credential mt-4">
              <CredentialCard user={user} />
              
           
            </div>
            <div className='boton-login'>          
              
            <Button onClick={handlePrint} >Imprimir Credencial</Button>
            <Button onClick={handleNavigateHome} >Volver al Home</Button>
            </div>
            
          </div>
        )}
        
      </div>
      <ToastContainer />
    </div>
  );
};

export default QRScanner;
