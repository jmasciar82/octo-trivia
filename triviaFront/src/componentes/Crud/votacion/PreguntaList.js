import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PreguntaForm from './PreguntaForm';
import './styles.css';

const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:3000';

const PreguntaList = () => {
    const [preguntas, setPreguntas] = useState([]);
    const [salas, setSalas] = useState([]);
    const [editingPreguntaId, setEditingPreguntaId] = useState(null);
    const [editingOrdenId, setEditingOrdenId] = useState(null);
    const [numOrden, setNumOrden] = useState({});

    useEffect(() => {
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

        axios.get(`${backendURL}/admin/salas`)
            .then(response => {
                setSalas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las salas:', error);
            });
    }, []);

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
        setEditingPreguntaId(null);
        axios.get(`${backendURL}/admin/preguntas`)
            .then(response => {
                setPreguntas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las preguntas:', error);
            });
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
            <button className="form-button" onClick={() => setEditingPreguntaId(null)}>Crear Nueva Pregunta</button>
            {editingPreguntaId !== null && (
                <PreguntaForm preguntaId={editingPreguntaId} onSave={handleSave} />
            )}
            <ul className="form-list">
                <li className="form-list-header">
                    <span className="header-orden">Orden</span>
                    <span className="header-pregunta">Pregunta</span>
                    <span className="header-sala">Sala</span>
                    <span>Edit</span>
                </li>
                {preguntas.sort((a, b) => a.num_orden - b.num_orden).map(pregunta => (
                    <li className="form-list-item" key={pregunta._id}>
                        {editingOrdenId === pregunta._id ? (
                            <>
                                <input
                                    type="number"
                                    className="item-orden-input"
                                    value={numOrden[pregunta._id]}
                                    onChange={(e) => handleOrdenChange(pregunta._id, e.target.value)}
                                />
                                <button className="form-save-button" onClick={() => handleOrdenSave(pregunta._id)}>Guardar</button>
                            </>
                        ) : (
                            <>
                                <span className="item-orden" onClick={() => setEditingOrdenId(pregunta._id)}>{pregunta.num_orden}</span>
                                <span className="item-pregunta">{pregunta.titulo} ({getSalaNombre(pregunta.salaId)})</span>
                                <span className="item-pregunta">({getSalaNombre(pregunta.salaId)})</span>
                            </>
                        )}
                        <div className="form-list-actions">
                            <button className="form-edit-button" onClick={() => setEditingPreguntaId(pregunta._id)}>Editar</button>
                            <button className="form-delete-button" onClick={() => handleDelete(pregunta._id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PreguntaList;
