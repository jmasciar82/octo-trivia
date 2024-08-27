require('dotenv').config(); // Carga las variables de entorno
const nodemailer = require('nodemailer');
const User = require('../../model/acreditaciones/Users.js');
const qrcode = require('qrcode');

// Configuración de Nodemailer con Hostinger
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com', // Servidor SMTP de Hostinger
    port: 587, // Puerto para TLS, usa 465 si prefieres SSL
    secure: false, // Usa true si estás utilizando el puerto 465 (SSL)
    auth: {
        user: process.env.EMAIL_USER, // Tu dirección de correo electrónico de Hostinger
        pass: process.env.EMAIL_PASS, // Tu contraseña de correo electrónico de Hostinger
    },
    tls: {
        rejectUnauthorized: false // Configura esta opción si tienes problemas de seguridad con los certificados
    }
});

// Función para enviar el correo
const sendEmail = async (email, qrCode, code) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Usa la variable de entorno
        to: email,
        subject: 'Bienvenido al Congreso',
        html: `
            <div style="text-align: center;">
                <img src="cid:logo" alt="Logo del Congreso" style="width: 150px; margin-bottom: 20px;" />
                <p>Gracias por registrarte. Aquí está tu código para ingresar al congreso:</p>
                <p><strong>${code}</strong></p>
                <p><strong>También puedes usar el código QR</strong></p>
                <p>Escanea este código QR para acceder:</p>
                <img src="cid:qrcode" alt="Código QR" style="width: 300px; height: 300px;" />
            </div>
        `,
        attachments: [
            {
                filename: 'logo.png',
                path: 'https://bagomas.com.ar/img/logo.png', // Ruta al logo
                cid: 'logo' // Content-ID para incrustar la imagen en el correo
            },
            {
                filename: 'qrcode.png',
                content: qrCode.split("base64,")[1], // Quitar el prefijo de data URI
                encoding: 'base64',
                cid: 'qrcode' // Content-ID para incrustar la imagen en el correo
            }
        ]
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado: ' + info.response);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        if (error.responseCode === 421) {
            console.error('Se ha alcanzado el límite de envío de correos.');
        }
    }
};

// Generar código aleatorio
const generateCode = () => {
    return Math.random().toString(36).substring(2, 14).toUpperCase();
};

// Generar código QR en formato PNG
const generateQRCode = async (text) => {
    try {
        const qr = await qrcode.toDataURL(text, {
            type: 'image/png', // Cambiar a PNG
            width: 500, // Ajustar tamaño
            scale: 10, // Ajustar resolución
        });
        return qr;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Crear un nuevo usuario
const crear = async (req, res) => {
    const { name, email, tipo } = req.body;
    const code = generateCode();
    const qrCode = await generateQRCode(code);

    try {
        const newUser = new User({ name, email, code, qrCode, tipo });
        await newUser.save();

        // Enviar correo electrónico con los datos del usuario
        await sendEmail(email, qrCode, code);

        res.json(newUser);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(400).json({ error: 'Error al crear el usuario' });
    }
};

// Obtener un usuario por su código
const obtener = async (req, res) => {
    try {
        const user = await User.findOne({ code: req.params.code });
        if (!user) return res.status(404).send('User not found');

        res.json(user);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener todos los usuarios
const obtenerTodos = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

module.exports = { obtener, crear, obtenerTodos };
