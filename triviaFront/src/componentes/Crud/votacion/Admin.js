import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../index';
import './styles.css';


/* <Card >
                <Card.Body>
                    <Card.Title>Administración de las salas</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/admin/salas'>
                        <Button variant="primary">Enter</Button>
                    </Link>
                </Card.Body>
            </Card>
            
            <Card >
                <Card.Body>
                    <Card.Title>Administración de las preguntas</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/admin/preguntas'>
                        <Button variant="primary">Enter</Button>
                    </Link>
                </Card.Body>
            </Card>

             <Card >
                <Card.Body >
                    <Card.Title>File<br></br>Manager</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/'><Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>



            */

const AdminPage = () => {
    return (
        <div className="home-page">





            <Card >
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


        </div>
    );
};

export default AdminPage;
