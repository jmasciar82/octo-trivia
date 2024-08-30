import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './loginHome.css';

const HomePage = () => {
    return (
        <div className="home-page" id='codigo-qr'>
            <Link to='/login' className="card-link">
                <Card className="clickable-card">
                    <Card.Body>
                        <Card.Title>Ingresar<hr></hr>Código</Card.Title>
                        <Card.Text>
                            Presione para ingresar
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>

            <Link to='/qrscanner' className="card-link">
                <Card className="clickable-card">
                    <Card.Body>
                        <Card.Title>Ingresar<hr></hr>QR</Card.Title>
                        <Card.Text>
                            Presione para ingresar
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    );
};

export default HomePage;
