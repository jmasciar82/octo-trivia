const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    originalFilename: String, // Nombre original del archivo
    filename: String, // Nombre del archivo con el timestamp
    path: String,
    fileType: String,
    speaker: {
        name: String,
        email: String,
    },
    room: String,
    date: Date,
    startTime: String,
    endTime: String
});

const File = mongoose.model('File', fileSchema);
module.exports = File;
