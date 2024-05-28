import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './verPalabraPadre.css'; // Importa el archivo CSS

export const VerPalabraPadre = () => {
    const [palabras, setPalabras] = useState([]);
    const [maxIngresosIndex, setMaxIngresosIndex] = useState(-1);






    const obtenerPalabras = async () => {
        const URL_API = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_PROD_BACKEND_URL}/verNube` : `http://localhost:3000/verNube`;

        try {
            const response = await axios.get(URL_API);
            const palabrasConNumerosAleatorios = response.data.map(palabra => ({
                ...palabra,
                randomNumber: Math.random()
            }));

            const palabrasAleatorias = palabrasConNumerosAleatorios.reduce((diccionario, palabra, index) => {
                const indiceAleatorio = Math.floor(Math.random() * 1000000);
                diccionario[indiceAleatorio] = palabra;
                return diccionario;
            }, {});

            setPalabras(palabrasAleatorias);

            const maxIndex = Object.values(palabrasAleatorias).reduce((maxIndex, palabra, currentIndex) => {
                return palabra.cantidadIngresos > Object.values(palabrasAleatorias)[maxIndex].cantidadIngresos ? currentIndex : maxIndex;
            }, 0);
            setMaxIngresosIndex(maxIndex);
        } catch (error) {
            console.error('Error al obtener las palabras:', error);
        }
    };

    

    useEffect( () =>  {
        obtenerPalabras();
        const intervalId = setInterval(() => {
            obtenerPalabras();
        }, 40000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="palabraContainer">
            {Object.values(palabras).map((item, index) => {
                const maxIngresos = Math.max(...Object.values(palabras).map(item => item.cantidadIngresos));
                let size = Math.min(item.cantidadIngresos * (100 / maxIngresos), 100);

                return (
                    <div key={index}>
                        <div
                            className={`${item.randomNumber < 0.5 ? 'vertical' : ''} palabraItem ${index !== maxIngresosIndex ? `my-${index}` : 'centro horizontal'}`}
                            style={{ fontSize: `calc(${size}vh / 10)`, color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` }}
                        >
                            {item.palabra}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
