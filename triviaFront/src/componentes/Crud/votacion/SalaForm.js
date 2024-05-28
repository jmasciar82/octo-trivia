import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

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
        } else {
            setNombre('');
        }
    }, [salaId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const salaData = { nombre };

        try {
            if (salaId) {
                await axios.put(`${backendURL}/admin/sala/${salaId}`, salaData);
            } else {
                await axios.post(`${backendURL}/admin/sala`, salaData);
            }
            onSave();
        } catch (error) {
            console.error('Error al guardar la sala:', error);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Nombre:</label>
                <input
                    type="text"
                    className="form-input"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <button type="submit" className="form-button">{salaId ? 'Actualizar' : 'Crear'}</button>
        </form>
    );
};

export default SalaForm;
