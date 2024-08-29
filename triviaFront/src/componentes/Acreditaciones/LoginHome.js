import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './loginHome.css'


const HomePage = () => {
    return (
        <div className="home-page" id='codigo-qr'>

            <Link to='/login' className="card-link">
                <Card className="clickable-card">
                    <Card.Body>
                        <Card.Title>Ingreso por Código</Card.Title>
                        <Card.Text>
                            Presione para ingresar
                        </Card.Text>
                        <Button variant="primary">Enter</Button>
                    </Card.Body>
                </Card>
            </Link>

            <Link to='/qrscanner' className="card-link">
                <Card className="clickable-card">
                    <Card.Body>
                        <Card.Title>Ingreso por <br /> QR</Card.Title>
                        <Card.Text>
                            Presione para ingresar
                        </Card.Text>
                        <Button variant="primary">Enter</Button>
                    </Card.Body>
                </Card>
            </Link>


        </div>
    );
};

export default HomePage;
