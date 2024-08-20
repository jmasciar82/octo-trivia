import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './index.css';

/* 

            <Card>
                <Card.Body>
                    <Card.Title>Votaciones</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/index'><Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>

             <Card>
                <Card.Body>
                    <Card.Title>Word Cloud</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/indexNube'><Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Title>File Manager</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/fileManager'><Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>
            
            */

const HomePage = () => {
    return (
        <div className="home-page" >
            <Link className='admin-link' to='/loginAdmin'><Button>Admin</Button></Link>


           

            <Card>
                <Card.Body>
                    <Card.Title>Acreditaciones</Card.Title>
                    <Card.Text>
                        Presione Enter para ingresar
                    </Card.Text>
                    <Link to='/loginHome'><Button variant="primary">Enter</Button></Link>
                </Card.Body>
            </Card>

            
        </div>
    );
};

export default HomePage;
