const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    opciones: {
        type: [
            {
                opcion: String, // Nombre de la opción
                votos: { type: Number, default: 0 }, // Cantidad de votos para esta opción
                porcentajeVotos: { type: Number, default: 0 } // Porcentaje de votos para esta opción
            }
        ],
        required: true
    },
    salaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sala',
        required: true
    },
    totalVotos: {
        type: Number,
        default: 0 // Inicialmente no hay votos
    }
});



const Pregunta = mongoose.model('Pregunta', preguntaSchema);

module.exports = Pregunta;
