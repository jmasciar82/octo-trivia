const Pregunta = require('./Pregunta');

const updateTotalVotesForAllQuestions = async () => {
    try {
        
        for (const pregunta of preguntas) {
            await updateTotalVotes(pregunta._id);
        }
        const preguntas = await Pregunta.find({});
    } catch (error) {
        console.error('Error al actualizar el total de votos para todas las preguntas:', error);
        throw error;
    }
};

const updateTotalVotes = async (questionId) => {
    try {
        const pregunta = await Pregunta.findOne({ _id: questionId });

        if (!pregunta) {
            throw new Error('La pregunta no existe');
        }

        const totalVotos = pregunta.opciones.reduce((total, option) => total + option.votos, 0);
        pregunta.totalVotos = totalVotos;

        pregunta.opciones.forEach(option => {
            option.porcentajeVotos = totalVotos === 0 ? 0 : ((option.votos / totalVotos) * 100);
        });

        await pregunta.save();
        console.log(`Total de votos y porcentajes actualizados para la pregunta con ID ${questionId}`);
    } catch (error) {
        console.error('Error al actualizar el total de votos y porcentajes para la pregunta:', error);
        throw error;
    }
};

module.exports = { updateTotalVotesForAllQuestions, updateTotalVotes };
