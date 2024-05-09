const Pregunta = require('../../model/Pregunta');
const mongoose = require('mongoose');
const { updateTotalVotes } = require('../../model/initDB');

const getQuestionAndOptions = async (req, res) => {
    try {
        const { salaId, preguntaId } = req.params;
        const pregunta = await Pregunta.findOne({ _id: preguntaId, salaId: salaId });

        console.log('sala:' ,salaId, 'pregunta:', preguntaId);

        if (!pregunta) {
            return res.status(404).json({ error: 'Pregunta no encontrada en la sala especificada' });
        }

        res.json(pregunta);
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        res.status(500).send('Error interno del servidor');
    }
};

const voteInPoll = async (req, res) => {
    const { salaId, preguntaId } = req.params;
    const { option } = req.body;

    try {
        // Encuentra la pregunta en la base de datos
        const pregunta = await Pregunta.findOne({ _id: preguntaId, salaId: salaId });
        const optionObjectId = new mongoose.Types.ObjectId(option);

        // Verifica si la pregunta existe
        if (!pregunta) {
            return res.status(404).json({ error: 'La pregunta no existe' });
        }

        const opcionSeleccionadaIndex = pregunta.opciones.findIndex(opcion => opcion._id.equals(optionObjectId)); // Comparar con equals()

        // Verifica si la opción seleccionada existe
        if (opcionSeleccionadaIndex === -1) {
            return res.status(404).json({ error: 'La opción seleccionada no existe' });
        }

        // Incrementa el contador de votos para la opción seleccionada
        pregunta.opciones[opcionSeleccionadaIndex].votos += 1;



        await updateTotalVotes(pregunta._id);//************************************* */

        // Guarda los cambios
        await pregunta.save();

        res.status(200).json({ message: 'Voto registrado exitosamente' });
    } catch (error) {
        console.error('Error al votar:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { getQuestionAndOptions, voteInPoll };
