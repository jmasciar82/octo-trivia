const File = require('../../model/file/File');

const multer = require('multer');
const path = require('path');

// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage }).single('file');

const uploadFile = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Error during file upload:', err);
            return res.status(500).json({ error: err.message });
        }
        try {
            const { speakerName, speakerEmail, room, date, startTime, endTime } = req.body;

            const file = new File({
                originalFilename: req.file.originalname,
                filename: req.file.filename,
                path: req.file.path,
                fileType: req.file.mimetype,
                speaker: {
                    name: speakerName,
                    email: speakerEmail
                },
                room,
                date: new Date(date), // Asegúrate de almacenar la fecha como un objeto Date
                startTime,
                endTime
            });
            await file.save();
            res.sendStatus(201);
        } catch (error) {
            console.error('Error saving file to database:', error);
            res.status(500).json({ error: error.message });
        }
    });
};

const listFiles = async (req, res) => {
    try {
        const { room, date, startTime, endTime } = req.query;
        let query = {};

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
        res.download(path.resolve(file.path), file.originalFilename);
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { uploadFile, listFiles, downloadFile };
