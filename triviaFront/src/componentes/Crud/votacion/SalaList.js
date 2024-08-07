import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SalaForm from './SalaForm';
import './styles.css';

const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';

const SalaList = () => {
    const [salas, setSalas] = useState([]);
    const [editingSala, setEditingSala] = useState({ isEditing: false, salaId: null });

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
        setEditingSala({ isEditing: false, salaId: null });
        axios.get(`${backendURL}/admin/salas`)
            .then(response => {
                setSalas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las salas:', error);
            });
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Lista de Salas</h1>
            <button className="form-button" onClick={() => setEditingSala({ isEditing: true, salaId: null })}>Crear Nueva Sala</button>
            {editingSala.isEditing && (
                <SalaForm salaId={editingSala.salaId} onSave={handleSave} />
            )}
            <ul className="form-list">
                {salas.map(sala => (
                    <li className="form-list-item" key={sala._id}>
                        {sala.nombre}
                        <div className="form-list-actions">
                            <button className="form-edit-button" onClick={() => setEditingSala({ isEditing: true, salaId: sala._id })}>Editar</button>
                            <button className="form-delete-button" onClick={() => handleDelete(sala._id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SalaList;
