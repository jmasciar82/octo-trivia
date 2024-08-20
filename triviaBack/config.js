const dotenv = require('dotenv');

dotenv.config();

const URL = 'https://octopous-trivia-client.vercel.app';
const PORT = process.env.PORT || 5000;

// URL de conexión a la base de datos
const databaseURL = process.env.NODE_ENV === 'production' 
    ? process.env.MONGO_URI 
    : process.env.DATABASE_URL_DEV;

const jwtSecret = process.env.JWT_SECRET;

module.exports = { URL, PORT, databaseURL, jwtSecret };
