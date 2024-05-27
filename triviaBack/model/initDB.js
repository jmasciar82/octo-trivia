const mongoose = require('mongoose');
const Sala = require('./Sala');
const Pregunta = require('./Pregunta');
const config = require('../config');

// Función para inicializar los datos
const inicializarDatos = async () => {
    try {
        // Conexión a la base de datos
        await mongoose.connect(config.databaseURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexión exitosa a MongoDB');

        // Actualizar el total de votos para todas las preguntas existentes
        await updateTotalVotesForAllQuestions();

        console.log('Datos inicializados correctamente');
    } catch (error) {
        console.error('Error al inicializar los datos:', error);
    } finally {
        // Cerrar la conexión a la base de datos al finalizar todas las operaciones
        // mongoose.disconnect();
    }
};

// Función para recalcular y actualizar el total de votos para todas las preguntas existentes
const updateTotalVotesForAllQuestions = async () => {
    try {
        const preguntas = await Pregunta.find({});
        for (const pregunta of preguntas) {
            await updateTotalVotes(pregunta._id);
        }
    } catch (error) {
        console.error('Error al actualizar el total de votos para todas las preguntas:', error);
        throw error;
    }
};

// Función para recalcular y actualizar el total de votos para una pregunta específica
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

module.exports = { inicializarDatos, updateTotalVotes, updateTotalVotesForAllQuestions };
