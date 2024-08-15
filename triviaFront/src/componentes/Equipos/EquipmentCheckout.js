// client/src/componentes/Equipos/EquipmentCheckout.js

import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BrowserQRCodeReader } from '@zxing/library';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EquipmentCheckout.css';

import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

const EquipmentCheckout = () => {
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
            const response = await axios.get(`${backendURL}/usersAcreditaciones/${decodedText}`);
            const user = response.data;
            setCheckedOutUsers((prev) => [...prev, { ...user, checkedOutAt: new Date() }]);
            toast.success('Usuario agregado a la lista de equipos.');
            stopScanner();
        } catch (err) {
            console.error('Error al obtener el usuario:', err);
            toast.error('Usuario no encontrado.');
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

    const handleNavigateHome = () => {
        stopScanner();
        navigate('/loginHome');
    };

    return (
        <div className="checkout-container-wrapper">
            <div className="checkout-container">
                <h1>Registro de Equipos</h1>
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
                                <p><strong>Fecha de Retiro:</strong> {user.checkedOutAt.toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EquipmentCheckout;
