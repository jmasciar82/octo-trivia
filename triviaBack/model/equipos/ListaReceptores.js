const mongoose = require('mongoose');

const ListaReceptoresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
    },
    checkedOutAt: {
        type: Date,
        required: true,
    },
    check: {
        type: Boolean,
        default: false,  // Puedes establecer un valor por defecto si es necesario
    }
}, { timestamps: true });

const ListaReceptores = mongoose.model('ListaReceptores', ListaReceptoresSchema);
module.exports = ListaReceptores;

