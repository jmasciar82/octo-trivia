/* eslint-disable */

import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link


import './index.css'



export const IndexChatBot = () => {
    return (
        <div>
            {/* <Header /> */}

            <div className="container">

                <h1>ChatBot <span>Octopus Trivia</span></h1>
                <p>¡Hola! Soy tu asistente virtual, diseñado para brindarte información sobre nuestra empresa de manera rápida y eficiente. Ya sea que necesites detalles sobre nuestros productos, servicios, horarios de atención o cualquier otra consulta relacionada con nuestra empresa, estoy aquí para ayudarte.</p>   

                    <Link to='/chat'><Button variant="primary">Ingresar al Chat</Button></Link>




            </div>
        </div>

    );
};




