import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <><Link className='admin-link' to='/admin'><Button>Admin</Button></Link></>
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

           {/*  <Card>
                <Card.Body>
                    <Card.Title>Bienvenido a ChatBot IA</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/chatBot'>
                        <Button variant="primary">Enter</Button>
                    </Link>
                </Card.Body>
            </Card>  */}

           {/*  <Card>
                <Card.Body>
                    <Card.Title>e-Posters <br /><br /></Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to=''>
                        <Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card> */}

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
        </div>
    );
};

export default HomePage;
