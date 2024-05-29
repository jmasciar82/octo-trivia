// client/src/componentes/COMUN/Index.js

import React from 'react';
import { createRoot } from 'react-dom/client';  // Importa createRoot
import App from './App';  // Ajusta la ruta si es necesario
import './index.css';  // Ajusta la ruta si es necesario

const container = document.getElementById('root');  // Obtén el contenedor
const root = createRoot(container);  // Crea la raíz

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
