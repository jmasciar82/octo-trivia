const express = require('express');
const router = express.Router();
const Pregunta = require('../../model/Pregunta');

router.get('/sala/:salaId', async (req, res) => {
    try {
        const { salaId } = req.params;
        const preguntas = await Pregunta.find({ salaId });

        if (!preguntas || preguntas.length === 0) {
            return res.status(404).json({ error: 'No se encontraron preguntas para esta sala' });
        }
        
        res.json({ preguntas });
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
