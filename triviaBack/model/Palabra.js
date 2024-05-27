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

// Exporta el modelo si no está definido, de lo contrario usa el ya definido
module.exports = mongoose.models.Palabra || mongoose.model('Palabra', palabraSchema);
