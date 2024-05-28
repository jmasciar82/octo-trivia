const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    code: { type: String, required: true },
    qrCode: { type: String, required: true },
    tipo: { type: Number, required: true, min: 1, max: 10 } // Asegurando que tipo sea un número entre 1 y 10
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
