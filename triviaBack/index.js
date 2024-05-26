const express = require('express');
const cors = require('cors');
const app = express();
const { inicializarDatos } = require('./model/initDB');
const dotenv = require('dotenv');



dotenv.config();



// Configurar CORS globalmente
app.use(cors());

// Parsear body de solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas API RESTful
const sala1Pregunta1Routes = require('./router/sala1/pregunta1Routes');
const resultado1 = require('./router/sala1/respuestaRoutes');
const palabraRouter = require('./router/sala1/palabra');
const verNubeRouter = require('./router/sala1/verNube');
const getQuestions = require('./router/sala1/preguntasDeSala');

app.use('/index', sala1Pregunta1Routes);
app.use('/resultado', resultado1);
app.use('/palabraEnviada', palabraRouter);
app.use('/palabrasDeSala', getQuestions);
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
