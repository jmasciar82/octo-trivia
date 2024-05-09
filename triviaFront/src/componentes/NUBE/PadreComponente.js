import React, { useState } from 'react';
import { IngresaPalabra } from './IngresaPalabra.js'

export const PadreComponente = () => {
    // Definir el estado para almacenar la palabra ingresada
    const [palabraIngresada, setPalabraIngresada] = useState('');

    // Función para manejar la palabra ingresada
    const handlePalabraIngresada = (palabra) => {
        setPalabraIngresada(palabra);
    };

    return (
        <div>
            
            <IngresaPalabra onPalabraIngresada={handlePalabraIngresada} />
            <p>Palabra ingresada: {palabraIngresada}</p>
        </div>
    );
};


