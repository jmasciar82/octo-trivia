// Importa el componente BotPressChat
import { BotPressChat } from './BotPressChat';
import './index.css'

// Define el componente IndexChat
export const IndexChat = () => {
    return (
        // Agrega el componente BotPressChat fuera del cuerpo del documento
        <>
            
            <div className='chat__container'>
                <h1>Contenido de la página</h1> 
                
               
            </div>

            <BotPressChat />
        </>
    );
};
