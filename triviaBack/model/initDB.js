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
        console.log(`Conexión exitosa a MongoDB`);

        // Crear una nueva sala
        /* const nuevaSala = new Sala({ nombre: 'Sala 1' });
        await nuevaSala.save(); */

        // Crear una nueva pregunta asociada a la sala con las opciones y los votos iniciales
        /* const nuevaPregunta = new Pregunta({
            titulo: 'Pregunta 1 sala 1',
            opciones: [
                { opcion: 'Opción 1', votos: 0 },
                { opcion: 'Opcion 2', votos: 0 },
                { opcion: 'Opcion 3', votos: 0 }
            ],
            salaId: nuevaSala._id // Utilizamos el _id de la sala como referencia
        });
        await nuevaPregunta.save(); */

        // Actualizar el total de votos para todas las preguntas existentes
        await updateTotalVotesForAllQuestions();
        // Llama a la función para actualizar el total de votos y porcentajes


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
        // Obtener todas las preguntas de la base de datos
        const preguntas = await Pregunta.find({});

        // Actualizar el total de votos para cada pregunta
        for (const pregunta of preguntas) {
            await updateTotalVotes(pregunta._id);
        }
    } catch (error) {
        console.error('Error al actualizar el total de votos para todas las preguntas:', error);
    }
};

// Función para recalcular y actualizar el total de votos para una pregunta específica
const updateTotalVotes = async (questionId) => {
    try {
        // Encuentra la pregunta en la base de datos
        const pregunta = await Pregunta.findOne({ _id: questionId });

        // Verifica si la pregunta existe
        if (!pregunta) {
            throw new Error('La pregunta no existe');
        }

        // Calcula el total de votos para la pregunta
        const totalVotos = pregunta.opciones.reduce((total, option) => total + option.votos, 0);

        // Actualiza el campo totalVotos en el documento de la pregunta
        pregunta.totalVotos = totalVotos;

        // Calcula y actualiza el porcentaje de votos para cada opción
        pregunta.opciones.forEach(option => {
            option.porcentajeVotos = totalVotos === 0 ? 0 : ((option.votos / totalVotos) * 100).toFixed(2);
        });

        // Guarda los cambios en la base de datos
        await pregunta.save();

        console.log(`Total de votos y porcentajes actualizados para la pregunta con ID ${questionId}`);
    } catch (error) {
        console.error('Error al actualizar el total de votos y porcentajes para la pregunta:', error);
    }
};

// Exportar la función inicializarDatos
module.exports = { inicializarDatos, updateTotalVotes };