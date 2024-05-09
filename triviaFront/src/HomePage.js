// HomePage.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link
import './index.css'

const HomePage = ({ onEnterClick }) => {
    return (
        <div className="home-page">

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Bienvenido al Sistema de Votaciones</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    {/* Reemplaza el botón onClick con un Link a la ruta '/index' */}
                    <Link to='/index'><Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem' , backgroundColor:'rgb(5, 227, 71, 0.5)'}}>
                <Card.Body >
                    <Card.Title>Bienvenido al Sistema Word Cloud</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    {/* Reemplaza el botón onClick con un Link a la ruta '/index' */}
                    <Link to='/indexNube'><Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>
        
        </div >
    );
};

export default HomePage;
