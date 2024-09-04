import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import './ListaReceptores.css'

const ListaReceptores = () => {
    const [receptores, setReceptores] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReceptores = async () => {
            setLoading(true);
            const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:5000';
            try {
                const response = await axios.get(`${backendURL}/checkout`);
                setReceptores(response.data);
            } catch (err) {
                console.error('Error al obtener la lista de receptores:', err);
                toast.error('Error al obtener la lista de receptores.');
            }
            setLoading(false);
        };

        fetchReceptores();
    }, []);

    return (
        <div className="receptores-list-container">
            
            <h1>Lista de Receptores</h1>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <ul className="list-group">
                    {receptores.map((receptor, index) => (
                        <li key={index} className="list-group-item">
                            <p><strong>Nombre:</strong> {receptor.name}</p>
                            <p><strong>Email:</strong> {receptor.email}</p>
                            <p><strong>Código:</strong> {receptor.code}</p>
                            
                            
                        </li>
                    ))}
                </ul>
            )}
            <ToastContainer />
        </div>
    );
};

export default ListaReceptores;
