const mongoose = require('mongoose');

const CheckedOutUserSchema = new mongoose.Schema({
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
    }
}, { timestamps: true });

const CheckedOutUser = mongoose.model('CheckedOutUser', CheckedOutUserSchema);
module.exports = CheckedOutUser;
