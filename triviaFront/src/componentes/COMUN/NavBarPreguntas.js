import { Button } from 'react-bootstrap';
import './estiloBotonPreguntas.css'; // Importa el archivo CSS
const frontendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_FRONT_URL : 'http://localhost:3001';


export const NavBarPreguntas = () => {
    return (
        <div>
            <nav>
                <Button href={`${frontendURL}/index/sala/6617f798c3eb3b3b51f8df76/pregunta/6617f799c3eb3b3b51f8df78`} className="nav-button">1</Button>
                <Button href={`${frontendURL}/index/sala/6617f798c3eb3b3b51f8df76/pregunta/66244bb203d88da06a04ae8b`} className="nav-button">2</Button>
                
            </nav>
        </div>
    );
};
