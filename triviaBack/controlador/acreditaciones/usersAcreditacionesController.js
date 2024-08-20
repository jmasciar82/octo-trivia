const nodemailer = require('nodemailer');
const User = require('../../model/acreditaciones/Users.js');
const qrcode = require('qrcode');

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'krakenacreditacion@gmail.com',
        pass: 'qezkouzqoqokzmwz',
    },
});

// Función para enviar el correo
const sendEmail = (email, qrCode, code) => {
    const mailOptions = {
        from: 'krakenacreditacion@gmail.com',
        to: email,
        subject: 'Bienvenido al Congreso',
        text: `Gracias por registrarte. Aquí está tu código para ingresar al congreso: ${code}.`,
        html: `<p>Gracias por registrarte. Aquí está tu código para ingresar al congreso:</p>
               <p><strong>${code}</strong></p>`,
        attachments: [{
            filename: 'qrcode.png',
            content: qrCode.split("base64,")[1],
            encoding: 'base64',
        }],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            if (error.responseCode === 421) {
                // Error relacionado con el límite de envío
                console.error('Se ha alcanzado el límite de envío de correos.');
            }
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};

// Generar código aleatorio
const generateCode = () => {
    return Math.random().toString(36).substring(2, 14).toUpperCase();
};

// Generar código QR
const generateQRCode = async (text) => {
    try {
        const qr = await qrcode.toDataURL(text);
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
        sendEmail(email, qrCode, code);

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
        
        // Aquí no devolvemos un error, solo los datos del usuario
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
