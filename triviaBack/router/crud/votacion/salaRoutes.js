const express = require('express');
const router = express.Router();
const salaController = require('../../../controlador/crudVotacion/salaController');

router.post('/sala', salaController.createSala);
router.get('/salas', salaController.getSalas);
router.get('/sala/:id', salaController.getSalaById);
router.put('/sala/:id', salaController.updateSala);
router.delete('/sala/:id', salaController.deleteSala);


module.exports = router;
