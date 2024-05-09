const express = require('express');
const router = express.Router();
const qrController = require('../../controlador/sala1/qrController');

// Ruta para generar un código QR
router.get('/', qrController.generateQRCode);

module.exports = router;
