const express = require('express');
const router = express.Router();
const CheckedOutUser = require('../../model/equipos/CheckedOutUser');

router.delete('/', async (req, res) => {
    console.log("Datos recibidos en DELETE:", req.body); // Verifica los datos recibidos
    const { name, email, checkedOutAt } = req.body;
    console.log("name:", email); // Verifica los datos recibidos

    try {
        const result = await CheckedOutUser.findOneAndDelete({ email });

        if (result) {
            res.status(200).json({ message: 'Usuario devuelto y eliminado correctamente.' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la devolución.' });
    }
});



module.exports = router;
