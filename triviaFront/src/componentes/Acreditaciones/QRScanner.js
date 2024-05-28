// client/src/componentes/Acreditaciones/QRScanner.js
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader'; // Importar como exportación nombrada
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QRScanner = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleScan = async (data) => {
        if (data) {
            const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';

            try {
                const response = await axios.get(`${backendURL}/usersAcreditaciones/${data}`);
                if (response.data) {
                    // Autenticación exitosa, redirige al usuario a la página correspondiente
                    navigate('/credencial');
                } else {
                    setError('Código incorrecto o usuario no encontrado');
                }
            } catch (error) {
                console.error('Error al autenticar el usuario:', error);
                setError('Código incorrecto o usuario no encontrado');
            }
        }
    };

    const handleError = (err) => {
        console.error('Error al escanear el código QR:', err);
        setError('Error al escanear el código QR');
    };

    return (
        <div>
            <h1>Escanear Código QR</h1>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '50%' }}
            />
            {error && <p>{error}</p>}
        </div>
    );
};

export default QRScanner;
