import React, { useState, useEffect } from 'react';
import './Index.css';


export default function PollComponent({ pollData }) {
    
    const [currentPollData, setCurrentPollData] = useState(null);
    

    useEffect(() => {
        setCurrentPollData(pollData.pregunta); // Accede directamente a pollData.pregunta
    }, [pollData]);

    

    // Función para cargar los datos del servidor cada 10 segundos
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Realiza la solicitud al servidor para obtener los datos actualizados
            // Actualiza los datos del estado
            setCurrentPollData(pollData.pregunta);
            console.log();
        }, 10000); // 10 segundos

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, [pollData]);

    // Verifica si currentPollData es null antes de intentar acceder a sus propiedades
    if (!currentPollData) {
        return <div>Cargando...</div>;
    }
    const formatTitle = (title) => {
        return title.replace(/\)/g, ')<br>');
    };
   // Generar un array de letras del alfabeto
const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Dentro del componente de React
return (
    <div className="poll">
        <div className="poll__title" dangerouslySetInnerHTML={{ __html: formatTitle(currentPollData.titulo) }}></div>
        {currentPollData.opciones.map((option, index) => {
            // Obtener la letra correspondiente del array de letras
            const letra = letras[index];
            return (
                <div className='poll__letra' key={index}>
                    <span className="poll__label">{option.opcion}</span>
                    <div className={`poll__option ${option.opcion}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                        <div className="poll__option-fill">
                            <div className="poll__option-info" style={{ position: 'relative', zIndex: 2 }}>
                                <span>Opción {letra}</span>
                                <span className="poll__votes">{option.porcentajeVotos} %</span>
                            </div>
                        </div>
                        {/* Barra con fondo transparente que crece con el porcentaje */}
                        <div className="poll__option-bar" style={{ position: 'absolute', top: '50%', left: 0, width: `${option.porcentajeVotos}%`, height: '50%', backgroundColor: 'rgba(3, 198, 252)', zIndex: 1, transform: 'translateY(-50%)' }}></div>
                    </div>

                    
                    
                </div>
            );
        })}
    </div>
);

    }

   