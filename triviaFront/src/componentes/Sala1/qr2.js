import React from 'react';
import QRCode from 'qrcode.react';

export const QRGenerator = ({ text = 'sala1_pregunta2' }) => {
    const frontendURL = 'https://octopous-trivia-client.vercel.app';
    const qrText = `${frontendURL}/${text}`;

    return (
        <div className="qrContainer">
            <h2>QR Code:</h2>
            <div className="qr" style={{ display: 'flex', justifyContent: 'center' }}>
                <QRCode value={qrText} size={350} />
            </div>
        </div>
    );
}
