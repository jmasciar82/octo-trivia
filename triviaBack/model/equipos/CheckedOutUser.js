// models/CheckedOutUser.js
const mongoose = require('mongoose');

const CheckedOutUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Asegura que un email no sea duplicado
    },
    checkedOutAt: {
        type: Date,
        required: true,
    }
});

const CheckedOutUser = mongoose.model('CheckedOutUser', CheckedOutUserSchema);
module.exports = CheckedOutUser;
