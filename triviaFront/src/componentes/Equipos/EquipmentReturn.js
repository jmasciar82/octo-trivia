import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BrowserQRCodeReader } from '@zxing/library';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

const EquipmentReturn = () => {
    const [checkedOutUsers, setCheckedOutUsers] = useState([]);
    const [isVideoHidden, setIsVideoHidden] = useState(false);
    const [isScanning, setIsScanning] = useState(true);
    const videoRef = useRef(null);
    const codeReaderRef = useRef(null);
    const navigate = useNavigate();
    const timerRef = useRef(null);

    const stopScanner = useCallback(() => {
        if (codeReaderRef.current) {
            codeReaderRef.current.reset();
        }
    }, []);

    const handleScanSuccess = useCallback(async (decodedText) => {
        const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';
    
        try {
            // Enviar una solicitud para eliminar el registro correspondiente
            await axios.delete(`${backendURL}/checkoutReturn/${decodedText}`);
            setCheckedOutUsers((prev) => prev.filter(user => user.code !== decodedText));
            toast.success('Registro eliminado exitosamente.');
            setIsVideoHidden(true);  // Ocultar video después de escanear exitosamente
            setIsScanning(false);   // Detener el escáner después de escanear exitosamente
            if (timerRef.current) {
                clearTimeout(timerRef.current); // Cancelar el temporizador
            }
        } catch (err) {
            console.error('Error al eliminar el registro:', err);
            toast.error('Error al eliminar el registro.');
        }
    }, []); // No incluir stopScanner en las dependencias

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
        if (isScanning) {
            startScanner();

            timerRef.current = setTimeout(() => {
                stopScanner();
                navigate('/loginHome');
                window.location.reload(); // Forzar un refresh de la página
            }, 60000); // 60 segundos

            return () => {
                clearTimeout(timerRef.current); // Limpiar el temporizador en la limpieza del efecto
                stopScanner();
            };
        }
    }, [startScanner, stopScanner, isScanning, navigate]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCheckedOutUsers = async () => {
            if (!loading) {
                setLoading(true);
                const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';
                try {
                    const response = await axios.get(`${backendURL}/checkout`);
                    setCheckedOutUsers(response.data);
                } catch (err) {
                    console.error('Error al obtener la lista de usuarios:', err);
                    toast.error('Error al obtener la lista de usuarios.');
                }
                setLoading(false);
            }
        };

        fetchCheckedOutUsers();
    }, [loading]);

    const handleNavigateHome = useCallback(() => {
        setIsScanning(false);
        stopScanner();
        navigate('/loginHome');
        window.location.reload(); // Forzar un refresh de la página
    }, [navigate, stopScanner]);

    return (
        <div className="checkin-container-wrapper">
            <div className="checkin-container">
                <h1>Equipos Entregados</h1>
                <Button onClick={handleNavigateHome}>Reiniciar</Button>
                <div className={`video-container ${isVideoHidden ? 'hidden' : ''}`}>
                    <video ref={videoRef} style={{ width: "30%" }}></video>
                </div>
                <div className="checked-out-list">
                    <h2>Lista de Equipos Entregados</h2>
                    <ul className="list-group">
                        {checkedOutUsers.map((user, index) => (
                            <li key={index} className="list-group-item">
                                <p><strong>Nombre:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Fecha de Entrega:</strong> {new Date(user.checkedOutAt).toLocaleString()}</p>
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
