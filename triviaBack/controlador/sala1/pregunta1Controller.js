const mongoose = require('mongoose');
const Pregunta = require('../../model/Pregunta');
const { updateTotalVotes } = require('../../model/initDB');

// Helper function to find a question by ID and Sala ID
const findQuestion = async (salaId, preguntaId) => {
    return await Pregunta.findOne({ _id: preguntaId, salaId: salaId });
};

const getQuestionAndOptions = async (req, res) => {
    try {
        const { salaId, preguntaId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(salaId) || !mongoose.Types.ObjectId.isValid(preguntaId)) {
            return res.status(400).json({ error: 'Invalid Sala ID or Pregunta ID' });
        }

        const pregunta = await findQuestion(salaId, preguntaId);

        if (!pregunta) {
            return res.status(404).json({ error: 'Pregunta no encontrada en la sala especificada' });
        }

        res.json(pregunta);
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        res.status(500).send('Error interno del servidor');
    }
};

const getQuestions = async (req, res) => {
    try {
        const { salaId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(salaId)) {
            return res.status(400).json({ error: 'Invalid Sala ID' });
        }

        const preguntas = await Pregunta.find({ salaId });

        if (preguntas.length === 0) {
            return res.status(404).json({ error: 'No hay preguntas en la sala especificada' });
        }

        res.json(preguntas);
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        res.status(500).send('Error interno del servidor');
    }
};

const voteInPoll = async (req, res) => {
    const { salaId, preguntaId } = req.params;
    const { option } = req.body;

    if (!mongoose.Types.ObjectId.isValid(salaId) || !mongoose.Types.ObjectId.isValid(preguntaId) || !mongoose.Types.ObjectId.isValid(option)) {
        return res.status(400).json({ error: 'Invalid Sala ID, Pregunta ID or Option ID' });
    }

    try {
        const pregunta = await findQuestion(salaId, preguntaId);

        if (!pregunta) {
            return res.status(404).json({ error: 'La pregunta no existe' });
        }

        const opcionSeleccionadaIndex = pregunta.opciones.findIndex(opcion => opcion._id.equals(option));

        if (opcionSeleccionadaIndex === -1) {
            return res.status(404).json({ error: 'La opción seleccionada no existe' });
        }

        // Calcular la cantidad de votos antes de incrementar el voto
        const totalVotosAntes = pregunta.opciones.reduce((total, opcion) => total + opcion.votos, 0);

        // Incrementar el voto en la opción seleccionada
        pregunta.opciones[opcionSeleccionadaIndex].votos += 1;

        // Guardar los cambios
        await pregunta.save();

        // Actualizar el total de votos y porcentajes
        await updateTotalVotes(pregunta._id);

        // Calcular la cantidad de votos después de incrementar el voto
        const totalVotosDespues = pregunta.opciones.reduce((total, opcion) => total + opcion.votos, 0);

        res.status(200).json({ message: 'Voto registrado exitosamente', totalVotosAntes, totalVotosDespues });
    } catch (error) {
        console.error('Error al votar:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { getQuestionAndOptions, voteInPoll, getQuestions };
