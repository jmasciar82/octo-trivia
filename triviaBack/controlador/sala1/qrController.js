const QRCode = require('qrcode');

const generateQRCode = async (req, res) => {
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
    const text = `${frontendURL}/sala1_pregunta1`;

    try {
        // Generar el código QR como una imagen en formato base64
        const qrCodeBase64 = await QRCode.toDataURL(text);

        // Devolver el código QR como respuesta
        res.send(`<img src="${qrCodeBase64}" alt="QR Code" />`);
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { generateQRCode };
