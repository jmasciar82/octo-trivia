import React from 'react';
import QRCode from 'qrcode.react';
import { useParams } from 'react-router-dom';

export const QRGenerator = () => {
    // Obtén los parámetros de la URL
    const { salaId, preguntaId } = useParams();

    

    // Construye el texto del código QR concatenando los parámetros a la URL base
    const URL_API = process.env.NODE_ENV === 'production' ?
        `${process.env.REACT_APP_PROD_BACKEND_URL}/index/sala/${salaId}/pregunta/${preguntaId}` :
        `http://localhost:3001/index/sala/${salaId}/pregunta/${preguntaId}`;
    
    // Genera el texto del código QR
    const qrText = URL_API;
    
    console.log(qrText);

    return (
        <div className="qrContainer">
            <h2>QR Code:</h2>
            <div className="qr" style={{ display: 'flex', justifyContent: 'center' }}>
                {/* Renderiza el componente QRCode con el valor del texto del código QR */}
                <QRCode value={qrText} size={350} />
            </div>
        </div>
    );
}


