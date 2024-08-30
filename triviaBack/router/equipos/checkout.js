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
    try {
        const { name, email, code, checkedOutAt } = req.body;

        // Crear un nuevo usuario en la colección de CheckedOutUser
        const newCheckedOutUser = new CheckedOutUser({ name, email, code, checkedOutAt });

        await newCheckedOutUser.save();
        res.status(201).json(newCheckedOutUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario.', error });
    }
});





module.exports = router;
