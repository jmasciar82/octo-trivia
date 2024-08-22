import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './loginHome.css'


const HomePage = () => {
    return (
        <div className="home-page " id='codigo-qr'>
            
            <Card>
                <Card.Body>
                    <Card.Title>Ingreso por Codigo</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/login'><Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body >
                    <Card.Title>Ingreso por QR</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/qrscanner'><Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>

           
        </div>
    );
};

export default HomePage;
