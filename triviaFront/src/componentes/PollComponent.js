import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavBarPreguntas } from '../componentes/COMUN/NavBarPreguntas'; // Asegúrate de que la ruta sea correcta

const backendURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BACKEND_URL : 'http://localhost:3000';

const PollComponent = ({ pollData, preguntasDeSala, info }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentPollData, setCurrentPollData] = useState(null);
    // eslint-disable-next-line
    const [Preguntas, setPreguntasIds] = useState([]);

    useEffect(() => {
        if (pollData && pollData.pregunta) {
            setCurrentPollData(pollData.pregunta);
        }
    }, [pollData]);

    useEffect(() => {
        if (preguntasDeSala && preguntasDeSala.preguntas) {
            const idsPreguntas = preguntasDeSala.preguntas.map(pregunta => pregunta._id);
            setPreguntasIds(idsPreguntas);
        }
    }, [preguntasDeSala]);

    const handleOptionClick = async (optionId) => {
        try {
            console.log('Registrando voto para la opción con ID:', optionId);
            
            const voteResponse = await sendVote(optionId);
            console.log('Voto registrado correctamente:', optionId, voteResponse);

            const updatedPollData = await fetchPollData(info.salaId, info.preguntaId);

            if (!updatedPollData || !updatedPollData.opciones) {
                console.error('Datos actualizados de la encuesta no contienen opciones');
                return;
            }

            setCurrentPollData(updatedPollData);

            const optionIndex = updatedPollData.opciones.findIndex(option => option._id === optionId);
            if (optionIndex === -1) {
                console.error('Opción seleccionada no encontrada en los datos actuales de la encuesta');
                toast.error('Opción seleccionada no encontrada en los datos actuales de la encuesta');
                return;
            }

            const selectedOptionText = updatedPollData.opciones[optionIndex].opcion;
            setSelectedOption(selectedOptionText);

            toast.success(`Usted votó la opción ${String.fromCharCode(65 + optionIndex)}`);
        } catch (error) {
            console.error('Error al enviar el voto:', error);
            toast.error('Error al enviar el voto');
        }
    };

    const sendVote = async (optionId) => {
        const { salaId, preguntaId } = info;

        if (!info) {
            console.error('Error: Info is undefined');
            return;
        }

        try {
            console.log('Enviando voto al backend para sala:', salaId, 'pregunta:', preguntaId, 'opción:', optionId);
            const response = await axios.post(`${backendURL}/index/sala/${salaId}/pregunta/${preguntaId}`, { option: optionId });
            console.log('Respuesta del servidor:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        }
    };

    const fetchPollData = async (salaId, preguntaId) => {
        try {
            const response = await axios.get(`${backendURL}/index/sala/${salaId}/pregunta/${preguntaId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los datos de la encuesta:', error);
            throw error;  // Lanzar el error para que el manejador de errores en handleOptionClick pueda atraparlo
        }
    };

    if (!currentPollData) {
        return <div>Cargando...</div>;
    }

    if (!currentPollData.opciones || !Array.isArray(currentPollData.opciones)) {
        return <div>Error al cargar las opciones de la encuesta.</div>;
    }

    return (
        <div className="poll">
            <ToastContainer />
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
                <div key={index} className={`poll__option ${selectedOption === option.opcion ? "poll__option-selected" : ""}`} onClick={() => handleOptionClick(option._id)}>
                    <div className="poll__option-fill" style={{ backgroundColor: 'transparent' }}>
                        <div className="poll__option-info">
                            <span className="poll__label">{`Opción ${String.fromCharCode(65 + index)}`}</span>
                        </div>
                    </div>
                </div>
            ))}
            {selectedOption && (
                <div className="poll__message">
                    Usted votó la opción: {selectedOption}
                </div>
            )}
            <div className="poll__navigation">
                <NavBarPreguntas salaId={info.salaId} />
            </div>
        </div>
    );
};

export default PollComponent;
