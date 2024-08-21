const express = require('express');
const cors = require('cors');
const app = express();
const { inicializarDatos } = require('./model/initDB');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');  // Importar fs
const mongoose = require('mongoose');


const config = require('../triviaBack/config.js');  // Asegúrate de que la ruta es correcta


const fileUpload = require('express-fileupload');
const { uploadFile } = require('./storage');
dotenv.config();

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());


app.use(fileUpload());




app.post('/upload', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const result = await uploadFile(file.data, file.name);

    res.send({
      message: 'File uploaded successfully',
      url: result.url
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

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
      console.log('Conectando a la base de datos:', config.databaseURL);

      await mongoose.connect(config.databaseURL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });

      const isLocalDB = config.databaseURL.includes('localhost') || config.databaseURL.includes('127.0.0.1');
      
      if (isLocalDB) {
          console.log('Conectado a la base de datos local');
      } else {
          console.log('Conectado a la base de datos en la nube');
      }

      console.log('Datos inicializados correctamente');
      console.log('JWT_SECRET:', config.jwtSecret);
  } catch (error) {
      console.error('Error al inicializar los datos:', error);
  }
};

inicializar();

app.listen(config.PORT,'0.0.0.0', () => console.log(`Server ready on port ${config.PORT}.`));

app.on('error', error => console.log(`Error en servidor: ${error.message}`));

module.exports = app;
