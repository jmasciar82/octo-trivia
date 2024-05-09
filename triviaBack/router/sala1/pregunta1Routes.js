const express = require('express');
const preguntaController = require('../../controlador/sala1/pregunta1Controller');
const router = express.Router();
const Sala = require('../../model/Sala');
const Pregunta = require('../../model/Pregunta');

router.get('/sala/:salaId/pregunta/:preguntaId', async (req, res) => {
    try {

        const { salaId, preguntaId } = req.params;
        const sala = await Sala.findById(salaId);
        if (!sala) {
            return res.status(404).json({ error: 'Sala no encontrada' });
        }
        const pregunta = await Pregunta.findById(preguntaId);
        if (!pregunta) {
            return res.status(404).json({ error: 'Pregunta no encontrada' });
        }
        
        res.json({ sala, pregunta });
    } catch (error) {
        console.error('Error al obtener la sala y la pregunta:', error);
        res.status(500).send('Error interno del servidor');
    }
});


router.post('/sala/:salaId/pregunta/:preguntaId', preguntaController.voteInPoll);

module.exports = router;
