const express = require('express');
const palabraController = require('../../controlador/sala1/palabraController.js');

const router = express.Router();

router.get('/', palabraController.verPalabras);

module.exports = router;
