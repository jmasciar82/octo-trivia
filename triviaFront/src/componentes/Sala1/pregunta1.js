import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PollComponent from '../PollComponent';


export const Index = () => {
    const { salaId, preguntaId } = useParams();
    const [preguntasDeSala, setPreguntasDeSala] = useState(null);
    const [pregunta, setPregunta] = useState(null);
    // eslint-disable-next-line
    const [info, setInfo] = useState({ salaId: salaId, preguntaId: preguntaId });

    useEffect(() => {
        const fetchPreguntasDeSala = async () => {
            try {
                const URL_API = process.env.NODE_ENV === 'production' ?
                    `${process.env.REACT_APP_PROD_BACKEND_URL}/palabrasDeSala/sala/${salaId}` :
                    `http://localhost:3000/palabrasDeSala/sala/${salaId}`;
                
                const response = await fetch(URL_API);
                if (!response.ok) {
                    throw new Error("Error " + response.status + " al llamar al API: " + response.statusText);
                }
                const data = await response.json();
                setPreguntasDeSala(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchPregunta = async () => {
            try {
                const URL_API_PREGUNTA = process.env.NODE_ENV === 'production' ?
                    `${process.env.REACT_APP_PROD_BACKEND_URL}/index/sala/${salaId}/pregunta/${preguntaId}` :
                    `http://localhost:3000/index/sala/${salaId}/pregunta/${preguntaId}`;
                
                const response = await fetch(URL_API_PREGUNTA);
                if (!response.ok) {
                    throw new Error("Error " + response.status + " al llamar al API: " + response.statusText);
                }
                const data = await response.json();
                setPregunta(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPreguntasDeSala();
        fetchPregunta();
    }, [salaId, preguntaId]);

    if (!preguntasDeSala || !pregunta) {
        return <div>Cargando...</div>;
    }

    console.log(`preguntas de sala: ${JSON.stringify(preguntasDeSala)}`);

    return (
        <div className="App">
            
            <PollComponent pollData={pregunta} preguntasDeSala={preguntasDeSala} info={info} />
        </div>
    );
}
