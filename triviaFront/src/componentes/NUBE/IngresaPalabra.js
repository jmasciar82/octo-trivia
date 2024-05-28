import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const IngresaPalabra = ({ onPalabraIngresada, onFinish }) => {
    const [palabra, setPalabra] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setPalabra(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!palabra.trim()) {
            toast.error('No se ha ingresado una palabra');
            return;
        }
        try {
            const palabraFiltrada = palabra.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ-]/g, '').toUpperCase();
            if (palabraFiltrada === '') {
                toast.error('Palabra no válida');
                return;
            }
            await enviarPalabra(palabraFiltrada);
            onPalabraIngresada(palabraFiltrada);
            toast.success('Palabra enviada correctamente');
            setPalabra('');
            setSubmitted(true); // Marca como enviado para ocultar el input y mostrar el mensaje
            onFinish(); // Llama a la función onFinish después de enviar la palabra
        } catch (error) {
            toast.error('Error al enviar la palabra');
            console.error('Error al enviar la palabra:', error);
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
            {submitted ? (
                <p>Palabra ingresada</p> // Muestra el mensaje después de enviar la palabra
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingresa una palabra"
                            value={palabra}
                            onChange={handleChange}
                        />
                        <button className="btn btn-primary" type="submit">Enviar Palabra</button>
                    </div>
                </form>
            )}
        </div>
    );
};
