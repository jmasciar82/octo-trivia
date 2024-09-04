// backend/router/acreditaciones/usersAcreditacionesRoutes.js

const express = require('express');
const usersAcreditacionesController = require('../../controlador/acreditaciones/usersAcreditacionesController');
const { checkEmailExists }  = require('../../controlador/acreditaciones/usersAcreditacionesController');
const router = express.Router();

router.post('/', usersAcreditacionesController.crear);
router.get('/:code', usersAcreditacionesController.obtener);
router.get('/', usersAcreditacionesController.obtenerTodos);  // Nueva ruta para obtener todos los usuarios
router.get('/usersAcreditaciones/check-email', checkEmailExists);

module.exports = router;
