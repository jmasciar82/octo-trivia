// storage.js
const { put } = require('@vercel/blob');
require('dotenv').config();

const uploadFile = async (fileContent, fileName) => {
  const response = await put(fileName, fileContent, {
    access: 'public', // Puedes ajustar el acceso según tus necesidades
    token: process.env.BLOB_READ_WRITE_TOKEN
  });

  return response;
};

module.exports = {
  uploadFile
};
