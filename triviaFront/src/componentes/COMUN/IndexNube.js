
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link


import './index.css'



export const IndexNube = () => {
    return (
        <div>
            {/* <Header /> */}

            <div className="container">

                <h1>Word Cloud <span>Octopus Trivia</span></h1>
                <p>Convierte las exposiciones en una experiencia colaborativa única, ayudando a los asistentes a compartir sus dudas e impresiones.</p>
                <div className="botones__nube">
                    <Link to='/palabraEnviada'><Button variant="primary">Ingresar palabra</Button></Link>
                    <Link to='/verNube'><Button variant="primary">Ver la NUBE</Button></Link>
                </div>


            </div>
        </div>

    );
};




