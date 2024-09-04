import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ReceptoresHome.css'


const ReceptoresHome = () => {
    return (
        <div>
            <div className='lista-link-container'><Link className='lista-link' to='/lista-receptores'><Button>Lista</Button></Link></div>
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

        </div>
    );
};

export default ReceptoresHome;
