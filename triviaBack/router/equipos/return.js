// router/equipos/checkout.js
const express = require('express');
const router = express.Router();
const CheckedOutUser = require('../../model/equipos/CheckedOutUser'); // Asegúrate de que la ruta a tu modelo es correcta

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


module.exports = router;
