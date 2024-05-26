const Sala = require('../../model/Sala');

exports.createSala = async (req, res) => {
    try {
        const { nombre } = req.body;

        const sala = new Sala({ nombre });
        await sala.save();

        res.status(201).json(sala);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la sala', error });
    }
};

exports.getSalas = async (req, res) => {
    try {
        const salas = await Sala.find();
        res.status(200).json(salas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las salas', error });
    }
};

exports.getSalaById = async (req, res) => {
    try {
        const sala = await Sala.findById(req.params.id);
        if (!sala) {
            return res.status(404).json({ message: 'Sala no encontrada' });
        }
        res.status(200).json(sala);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la sala', error });
    }
};

exports.updateSala = async (req, res) => {
    try {
        const { nombre } = req.body;
        const sala = await Sala.findByIdAndUpdate(req.params.id, { nombre }, { new: true });
        if (!sala) {
            return res.status(404).json({ message: 'Sala no encontrada' });
        }
        res.status(200).json(sala);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la sala', error });
    }
};

exports.deleteSala = async (req, res) => {
    try {
        const sala = await Sala.findByIdAndDelete(req.params.id);
        if (!sala) {
            return res.status(404).json({ message: 'Sala no encontrada' });
        }
        res.status(200).json({ message: 'Sala eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la sala', error });
    }
};
