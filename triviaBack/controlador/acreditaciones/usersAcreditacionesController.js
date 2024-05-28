// controlador/acreditaciones/usersAcreditacionesController.js

const User = require('../../model/acreditaciones/Users.js');
const qrcode = require('qrcode');

const generateCode = () => {
    return Math.random().toString(36).substring(2, 14).toUpperCase();
};

const generateQRCode = async (text) => {
    try {
        const qr = await qrcode.toDataURL(text);
        return qr;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const crear = async (req, res) => {
    const { name, email, tipo } = req.body;
    const code = generateCode();
    const qrCode = await generateQRCode(code);

    try {
        const newUser = new User({ name, email, code, qrCode, tipo });
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(400).json({ error: 'Error al crear el usuario' });
    }
};

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

const obtenerTodos = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

module.exports = { obtener, crear, obtenerTodos};
