

// routes/fileRoutes.js

const express = require('express');
const { uploadFile, listFiles, downloadFile, replaceFile, deleteFile, updateFileDetails } = require('../../controlador/file/fileController');
const router = express.Router();

router.post('/upload', uploadFile);
router.get('/', listFiles);
router.get('/:id', downloadFile);
router.put('/replace/:id', replaceFile);
router.delete('/:id', deleteFile);
router.put('/update/:id', updateFileDetails);

module.exports = router;
