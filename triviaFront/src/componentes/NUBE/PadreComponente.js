import React, { useState } from 'react';
import { IngresaPalabra } from './IngresaPalabra.js';
import { VerPalabraPadre } from './verPalabraPadre.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PadreComponente = () => {
    const [palabrasIngresadas, setPalabrasIngresadas] = useState([]);
    const [mostrarVerPalabra, setMostrarVerPalabra] = useState(false);

    const handlePalabraIngresada = (palabra) => {
        setPalabrasIngresadas([...palabrasIngresadas, palabra]);
    };

    const handleFinish = () => {
        if (palabrasIngresadas.length + 1 === 3) {
            setTimeout(() => setMostrarVerPalabra(true), 5000); // Muestra VerPalabraPadre después de 5 segundos
        }
    };

    const handleButtonClick = () => {
        setMostrarVerPalabra(true);
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
            {palabrasIngresadas.length === 3 && (
                <button onClick={handleButtonClick}>Mostrar</button>
            )}
            {mostrarVerPalabra && <VerPalabraPadre />}
        </div>
    );
};
