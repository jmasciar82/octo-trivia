const mongoose = require('mongoose');

const salaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
});

// Exporta el modelo si no está definido, de lo contrario usa el ya definido
module.exports = mongoose.models.Sala || mongoose.model('Sala', salaSchema);
