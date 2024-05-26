const express = require('express');
const router = express.Router();
const preguntaController = require('../../../controlador/crudVotacion/preguntaController');

router.post('/pregunta', preguntaController.createPregunta);
router.get('/preguntas', preguntaController.getPreguntas);
router.get('/pregunta/:id', preguntaController.getPreguntaById);
router.put('/pregunta/:id', preguntaController.updatePregunta);
router.delete('/pregunta/:id', preguntaController.deletePregunta);

module.exports = router;
