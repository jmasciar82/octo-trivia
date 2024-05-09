import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './verPalabraPadre.css'; // Importa el archivo CSS

export const VerPalabraPadre = () => {
    const [palabras, setPalabras] = useState([]);
    const [maxIngresosIndex, setMaxIngresosIndex] = useState(-1);

    useEffect(() => {
        obtenerPalabras();
    }, []);

    const obtenerPalabras = async () => {

        const URL_API = process.env.NODE_ENV === 'production' ?
        `${process.env.REACT_APP_PROD_BACKEND_URL}/verNube` :
        `http://localhost:3000/verNube`;
    
    
        try {
            const response = await axios.get(URL_API);
            // Agrega una propiedad 'randomNumber' con un valor aleatorio entre 0 y 1 a cada palabra
            const palabrasConNumerosAleatorios = response.data.map(palabra => ({
                ...palabra,
                randomNumber: Math.random() // Genera un valor aleatorio entre 0 y 1
            }));

            // Convertir el array de palabras a un diccionario con índices aleatorios
            const palabrasAleatorias = palabrasConNumerosAleatorios.reduce((diccionario, palabra, index) => {
                // Generar un índice aleatorio único para la palabra
                const indiceAleatorio = Math.floor(Math.random() * 1000000);
                diccionario[indiceAleatorio] = palabra;
                return diccionario;
            }, {});

            setPalabras(palabrasAleatorias);

            // Encuentra el índice del elemento con el máximo valor de ingresos
            const maxIndex = Object.values(palabrasAleatorias).reduce((maxIndex, palabra, currentIndex) => {
                return palabra.cantidadIngresos > Object.values(palabrasAleatorias)[maxIndex].cantidadIngresos ? currentIndex : maxIndex;
            }, 0);
            setMaxIngresosIndex(maxIndex);

            console.log('palabras aleatorias:', palabrasAleatorias);
        } catch (error) {
            console.error('Error al obtener las palabras:', error);
        }
    };

    return (
        <div className="palabraContainer">
            {Object.values(palabras).map((item, index) => {
                const maxIngresos = Math.max(...Object.values(palabras).map(item => item.cantidadIngresos));
                let size = Math.min(item.cantidadIngresos * (100 / maxIngresos), 100);

                // Agrega la clase 'vertical' de manera aleatoria
                return (
                    <div
                        key={index}
                        className={`${item.randomNumber < 0.5 ? 'vertical' : ''} palabraItem ${index !== maxIngresosIndex ? `my-${index}` : 'centro horizontal'}`}
                        style={{ fontSize: `calc(${size}vh / 10)`, color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` }}
                    >
                        {item.palabra}
                    </div>
                );
            })}
        </div>
    );
};
