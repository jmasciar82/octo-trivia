const mongoose = require('mongoose');
const UserAdmin = require('./model/admin/UserAdmin'); // Asegúrate de que la ruta es correcta
const dotenv = require('dotenv');

dotenv.config(); // Carga las variables de entorno

const inicializarAdmin = async () => {
    try {
        // Conectar a la base de datos
        await mongoose.connect(process.env.DATABASE_URL_DEV, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a la base de datos');

        // Verifica si ya existe un usuario admin
        const existingAdmin = await UserAdmin.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log('El usuario admin ya existe.');
        } else {
            // Crear un nuevo usuario admin
            const admin = new UserAdmin({
                username: 'admin',
                password: 'admin', // Cambia esto a una contraseña segura
            });

            await admin.save();
            console.log('Usuario admin creado con éxito');
        }

        mongoose.disconnect(); // Desconecta de la base de datos
    } catch (error) {
        console.error('Error al crear el usuario admin:', error);
    }
};

inicializarAdmin();
