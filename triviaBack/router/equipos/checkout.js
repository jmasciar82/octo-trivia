// routes/checkout.js

const express = require('express');
const CheckedOutUser = require('../../model/equipos/CheckedOutUser');
const ListaReceptores = require('../../model/equipos/ListaReceptores');

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


router.get('/listaReceptores', async (req, res) => {
    try {
        const users = await ListaReceptores.find(); // Asegúrate de que esta línea devuelva los datos correctos
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de usuarios.', error });
    }
});

router.post('/listaReceptores', async (req, res) => {
    try {
        const { name, email, code, checkedOutAt } = req.body;

        // Crear un nuevo usuario en la colección de listaRecptores
        
        const newListaReceptores = new ListaReceptores({ name, email, code, checkedOutAt });

        await newListaReceptores.save();
        res.status(201).json(newListaReceptores);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario en la lista de receptores entregados.', error });
    }
});

// Nueva ruta PUT para actualizar el campo 'check' por 'code'
router.put('/:code', async (req, res) => {
    try {
        const { code } = req.params;

        // Encuentra el usuario por code y actualiza el campo 'check' a false
        const user = await ListaReceptores.findOneAndUpdate(
            { code },
            { check: false }, // Cambiado a false para marcar como no chequeado
            { new: true } // Devuelve el documento actualizado
        );

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json({ message: 'Usuario actualizado exitosamente.', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario.', error });
    }
});





module.exports = router;
