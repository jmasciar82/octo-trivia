// router/equipos/checkout.js
const express = require('express');
const router = express.Router();
const CheckedOutUser = require('../../model/equipos/CheckedOutUser'); // Asegúrate de que la ruta a tu modelo es correcta
const ListaReceptores = require('../../model/equipos/ListaReceptores');

// Ruta DELETE para eliminar un usuario por 'code'
// Ruta DELETE para eliminar un usuario por code
router.delete('/:code', async (req, res) => {
    try {
        const { code } = req.params;

        // Busca y elimina el usuario por code
        const user = await CheckedOutUser.findOneAndDelete({ code });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario.', error });
    }
});

// Nueva ruta PUT para actualizar el campo 'check' por 'code'
router.put('/:code', async (req, res) => {
    try {
        const { code } = req.params;

        // Encuentra el usuario por code y actualiza el campo 'check' a true
        const user = await ListaReceptores.findOneAndUpdate(
            { code },
            { check: true },
            { new: false }
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
