// HomePage.js

import React, { useState } from 'react';

import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link
import './index.css'

const HomePage = ({ onEnterClick }) => {
    const [mensajeGrande, setMensajeGrande] = useState(false); // Estado para controlar el tamaño del mensaje
    const [mensajeGrande2, setMensajeGrande2] = useState(false); // Estado para controlar el tamaño del mensaje

    const mensaje = () => {
        setMensajeGrande(!mensajeGrande); // Cambia el estado al hacer clic en el botón
    }

    const mensaje2 = () => {
        setMensajeGrande2(!mensajeGrande2); // Cambia el estado al hacer clic en el botón
    }


    return (
        <div className="home-page">

            <Card style={{ width: '18rem', backgroundColor: 'rgb(5, 227, 71, 0.7)' }}>
                <Card.Body>
                    <Card.Title>Bienvenido al Sistema de Votaciones</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    {/* Reemplaza el botón onClick con un Link a la ruta '/index' */}
                    <Link to='/index'><Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem', backgroundColor: 'rgb(5, 227, 71, 0.7)' }}>
                <Card.Body >
                    <Card.Title>Bienvenido al Sistema Word Cloud</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    {/* Reemplaza el botón onClick con un Link a la ruta '/index' */}
                    <Link to='/indexNube'><Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>

            <Card style={{ position: 'relative', width: '18rem', backgroundColor: 'rgb(5, 227, 71, 0.7)' }}>
                
                <Card.Body>
                    <Card.Title>Bienvenido a ChatBot IA</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    
                    <Link to='/chatBot'>
                        <Button onClick={mensaje} variant="primary">Enter</Button>
                    </Link>
                </Card.Body>
            </Card>

            <Card style={{ position: 'relative', width: '18rem', backgroundColor: 'rgb(5, 227, 71, 0.7)' }}>
                <div className={`workingOn ${mensajeGrande2 ? 'big' : ''}`}>Estamos Trabajando</div> {/* Aplica la clase workingOn y la clase big si mensajeGrande es true */}
                <Card.Body>
                    <Card.Title>e-Posters <br /><br /></Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    
                    <Link to=''>
                        <Button onClick={mensaje2} variant="primary">Enter</Button>
                    </Link>
                </Card.Body>
            </Card>

        </div >
    );
};

export default HomePage;
