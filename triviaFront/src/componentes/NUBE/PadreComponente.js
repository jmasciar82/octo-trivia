import React, { useState  } from 'react';
import { IngresaPalabra } from './IngresaPalabra.js';
import { VerPalabraPadre } from './VerPalabraPadre.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Spinner } from 'react-bootstrap';

export const PadreComponente = () => {
    const [palabrasIngresadas, setPalabrasIngresadas] = useState([]);
    const [mostrarVerPalabra, setMostrarVerPalabra] = useState(false);
    const [contador, setContador] = useState(30); // Inicializa el contador con 30 segundos
    const [cargando, setCargando] = useState(false);

    const handlePalabraIngresada = (palabra) => {
        setPalabrasIngresadas([...palabrasIngresadas, palabra]);
    };

    const handleFinish = () => {
        if (palabrasIngresadas.length + 1 === 3) {
            toast.success('Palabra ingresada correctamente');
        }
    };

    const handleButtonClick = () => {
        setCargando(true); // Muestra el spinner de carga
        const intervalId = setInterval(() => {
            setContador((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    setCargando(false); // Oculta el spinner de carga
                    setMostrarVerPalabra(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <div>
            <ToastContainer />
            {palabrasIngresadas.length < 3 && (
                <>
                    <div><label>palabra 1</label><IngresaPalabra onPalabraIngresada={handlePalabraIngresada} onFinish={handleFinish} /></div>
                    <div><label>palabra 2</label><IngresaPalabra onPalabraIngresada={handlePalabraIngresada} onFinish={handleFinish} /></div>
                    <div><label>palabra 3</label><IngresaPalabra onPalabraIngresada={handlePalabraIngresada} onFinish={handleFinish} /></div>
                </>
            )}
            {palabrasIngresadas.length === 3 && !mostrarVerPalabra && (
                <div>
                    <Button onClick={handleButtonClick}>Mostrar</Button>
                    {contador > 0 && <p>Mostrando en: {contador} segundos</p>}
                    {cargando && (
                        <div>
                            <p>Cargando palabras de la nube</p>
                            <Spinner animation="border" />
                        </div>
                    )}
                </div>
            )}
            {mostrarVerPalabra && <VerPalabraPadre />}
        </div>
    );
};
