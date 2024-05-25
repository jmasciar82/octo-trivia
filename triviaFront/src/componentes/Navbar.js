import React from 'react';
import { Link } from 'react-router-dom'; 
import Dropdown from 'react-bootstrap/Dropdown';
import './Navbar.css';

export const Navbar = () => {
    const salas = [
        { title: 'Sala 1', links: [{ to: 'sala/6617f798c3eb3b3b51f8df76/pregunta/6617f799c3eb3b3b51f8df78', label: 'Pregunta 1' }, { to: '/resultado/sala/6617f798c3eb3b3b51f8df76/pregunta/6617f799c3eb3b3b51f8df78', label: 'Resultado 1' }, { to: '/sala1_qr1/sala/6617f798c3eb3b3b51f8df76/pregunta/6617f799c3eb3b3b51f8df78', label: 'QR Sala1' }, { to: 'sala/6617f798c3eb3b3b51f8df76/pregunta/66244bb203d88da06a04ae8b', label: 'Pregunta 2' }, { to: '/resultado/sala/6617f798c3eb3b3b51f8df76/pregunta/66244bb203d88da06a04ae8b', label: 'Resultado 2' }] },
        { title: 'Sala 2', links: [{ to: 'sala/6617f798c3eb3b3b51f8df76/pregunta/6617f799c3eb3b3b51f8df78', label: 'Pregunta 1' }, { to: '/resultado/sala/6617f798c3eb3b3b51f8df76/pregunta/6617f799c3eb3b3b51f8df78', label: 'Resultado 1' }, { to: '/sala1_qr1/sala/6617f798c3eb3b3b51f8df76/pregunta/6617f799c3eb3b3b51f8df78', label: 'QR Sala1' }, { to: 'sala/6617f798c3eb3b3b51f8df76/pregunta/66244bb203d88da06a04ae8b', label: 'Pregunta 2' }, { to: '/resultado/sala/6617f798c3eb3b3b51f8df76/pregunta/66244bb203d88da06a04ae8b', label: 'Resultado 2' }] },
    ];

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
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};
