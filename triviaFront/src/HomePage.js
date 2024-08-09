import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.css';

const HomePage = () => {
    const [background, setBackground] = useState('');

    const changeBackground = (imageUrl) => {
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize = 'cover'; // Para que la imagen cubra todo el fondo
        document.body.style.backgroundRepeat = 'no-repeat';
    };

    return (
        <div className="home-page">
            <Link className='admin-link' to='/loginAdmin'><Button>Admin</Button></Link>
            <Card>
                <Card.Body>
                    <Card.Title>Bienvenido al Sistema de Votaciones</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/index'><Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body >
                    <Card.Title>Bienvenido al Sistema Word Cloud</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/indexNube'><Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>

            {/* Botón para cambiar el fondo */}
            <Button 
                variant="secondary" 
                onClick={() => changeBackground('https://ejemplo.com/imagen-de-fondo.jpg')}
            >
                Cambiar Fondo
            </Button>

            <Card>
                <Card.Body>
                    <Card.Title>Acreditaciones <br /><br /></Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/loginHome'>
                        <Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Title>File Manager <br /><br /></Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/fileManager'>
                        <Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default HomePage;
