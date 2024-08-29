// routes/checkout.js

const express = require('express');
const CheckedOutUser = require('../../model/equipos/CheckedOutUser');

const router = express.Router();

// Obtener la lista de usuarios que han retirado equipos
// routes/checkout.js

router.get('/', async (req, res) => {
    try {
        const users = await CheckedOutUser.find(); // Asegúrate de que esta línea devuelva los datos correctos
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de usuarios.', error });
    }
});



// Endpoint para agregar un nuevo usuario que retira equipo
// router/equipos/checkout.js
router.post('/', async (req, res) => {
    const { name, email, checkedOutAt } = req.body;

    try {
        const existingUser = await CheckedOutUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Este usuario ya ha retirado un equipo.' });
        }

        const newUser = new CheckedOutUser({ name, email, checkedOutAt });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente.', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar al usuario.', error });
    }
});





module.exports = router;
