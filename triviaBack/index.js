const express = require('express');
const cors = require('cors');
const app = express();
const { inicializarDatos } = require('./model/initDB');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');  // Importar fs
dotenv.config();

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Asegúrate de que la carpeta uploads exista
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


// Rutas API RESTful
const sala1Pregunta1Routes = require('./router/sala1/pregunta1Routes');
const resultado1 = require('./router/sala1/respuestaRoutes');
const palabraRouter = require('./router/sala1/palabra');
const verNubeRouter = require('./router/sala1/verNube');
const getQuestions = require('./router/sala1/preguntasDeSala');
const preguntaRoutes = require('./router/crud/votacion/preguntaRoutes.js');
const salaRoutes = require('./router/crud/votacion/salaRoutes');
const usersAcreditaciones = require('./router/acreditaciones/usersAcreditacionesRoutes');
const authAdminRoutes = require('./router/admin/authAdmin.js');

const fileRoutes = require('./router/file/fileRoutes.js');






app.use('/admin/auth', authAdminRoutes);
app.use('/index', sala1Pregunta1Routes);
app.use('/resultado', resultado1);
app.use('/palabraEnviada', palabraRouter);
app.use('/palabrasDeSala', getQuestions);
app.use('/verNube', verNubeRouter);
app.use('/admin', preguntaRoutes);
app.use('/admin', salaRoutes);
app.use('/usersAcreditaciones', usersAcreditaciones);


// Rutas
app.use('/api/files', fileRoutes);



const inicializar = async () => {
    try {
        await inicializarDatos();
        console.log('Datos inicializados correctamente');
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
    } catch (error) {
        console.error('Error al inicializar los datos:', error);
    }
};

inicializar();
app.listen(5000, () => console.log("Server ready on port 5000."));
app.on('error', error => console.log(`Error en servidor: ${error.message}`));

module.exports = app;
