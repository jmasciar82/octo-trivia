const Pregunta = require('../../model/Pregunta');
//const { updateTotalVotes } = require('../../model/initDB'); // Asegúrate de proporcionar la ruta correcta

const getQuestionAndOptions = async (req, res) => {
    try {
        const { salaId, preguntaId } = req.params;
        const pregunta = await Pregunta.findOne({ _id: preguntaId, salaId: salaId });
        
        if (pregunta) {
            pregunta.titulo = pregunta.titulo.replace(/\n/g, '<br>');
            res.json(pregunta);
        } else {
            return res.status(404).json({ error: 'Pregunta no encontrada en la sala especificada' });
        }
        // Llama a la función para actualizar los votos y porcentajes
        

        res.json(pregunta);
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        res.status(500).send('Error interno del servidor');
    }
};

module.exports = { getQuestionAndOptions };
