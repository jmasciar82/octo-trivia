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

                const response = await fetch(URL_API, { headers: { 'Accept': 'application/json' } });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error("Error " + response.status + " al llamar al API: " + response.statusText + " - " + errorText);
                }
                const data = await response.json();
                setPreguntasDeSala(data);
            } catch (error) {
                console.error("Error al obtener preguntas de sala:", error);
            } finally {
                setLoading(false); // Desactivar estado de carga
            }
        };

        const fetchPregunta = async () => {
            try {
                const URL_API_PREGUNTA = process.env.NODE_ENV === 'production' ?
                    `${process.env.REACT_APP_PROD_BACKEND_URL}/index/sala/${salaId}/pregunta/${preguntaId}` :
                    `http://localhost:5000/index/sala/${salaId}/pregunta/${preguntaId}`;

                const response = await fetch(URL_API_PREGUNTA, { headers: { 'Accept': 'application/json' } });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error("Error " + response.status + " al llamar al API: " + response.statusText + " - " + errorText);
                }
                const data = await response.json();
                setPregunta(data);
            } catch (error) {
                console.error("Error al obtener la pregunta:", error);
            } finally {
                setLoading(false); // Desactivar estado de carga
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
