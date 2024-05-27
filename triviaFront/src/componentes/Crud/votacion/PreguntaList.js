import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PreguntaForm from './PreguntaForm';
import './styles.css';

const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:3000';

const PreguntaList = () => {
    const [preguntas, setPreguntas] = useState([]);
    const [salas, setSalas] = useState([]);
    const [editingPregunta, setEditingPregunta] = useState(null);
    const [editingOrdenId, setEditingOrdenId] = useState(null);
    const [numOrden, setNumOrden] = useState({});

    useEffect(() => {
        fetchPreguntas();
        fetchSalas();
    }, []);

    const fetchPreguntas = () => {
        axios.get(`${backendURL}/admin/preguntas`)
            .then(response => {
                setPreguntas(response.data);
                const initialOrden = response.data.reduce((acc, pregunta) => {
                    acc[pregunta._id] = pregunta.num_orden;
                    return acc;
                }, {});
                setNumOrden(initialOrden);
            })
            .catch(error => {
                console.error('Error al obtener las preguntas:', error);
            });
    };

    const fetchSalas = () => {
        axios.get(`${backendURL}/admin/salas`)
            .then(response => {
                setSalas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las salas:', error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`${backendURL}/admin/pregunta/${id}`)
            .then(response => {
                setPreguntas(preguntas.filter(pregunta => pregunta._id !== id));
            })
            .catch(error => {
                console.error('Error al eliminar la pregunta:', error);
            });
    };

    const handleSave = () => {
        setEditingPregunta(null);
        fetchPreguntas();
    };

    const getSalaNombre = (salaId) => {
        if (typeof salaId === 'object' && salaId._id) {
            salaId = salaId._id;
        }
        const sala = salas.find(sala => sala._id.toString() === salaId.toString());
        return sala ? sala.nombre : 'Sala desconocida';
    };

    const handleOrdenChange = (id, value) => {
        const newOrden = { ...numOrden, [id]: value };
        setNumOrden(newOrden);
    };

    const handleOrdenSave = (id) => {
        const pregunta = preguntas.find(pregunta => pregunta._id === id);
        axios.put(`${backendURL}/admin/pregunta/${id}`, {
            ...pregunta,
            num_orden: numOrden[id]
        })
            .then(response => {
                setEditingOrdenId(null);
                handleSave();
            })
            .catch(error => {
                console.error('Error al actualizar el número de orden:', error);
            });
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Lista de Preguntas</h1>
            <button className="form-button" onClick={() => setEditingPregunta({})}>Crear Nueva Pregunta</button>
            {editingPregunta && (
                <PreguntaForm preguntaId={editingPregunta._id || null} onSave={handleSave} />
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th>Orden</th>
                        <th>Pregunta</th>
                        <th>Sala</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {preguntas.sort((a, b) => a.num_orden - b.num_orden).map(pregunta => (
                        <tr key={pregunta._id}>
                            <td>
                                {editingOrdenId === pregunta._id ? (
                                    <>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={numOrden[pregunta._id]}
                                            onChange={(e) => handleOrdenChange(pregunta._id, e.target.value)}
                                        />
                                        <button className="btn btn-primary mt-2" onClick={() => handleOrdenSave(pregunta._id)}>Guardar</button>
                                    </>
                                ) : (
                                    <span onClick={() => setEditingOrdenId(pregunta._id)}>{pregunta.num_orden}</span>
                                )}
                            </td>
                            <td>{pregunta.titulo}</td>
                            <td>{getSalaNombre(pregunta.salaId)}</td>
                            <td>
                                <button className="btn btn-secondary mr-2" onClick={() => setEditingPregunta(pregunta)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(pregunta._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PreguntaList;
