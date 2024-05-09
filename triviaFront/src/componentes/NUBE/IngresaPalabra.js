import React, { useState } from 'react';
import axios from 'axios';
import '../Index.css'; // Si tienes estilos personalizados

export const IngresaPalabra = ({ onPalabraIngresada }) => {
    const [palabras, setPalabras] = useState('');

    const handleChange = (e) => {
        setPalabras(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Verifica si las palabras están vacías antes de enviarlas al backend
        if (!palabras.trim()) {
            console.error('No se han ingresado palabras');
            return;
        }
        try {
            // Divide las palabras ingresadas por espacios
            const palabrasArray = palabras.split(' ').map(palabra => palabra.trim().toUpperCase());

            // Filtra las palabras para quitar símbolos y números
            const palabrasFiltradas = palabrasArray.map(palabra => palabra.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ-]/g, ''));

            // Elimina palabras vacías del array resultante
            const palabrasValidas = palabrasFiltradas.filter(palabra => palabra !== '');
            // Envía cada palabra válida al backend
            await Promise.all(palabrasValidas.map(enviarPalabra));
            palabrasValidas.forEach(palabra => onPalabraIngresada(palabra)); // Llama a la función proporcionada por el padre para cada palabra
            console.log('Palabras enviadas correctamente:', palabrasValidas);
            // Limpiar el campo de entrada después de enviar las palabras
            setPalabras('');
        } catch (error) {
            console.error('Error al enviar las palabras:', error);
        }
    };

    const enviarPalabra = async (palabra) => {

        const URL_API = process.env.NODE_ENV === 'production' ?
        `${process.env.REACT_APP_PROD_BACKEND_URL}/palabraEnviada` :
        `http://localhost:3000/palabraEnviada`;
        
        await axios.post(URL_API, { palabra });
    };

    return (
        <div className="ingresaPalabra">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingresa palabras separadas por espacios"
                        value={palabras}
                        onChange={handleChange}
                    />
                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        Enviar Palabras
                    </button>
                </div>
            </form>
        </div>
    );
};
