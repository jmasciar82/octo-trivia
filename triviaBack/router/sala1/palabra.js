const express = require('express');
const palabraController = require('../../controlador/sala1/palabraController.js');

const router = express.Router();

router.post('/', palabraController.subirPalabra);

module.exports = router;
