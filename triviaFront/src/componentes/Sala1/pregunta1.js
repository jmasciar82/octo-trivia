import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PollComponent from '../PollComponent';

export const Index = () => {
    const { salaId, preguntaId } = useParams();
    const [pregunta, setPregunta] = useState(null);
    const [info, setInfo] = useState({
        salaId: salaId,
        preguntaId: preguntaId
    });

    useEffect(() => {
        const URL_API = process.env.NODE_ENV === 'production' ?
            `${process.env.REACT_APP_PROD_BACKEND_URL}/index/sala/${info.salaId}/pregunta/${info.preguntaId}` :
            `http://localhost:3000/index/sala/${info.salaId}/pregunta/${info.preguntaId}`;
        
        fetch(URL_API)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error " + response.status + " al llamar al API: " + response.statusText);
            })
            .then(data => setPregunta(data))
            .catch(error => console.error(error));
    }, [info.salaId, info.preguntaId]);

    if (!pregunta) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="App">
            <PollComponent pollData={pregunta} info={info} />
        </div>
    );
}
