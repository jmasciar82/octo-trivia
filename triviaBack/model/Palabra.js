const mongoose = require('mongoose');

const palabraSchema = new mongoose.Schema({
    palabra: {
        type: String,
        required: true
    },
    cantidadIngresos: {
        type: Number,
        default: 1 // Valor por defecto para la cantidad de ingresos
    }
});

const Palabra = mongoose.model('Palabra', palabraSchema);

module.exports = Palabra;
