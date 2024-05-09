// Sala.js
const mongoose = require('mongoose');

const salaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
});

const Sala = mongoose.model('Sala', salaSchema);

module.exports = Sala;
