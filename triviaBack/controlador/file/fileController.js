// controllers/fileController.js
const cloudStorage = require('../../storage/cloudStorage');
const File = require('../../model/file/File');

const uploadFile = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const file = req.files.file;
        const { speakerName, speakerEmail, room, date, startTime, endTime } = req.body;

        // Subir archivo al proveedor de cloud storage configurado
        const result = await cloudStorage.uploadFile(file.data, file.name);

        const newFile = new File({
            originalFilename: file.name,
            filename: file.name,
            path: result.url, // Guardar la URL del archivo
            fileType: file.mimetype,
            speaker: {
                name: speakerName,
                email: speakerEmail
            },
            room,
            date: new Date(date),
            startTime,
            endTime
        });
        await newFile.save();
        res.send({ message: 'File uploaded successfully', url: result.url });
    } catch (error) {
        console.error('Error uploading file to storage:', error);
        res.status(500).send(error.message);
    }
};

const listFiles = async (req, res) => {
    try {
        const { name, email, room, date, startTime, endTime } = req.query;
        let query = {};

        if (name) query['speaker.name'] = new RegExp(name, 'i');
        if (email) query['speaker.email'] = new RegExp(email, 'i');
        if (room) query.room = room;
        if (date) query.date = new Date(date);
        if (startTime && endTime) {
            query.startTime = startTime;
            query.endTime = endTime;
        }

        const files = await File.find(query);
        res.json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: error.message });
    }
};

const downloadFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.sendStatus(404);

        res.redirect(file.path); // Redireccionar a la URL del archivo
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).json({ error: error.message });
    }
};

const replaceFile = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const file = await File.findById(req.params.id);
        if (!file) return res.sendStatus(404);

        const newFile = req.files.file;

        // Subir el nuevo archivo al proveedor de cloud storage configurado
        const result = await cloudStorage.uploadFile(newFile.data, newFile.name);

        file.originalFilename = newFile.name;
        file.filename = newFile.name;
        file.path = result.url; // Actualizar la URL del archivo
        file.fileType = newFile.mimetype;
        await file.save();

        res.send({ message: 'File replaced successfully', url: result.url });
    } catch (error) {
        console.error('Error replacing file in database:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.sendStatus(404);

        // Eliminar el archivo del proveedor de cloud storage configurado
        await cloudStorage.deleteFile(file.filename);

        // Eliminar el registro de la base de datos
        await File.deleteOne({ _id: req.params.id });

        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateFileDetails = async (req, res) => {
    try {
        const { speakerName, speakerEmail, room, date, startTime, endTime } = req.body;
        const file = await File.findById(req.params.id);
        if (!file) return res.sendStatus(404);

        file.speaker.name = speakerName;
        file.speaker.email = speakerEmail;
        file.room = room;
        file.date = new Date(date);
        file.startTime = startTime;
        file.endTime = endTime;
        await file.save();

        res.sendStatus(200);
    } catch (error) {
        console.error('Error updating file details:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { uploadFile, listFiles, downloadFile, replaceFile, deleteFile, updateFileDetails };
