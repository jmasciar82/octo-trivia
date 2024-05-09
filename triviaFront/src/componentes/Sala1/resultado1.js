import React, { useState, useEffect } from 'react';
import ResultadoComponent from '../ResultadoComponent'; // Asegúrate de importar el componente ResultadoComponent

export const Resultado = () => {
    const { salaId, preguntaId } = useParams();
    const [pregunta, setPregunta] = useState(null);
    
    console.log(setInfo);
    const URL_API = process.env.NODE_ENV === 'production' ?
        `${process.env.REACT_APP_PROD_BACKEND_URL}/index/sala/${info.salaId}/pregunta/${info.preguntaId}` :
        `http://localhost:3000/index/sala/${info.salaId}/pregunta/${info.preguntaId}`;
    
    console.log('URL_API', URL_API);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL_API);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del servidor');
                }
                const data = await response.json();
                setPregunta(data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();

        // Establecer la actualización cada segundo usando setInterval
        const intervalId = setInterval(fetchData, 1000);

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, [URL_API, info.salaId, info.preguntaId]);

    if (!pregunta) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="App">
            {/* Pasamos la pregunta y sus opciones como prop 'pollData' al componente ResultadoComponent */}
            <ResultadoComponent pollData={pregunta} />
        </div>
    );
};
