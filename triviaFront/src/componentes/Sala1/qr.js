import React from 'react';
import QRCode from 'qrcode.react';
import { useParams } from 'react-router-dom';

export const QRGenerator = () => {
    const { salaId, preguntaId } = useParams();

    // Verifica si los parámetros están definidos
    if (!salaId || !preguntaId) {
        return (
            <div className="qrContainer">
                <h2>Error</h2>
                <p>Parámetros de URL no válidos. Asegúrate de que la URL incluye el ID de la sala y el ID de la pregunta.</p>
            </div>
        );
    }

    // Construye el texto del código QR concatenando los parámetros a la URL base
    const URL_QR = process.env.NODE_ENV === 'production'
        ? `${process.env.REACT_APP_PROD_FRONT_URL}/index/sala/${salaId}/pregunta/${preguntaId}`
        : `http://localhost:3000/index/sala/${salaId}/pregunta/${preguntaId}`;
    
    console.log('qr text', URL_QR);

    return (
        <div className="qrContainer">
            <h2>QR Code:</h2>
            <div className="qr" style={{ display: 'flex', justifyContent: 'center' }}>
                <QRCode value={URL_QR} size={350} />
            </div>
        </div>
    );
}
