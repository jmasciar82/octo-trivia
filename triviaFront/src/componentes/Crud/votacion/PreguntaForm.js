import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:3000';

const PreguntaForm = ({ preguntaId, onSave }) => {
    const [titulo, setTitulo] = useState('');
    const [opciones, setOpciones] = useState([{ opcion: '' }, { opcion: '' }]);
    const [salaId, setSalaId] = useState('');
    const [numOrden, setNumOrden] = useState(0);
    const [salas, setSalas] = useState([]);

    useEffect(() => {
        axios.get(`${backendURL}/admin/salas`)
            .then(response => {
                setSalas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las salas:', error);
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
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Título:</label>
                <input
                    type="text"
                    className="form-input"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
            </div>

            <div className="form-group form-row">
                <div className="form-group-half">
                    <label className="form-label">Sala:</label>
                    <select
                        className="form-select"
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
                <div className="form-group-half">
                    <label className="form-label">Número de Orden:</label>
                    <input
                        type="number"
                        className="form-input"
                        value={numOrden}
                        onChange={(e) => setNumOrden(parseInt(e.target.value))}
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Opciones:</label>
                {opciones.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        className="form-input"
                        value={option.opcion}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                ))}
                <button type="button" className="add-option-button" onClick={addOption}>Agregar Opción</button>
            </div>
            <button type="submit" className="form-button">{preguntaId ? 'Actualizar' : 'Crear'}</button>
            
        </form>
    );
};

export default PreguntaForm;
