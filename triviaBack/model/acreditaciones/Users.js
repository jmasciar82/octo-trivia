const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    code: { type: String, required: true },
    qrCode: { type: String, required: true },
    tipo: {  type: String, required: true },  // Asegurando que tipo sea una cadena de texto
    codeUsed: { type: Boolean, default: false }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
