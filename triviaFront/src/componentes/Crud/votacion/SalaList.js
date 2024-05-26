import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SalaForm from './SalaForm';

const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:3000';

const SalaList = () => {
    const [salas, setSalas] = useState([]);
    const [editingSala, setEditingSala] = useState(false);

    useEffect(() => {
        axios.get(`${backendURL}/admin/salas`)
            .then(response => {
                setSalas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las salas:', error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${backendURL}/admin/sala/${id}`)
            .then(response => {
                setSalas(salas.filter(sala => sala._id !== id));
            })
            .catch(error => {
                console.error('Error al eliminar la sala:', error);
            });
    };

    const handleSave = () => {
        setEditingSala(false);
        axios.get(`${backendURL}/admin/salas`)
            .then(response => {
                setSalas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las salas:', error);
            });
    };

    return (
        <div>
            <h1>Lista de Salas</h1>
            <button onClick={() => setEditingSala(true)}>Crear Nueva Sala</button>
            {editingSala && (
                <SalaForm salaId={null} onSave={handleSave} />
            )}
            <ul>
                {salas.map(sala => (
                    <li key={sala._id}>
                        {sala.nombre}
                        <button onClick={() => setEditingSala(sala._id)}>Editar</button>
                        <button onClick={() => handleDelete(sala._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SalaList;
    