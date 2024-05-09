const express = require('express');
const preguntaController = require('../../controlador/sala1/respuestaController');
const router = express.Router();
const Sala = require('../../model/Sala'); // Asegúrate de que la ruta sea correcta
const Pregunta = require('../../model/Pregunta'); // Importar el modelo Pregunta



// Obtener datos de una pregunta específica en una sala determinada
router.get('/sala/:salaId/pregunta/:preguntaId', async (req, res) => {
    try {
        const { salaId, preguntaId } = req.params;

        // Busca la sala correspondiente en la base de datos
        const sala = await Sala.findById(salaId);

        if (!sala) {
            return res.status(404).json({ error: 'Sala no encontrada' });
        }

        
        // Busca la pregunta correspondiente en la base de datos
        const pregunta = await Pregunta.findById(preguntaId);

        if (!pregunta) {
            return res.status(404).json({ error: 'Pregunta no encontrada' });
        }

        // Aquí puedes continuar con tu lógica para manejar la sala y la pregunta
        res.json({ sala, pregunta });
    } catch (error) {
        console.error('Error al obtener la sala y la pregunta:', error);
        res.status(500).send('Error interno del servidor');
    }
});




module.exports = router;
