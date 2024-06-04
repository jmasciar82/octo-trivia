import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../index';

const AdminPage = () => {
    return (
        <div className="home-page">
            
            <Card style={{ position: 'relative', width: '18rem', backgroundColor: 'rgba(5, 227, 71, 0.7)' }}>
                <Card.Body>
                    <Card.Title>Administracion de las salas</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/admin/salas'>
                        <Button variant="primary">Enter</Button>
                    </Link>
                </Card.Body>
            </Card>

            <Card style={{ position: 'relative', width: '18rem', backgroundColor: 'rgba(5, 227, 71, 0.7)' }}>
                <Card.Body>
                    <Card.Title>Administracion de las preguntas</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/admin/preguntas'>
                        <Button variant="primary">Enter</Button>
                    </Link>
                </Card.Body>
            </Card>

            <Card style={{ position: 'relative', width: '18rem', backgroundColor: 'rgba(5, 227, 71, 0.7)' }}>
                <Card.Body>
                    <Card.Title>Registro de Acreditaciones </Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='users/acreditaciones'>
                        <Button variant="primary">Enter</Button>
                    </Link>
                </Card.Body>
            </Card>

            <Card style={{ position: 'relative', width: '18rem', backgroundColor: 'rgba(5, 227, 71, 0.7)' }}>
                <Card.Body >
                    <Card.Title>File<br></br> Manager</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/'><Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminPage;
