const Pregunta = require('../../model/Pregunta');
const Sala = require('../../model/Sala');

exports.createPregunta = async (req, res) => {
    try {
        const { titulo, opciones, salaId, nuevaSalaNombre } = req.body;

        let sala;
        if (salaId) {
            sala = await Sala.findById(salaId);
        } else if (nuevaSalaNombre) {
            sala = new Sala({ nombre: nuevaSalaNombre });
            await sala.save();
        } else {
            return res.status(400).json({ message: 'Debe proporcionar un salaId o un nuevaSalaNombre' });
        }

        const num_orden = await Pregunta.countDocuments({ salaId: sala._id }) + 1;

        const pregunta = new Pregunta({
            titulo,
            opciones,
            salaId: sala._id,
            num_orden
        });
        await pregunta.save();

        res.status(201).json(pregunta);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la pregunta', error });
    }
};

exports.getPreguntas = async (req, res) => {
    try {
        const preguntas = await Pregunta.find().populate('salaId').sort({ num_orden: 1 });
        res.status(200).json(preguntas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las preguntas', error });
    }
};

exports.getPreguntaById = async (req, res) => {
    try {
        const pregunta = await Pregunta.findById(req.params.id).populate('salaId');
        if (!pregunta) {
            return res.status(404).json({ message: 'Pregunta no encontrada' });
        }
        res.status(200).json(pregunta);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la pregunta', error });
    }
};

exports.updatePregunta = async (req, res) => {
    try {
        const { titulo, opciones, num_orden } = req.body;
        const pregunta = await Pregunta.findByIdAndUpdate(req.params.id, { titulo, opciones, num_orden }, { new: true });
        if (!pregunta) {
            return res.status(404).json({ message: 'Pregunta no encontrada' });
        }
        res.status(200).json(pregunta);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la pregunta', error });
    }
};

exports.deletePregunta = async (req, res) => {
    try {
        const pregunta = await Pregunta.findByIdAndDelete(req.params.id);
        if (!pregunta) {
            return res.status(404).json({ message: 'Pregunta no encontrada' });
        }
        res.status(200).json({ message: 'Pregunta eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la pregunta', error });
    }
};
