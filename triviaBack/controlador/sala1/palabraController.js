const Palabra = require('../../model/Palabra.js');

exports.subirPalabra = async (req, res) => {
    try {
        const { palabra } = req.body;
        let existingPalabra = await Palabra.findOne({ palabra });

        if (existingPalabra) {
            // Si la palabra ya existe, incrementa el contador en 1
            existingPalabra.cantidadIngresos += 1;
            await existingPalabra.save();
            return res.status(200).json({ message: 'Contador de palabra incrementado correctamente' });
        }

        const nuevaPalabra = new Palabra({ palabra });
        await nuevaPalabra.save();

        res.status(201).json({ message: 'Palabra guardada correctamente en la base de datos' });
    } catch (error) {
        console.error('Error al subir la palabra:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.verPalabras = async (req, res) => {
    try {
        // Consultar todas las palabras en la base de datos
        const palabras = await Palabra.find();
        res.status(200).json(palabras);
        console.log('palabras en la nube:', palabras);
    } catch (error) {
        console.error('Error al obtener las palabras:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
