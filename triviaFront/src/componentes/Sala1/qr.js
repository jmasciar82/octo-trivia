import React from 'react';
import QRCode from 'qrcode.react';

export const QRGenerator = ({ text = 'sala1_pregunta1' }) => {
    const frontendURL = 'https://octo-trivia-front.vercel.app/index/sala/6617f798c3eb3b3b51f8df76/pregunta/6617f799c3eb3b3b51f8df78';
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
