const express = require('express');
const { uploadFile, listFiles, downloadFile } = require('../../controlador/file/fileController');
const router = express.Router();

router.post('/upload', uploadFile);
router.get('/', listFiles);
router.get('/:id', downloadFile);

module.exports = router;
