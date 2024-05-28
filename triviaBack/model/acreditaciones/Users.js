// model/acreditaciones/Users.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    code: String,
    qrCode: String,
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
