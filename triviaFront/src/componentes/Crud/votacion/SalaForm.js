import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';

const SalaForm = ({ salaId, onSave }) => {
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        if (salaId) {
            axios.get(`${backendURL}/admin/sala/${salaId}`)
                .then(response => {
                    setNombre(response.data.nombre);
                })
                .catch(error => {
                    console.error('Error al obtener la sala:', error);
                });
        }
    }, [salaId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (salaId) {
            // Editar sala existente
            axios.put(`${backendURL}/admin/sala/${salaId}`, { nombre })
                .then(response => {
                    onSave();
                })
                .catch(error => {
                    console.error('Error al editar la sala:', error);
                });
        } else {
            // Crear nueva sala
            axios.post(`${backendURL}/admin/sala`, { nombre })
                .then(response => {
                    onSave();
                })
                .catch(error => {
                    console.error('Error al crear la sala:', error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1 className="form-title">{salaId ? 'Editar Sala' : 'Crear Nueva Sala'}</h1>
            <div className="form-group">
                <label className="form-label">Nombre:</label>
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={e => setNombre(e.target.value)} 
                    className="form-input" 
                />
            </div>
            <button type="submit" className="form-button">{salaId ? 'Guardar Cambios' : 'Crear Sala'}</button>
        </form>
    );
};

export default SalaForm;
