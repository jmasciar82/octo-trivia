import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './loginHome.css'


const ReceptoresHome = () => {
    return (
        <div className="home-page" id='codigo-qr'>

            <Link to='/equipment-checkout' className="card-link">
                <Card className="clickable-card">
                    <Card.Body>
                        <Card.Title>Retiro<hr></hr>Receptor</Card.Title>
                        <Card.Text>
                            Presione retirar un receptor
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            </Link>

            <Link to='/return' className="card-link">
                <Card className="clickable-card">
                    <Card.Body>
                        <Card.Title>Entrega<hr></hr>Receptor</Card.Title>
                        <Card.Text>
                            Presione devolver un receptor
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            </Link>


        </div>
    );
};

export default ReceptoresHome;
