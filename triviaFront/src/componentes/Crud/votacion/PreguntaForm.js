import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:3000';

const PreguntaForm = ({ preguntaId, onSave }) => {
    const [titulo, setTitulo] = useState('');
    const [opciones, setOpciones] = useState([{ opcion: '' }, { opcion: '' }]);
    const [salaId, setSalaId] = useState('');
    const [numOrden, setNumOrden] = useState(0);
    const [salas, setSalas] = useState([]);
    const [preguntas, setPreguntas] = useState([]);

    useEffect(() => {
        // Obtener lista de salas
        axios.get(`${backendURL}/admin/salas`)
            .then(response => {
                setSalas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las salas:', error);
            });

        // Obtener lista de preguntas
        axios.get(`${backendURL}/admin/preguntas`)
            .then(response => {
                setPreguntas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las preguntas:', error);
            });

        if (preguntaId) {
            axios.get(`${backendURL}/admin/pregunta/${preguntaId}`)
                .then(response => {
                    const { titulo, opciones, salaId, num_orden } = response.data;
                    setTitulo(titulo);
                    setOpciones(opciones);
                    setSalaId(salaId);
                    setNumOrden(num_orden);
                })
                .catch(error => {
                    console.error('Error al obtener la pregunta:', error);
                });
        } else {
            setTitulo('');
            setOpciones([{ opcion: '' }, { opcion: '' }]);
            setSalaId('');
            setNumOrden(0);
        }
    }, [preguntaId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const preguntaData = { titulo, opciones, salaId, num_orden: numOrden };

        // Verificar si el número de orden ya existe en la sala seleccionada
        const numOrdenExiste = preguntas.some(pregunta => pregunta.salaId.toString() === salaId.toString() && pregunta.num_orden === numOrden);

        if (numOrdenExiste) {
            // Mostrar mensaje de confirmación al usuario
            confirmAlert({
                title: 'Confirmar cambio de orden',
                message: 'El número de orden ya existe. ¿Quieres mover la pregunta existente al próximo número de orden?',
                buttons: [
                    {
                        label: 'Sí',
                        onClick: async () => {
                            try {
                                // Encontrar la pregunta con el número de orden actual
                                const preguntaExistente = preguntas.find(pregunta => pregunta.salaId.toString() === salaId.toString() && pregunta.num_orden === numOrden);
                                // Mover la pregunta existente al próximo número de orden disponible
                                const nuevoNumOrden = Math.max(...preguntas.map(p => p.num_orden)) + 1;
                                await axios.put(`${backendURL}/admin/pregunta/${preguntaExistente._id}`, { ...preguntaExistente, num_orden: nuevoNumOrden });
                                // Guardar la nueva pregunta
                                if (preguntaId) {
                                    await axios.put(`${backendURL}/admin/pregunta/${preguntaId}`, preguntaData);
                                } else {
                                    await axios.post(`${backendURL}/admin/pregunta`, preguntaData);
                                }
                                onSave();
                            } catch (error) {
                                console.error('Error al mover la pregunta existente o guardar la nueva pregunta:', error);
                            }
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {}
                    }
                ]
            });
        } else {
            try {
                if (preguntaId) {
                    await axios.put(`${backendURL}/admin/pregunta/${preguntaId}`, preguntaData);
                } else {
                    await axios.post(`${backendURL}/admin/pregunta`, preguntaData);
                }
                onSave();
            } catch (error) {
                console.error('Error al guardar la pregunta:', error);
            }
        }
    };

    const handleOptionChange = (index, value) => {
        const newOpciones = [...opciones];
        newOpciones[index].opcion = value;
        setOpciones(newOpciones);
    };

    const addOption = () => {
        setOpciones([...opciones, { opcion: '' }]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Título:</label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
            </div>
            <div>
                <label>Sala:</label>
                <select
                    value={salaId}
                    onChange={(e) => setSalaId(e.target.value)}
                >
                    <option value="">Selecciona una sala</option>
                    {salas.map(sala => (
                        <option key={sala._id} value={sala._id}>
                            {sala.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Número de Orden:</label>
                <input
                    type="number"
                    value={numOrden}
                    onChange={(e) => setNumOrden(parseInt(e.target.value))}
                />
            </div>
            <div>
                <label>Opciones:</label>
                {opciones.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        value={option.opcion}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                ))}
                <button type="button" onClick={addOption}>Agregar Opción</button>
            </div>
            <button type="submit">{preguntaId ? 'Actualizar' : 'Crear'}</button>
        </form>
    );
};

export default PreguntaForm;
