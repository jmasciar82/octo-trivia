import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PollComponent({ pollData, info }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentPollData, setCurrentPollData] = useState(null);

    useEffect(() => {
        setCurrentPollData(pollData.pregunta);
    }, [pollData]);

    const handleOptionClick = async (optionId) => {
        if (!selectedOption) {
            try {
                setSelectedOption(optionId);
                await sendVote(optionId);
                console.log('Voto registrado correctamente', optionId);
            } catch (error) {
                console.error('Error al enviar el voto:', error);
            }
        }
    };

    const sendVote = async (optionId) => {
        const { salaId, preguntaId } = info;

        if (!info) {
        console.error('Error: Info is undefined');
        return;
    }

        // Determinar la URL del backend según el entorno
        const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:3000';

        try {
            const response = await axios.post(`${backendURL}/index/sala/${salaId}/pregunta/${preguntaId}`, { option: optionId });
            console.log(response.data, 'prueba', optionId);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    if (!currentPollData) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="poll">
            <div className="poll__title">{currentPollData.titulo}</div>
            <div className="ol__container">
                <ol className='ol'>
                    {currentPollData.opciones.map((option, index) => (
                        <li key={option._id}>
                            {option.opcion}
                        </li>
                    ))}
                </ol>
            </div>
            {currentPollData.opciones.map((option, index) => (
                <div key={index} className={`poll__option ${selectedOption === option._id ? "poll__option-selected" : ""}`} onClick={() => handleOptionClick(option._id)}>
                    <div className="poll__option-fill" style={{ backgroundColor: 'transparent' }}>
                        <div className="poll__option-info">
                            <span className="poll__label">{`Opción  ${String.fromCharCode(65 + index)}`}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
