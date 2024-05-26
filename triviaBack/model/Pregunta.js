const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    opciones: {
        type: [
            {
                opcion: String,
                votos: { type: Number, default: 0 },
                porcentajeVotos: { type: Number, default: 0 }
            }
        ],
        required: true
    },
    salaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sala',
        required: true
    },
    num_orden: {
        type: Number,
        required: true
    },
    totalVotos: {
        type: Number,
        default: 0
    }
});

const Pregunta = mongoose.model('Pregunta', preguntaSchema);

module.exports = Pregunta;
