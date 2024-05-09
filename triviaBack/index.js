const express = require('express');
const path = require('path');
/* const config = require("./config.js"); */
const cors = require('cors');
const app = express();
const { inicializarDatos } = require('./model/initDB.js');



// Configurar CORS globalmente
app.use(cors());

// Parsear body de solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para seguridad de contenido
/* app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://octo-trivia-front.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}); */


// Rutas API RESTful
const sala1Pregunta1Routes = require('./router/sala1/pregunta1Routes.js');
const resultado1 = require('./router/sala1/respuestaRoutes.js');
const palabraRouter = require('./router/sala1/palabra.js');
const verNubeRouter = require('./router/sala1/verNube.js');

app.use('/index', sala1Pregunta1Routes);
app.use('/resultado', resultado1);
app.use('/palabraEnviada', palabraRouter);

// Permitir solicitudes CORS para todas las rutas


// Permitir solicitudes desde cualquier origen para verNubeRouter
app.use('/verNube', verNubeRouter);

// Inicializar los datos y luego iniciar el servidor
const inicializar = async () => {
    try {
        await inicializarDatos();
        console.log('Datos inicializados correctamente');
    } catch (error) {
        console.error('Error al inicializar los datos:', error);
    }
};

// Inicializar y arrancar el servidor
inicializar();
app.listen(3000, () => console.log("Server ready on port 3000."));
app.on('error', error => console.log(`Error en servidor: ${error.message}`));
module.exports = app;
