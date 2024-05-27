import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import './Navbar.css';

const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:3000';

export const Navbar = () => {
    const [salas, setSalas] = useState([]);

    useEffect(() => {
        const fetchSalas = async () => {
            try {
                const response = await axios.get(`${backendURL}/admin/salas`);
                const salasData = response.data;

                // Para cada sala, obtener las preguntas asociadas
                const salasWithPreguntas = await Promise.all(salasData.map(async (sala) => {
                    const preguntasResponse = await axios.get(`${backendURL}/admin/preguntas?salaId=${sala._id}`);
                    const preguntas = preguntasResponse.data;

                    // Crear los links para cada pregunta, solo si hay preguntas
                    const links = preguntas.length > 0 ? preguntas.map((pregunta, index) => [
                        { to: `/index/sala/${sala._id}/pregunta/${pregunta._id}`, label: `Pregunta ${index + 1}` },
                        { to: `/resultado/sala/${sala._id}/pregunta/${pregunta._id}`, label: `Resultado ${index + 1}` },
                        { to: `/sala_qr/sala/${sala._id}/pregunta/${pregunta._id}`, label: `QR Sala ${index + 1}` }
                    ]).flat() : [];

                    return { title: sala.nombre, links };
                }));

                setSalas(salasWithPreguntas);
            } catch (error) {
                console.error('Error al obtener las salas:', error);
            }
        };

        fetchSalas();
    }, []);

    return (
        <div className="nav-container">
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid menu">
                    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav" style={{ color: 'white' }}>
                        <ul className="navbar-nav ms-auto">
                            {salas.map((sala, index) => (
                                sala.links.length > 0 && (
                                    <Dropdown key={index}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {sala.title}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {sala.links.map((link, idx) => (
                                                <Dropdown.Item key={idx}>
                                                    <Link className="nav-link" to={link.to}>{link.label}</Link>
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};
