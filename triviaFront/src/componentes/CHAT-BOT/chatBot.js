import React from 'react';
import { BotPressChat } from './BotPressChat'; // Importa el componente BotPressChat
import './index.css';

// Define el componente IndexChat
export const IndexChat = () => {
    return (
        <>
            <div className='chat__container'>
                {/* Contenido del componente */}
            </div>
            
            {/* Renderiza BotPressChat solo en este componente */}
            <BotPressChat />
        </>
    );
};

export default IndexChat; // Exporta el componente IndexChat
