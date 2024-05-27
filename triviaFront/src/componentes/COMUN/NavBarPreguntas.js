import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './estiloBotonPreguntas.css'; // Importa el archivo CSS

const frontendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_FRONT_URL : 'http://localhost:3001';
const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:3000';

export const NavBarPreguntas = () => {
    const { salaId } = useParams();
    const [preguntas, setPreguntas] = useState([]);

    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                const response = await axios.get(`${backendURL}/admin/preguntas?salaId=${salaId}`);
                // Ordenar las preguntas por el campo num_orden de menor a mayor
                const preguntasOrdenadas = response.data.sort((a, b) => a.num_orden - b.num_orden);
                setPreguntas(preguntasOrdenadas);
            } catch (error) {
                console.error('Error al obtener las preguntas:', error);
            }
        };
    
        fetchPreguntas();
    }, [salaId]);
    

    return (
        <div>
            <nav>
                {preguntas.map((pregunta, index) => (
                    <Button key={pregunta._id} href={`${frontendURL}/index/sala/${salaId}/pregunta/${pregunta._id}`} className="nav-button">
                        {index + 1}
                    </Button>
                ))}
            </nav>
        </div>
    );
};
