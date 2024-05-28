import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PollComponent from '../PollComponent';
import Loader from '../COMUN/Loder';

export const Index = () => {
    const { salaId, preguntaId } = useParams();
    const [preguntasDeSala, setPreguntasDeSala] = useState(null);
    const [pregunta, setPregunta] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const fetchPreguntasDeSala = async () => {
            try {
                const URL_API = process.env.NODE_ENV === 'production' ?
                    `${process.env.REACT_APP_PROD_BACKEND_URL}/palabrasDeSala/sala/${salaId}` :
                    `http://localhost:5000/palabrasDeSala/sala/${salaId}`;

                const response = await fetch(URL_API);
                if (!response.ok) {
                    throw new Error("Error " + response.status + " al llamar al API: " + response.statusText);
                }
                const data = await response.json();
                setPreguntasDeSala(data);
                setLoading(false); // Desactivar estado de carga
            } catch (error) {
                console.error(error);
                setLoading(false); // Desactivar estado de carga incluso en caso de error
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
                setLoading(false); // Desactivar estado de carga
            } catch (error) {
                console.error(error);
                setLoading(false); // Desactivar estado de carga incluso en caso de error
            }
        };

        fetchPreguntasDeSala();
        fetchPregunta();
    }, [salaId, preguntaId]);

    if (loading) {
        return <Loader />; // Mostrar indicador de carga mientras se obtienen los datos
    }

    if (!preguntasDeSala || !pregunta) {
        return <div>Cargando...</div>;
    }

    console.log(`preguntas de sala: ${JSON.stringify(preguntasDeSala)}`);

    return (
        <div className="App">
            <PollComponent pollData={pregunta} preguntasDeSala={preguntasDeSala} info={{ salaId, preguntaId }} />
        </div>
    );
}
