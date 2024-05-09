const dotenv = require('dotenv');


dotenv.config()

const URL = 'https://octopous-trivia-client.vercel.app'



const PORT = process.env.PORT || 8080


// URL de conexión a la base de datos
const databaseURL = 'mongodb+srv://jmasciar82:Rami%402010@cluster0.11wcxjb.mongodb.net/'

module.exports = { URL, PORT, databaseURL };
