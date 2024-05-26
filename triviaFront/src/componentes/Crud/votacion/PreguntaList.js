import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PreguntaForm from './PreguntaForm';

const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:3000';

const PreguntaList = () => {
    const [preguntas, setPreguntas] = useState([]);
    const [editingPregunta, setEditingPregunta] = useState(false);

    useEffect(() => {
        axios.get(`${backendURL}/admin/preguntas`)
            .then(response => {
                setPreguntas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las preguntas:', error);
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
        setEditingPregunta(false);
        axios.get(`${backendURL}/admin/preguntas`)
            .then(response => {
                setPreguntas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las preguntas:', error);
            });
    };

    return (
        <div>
            <h1>Lista de Preguntas</h1>
            <button onClick={() => setEditingPregunta(true)}>Crear Nueva Pregunta</button>
            {editingPregunta && (
                <PreguntaForm preguntaId={null} onSave={handleSave} />
            )}
            <ul>
                {preguntas.sort((a, b) => a.num_orden - b.num_orden).map(pregunta => (
                    <li key={pregunta._id}>
                        {pregunta.num_orden}. {pregunta.titulo} 
                        <button onClick={() => setEditingPregunta(pregunta._id)}>Editar</button>
                        <button onClick={() => handleDelete(pregunta._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PreguntaList;
