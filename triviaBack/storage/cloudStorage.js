// cloudStorage.js
const { uploadFile: uploadToBlob } = require('./vercelBlobStorage');

// const { uploadFile: uploadToS3, deleteFile: deleteFromS3 } = require('./awsS3Storage'); // Ejemplo para AWS S3

let cloudStorage;

if (process.env.CLOUD_PROVIDER === 'VERCEL') {
    cloudStorage = {
        uploadFile: uploadToBlob,
        deleteFile: () => {} // Implementa deleteFile para Vercel si es necesario
    };
} else if (process.env.CLOUD_PROVIDER === 'AWS_S3') {
    cloudStorage = {
        uploadFile: uploadToS3,
        deleteFile: deleteFromS3
    };

} else {
    throw new Error('No valid CLOUD_PROVIDER found.');
}

module.exports = cloudStorage;
