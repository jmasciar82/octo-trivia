import { Button } from 'react-bootstrap';
import './estiloBotonPreguntas.css'; // Importa el archivo CSS

export const NavBarPreguntas = () => {
    return (
        <div>
            <nav>
                <Button href="http://localhost:3001/index/sala/6617f798c3eb3b3b51f8df76/pregunta/6617f799c3eb3b3b51f8df78" className="nav-button">1</Button>
                <Button href="http://localhost:3001/index/sala/6617f798c3eb3b3b51f8df76/pregunta/66244bb203d88da06a04ae8b" className="nav-button">2</Button>
            </nav>
        </div>
    );
};
