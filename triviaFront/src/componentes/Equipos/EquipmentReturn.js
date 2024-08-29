import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BrowserQRCodeReader } from '@zxing/library';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EquipmentCheckout.css';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

const EquipmentReturn = () => {
    const [checkedOutUsers, setCheckedOutUsers] = useState([]);
    const videoRef = useRef(null);
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
            // Supongamos que el decodedText es un JSON con el email
            const data = JSON.parse(decodedText);
            const email = data.email;

            // Enviar la solicitud DELETE al backend
            await axios.delete(`${backendURL}/checkout`, {
                data: { email: email }
            });

            // Actualizar la lista en el frontend
            setCheckedOutUsers((prev) => prev.filter(user => user.email !== email));
            toast.success('Usuario eliminado de la lista de equipos.');
            stopScanner();
        } catch (err) {
            console.error('Error al procesar la devolución:', err);
            toast.error('Error al procesar la devolución.');
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

    useEffect(() => {
        const fetchCheckedOutUsers = async () => {
            const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';
            try {
                const response = await axios.get(`${backendURL}/checkout`);
                setCheckedOutUsers(response.data);
            } catch (err) {
                console.error('Error al obtener la lista de usuarios:', err);
                toast.error('Error al obtener la lista de usuarios.');
            }
        };

        fetchCheckedOutUsers();
    }, []);

    const handleNavigateHome = () => {
        stopScanner();
        navigate('/loginHome');
    };

    return (
        <div className="return-container-wrapper">
            <div className="return-container">
                <h1>Devolución de Equipos</h1>
                <Button onClick={handleNavigateHome}>Reiniciar</Button>
                <div className="video-container">
                    <video ref={videoRef} style={{ width: "50%" }}></video>
                </div>
                <div className="checked-out-list">
                    <h2>Usuarios con Equipos Registrados</h2>
                    <ul className="list-group">
                        {checkedOutUsers.map((user, index) => (
                            <li key={index} className="list-group-item">
                                <p><strong>Nombre:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Fecha de Retiro:</strong> {new Date(user.checkedOutAt).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EquipmentReturn;
