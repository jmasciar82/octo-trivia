// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './HomePage';

import { Index } from './componentes/COMUN/Index.js';
import { Index as Sala1 } from './componentes/Sala1/pregunta1.js';
import { Resultado as R11 } from './componentes/Sala1/resultado1.js';
import { QRGenerator as Qr1 } from './componentes/Sala1/qr.js';

import { IndexNube } from './componentes/COMUN/IndexNube.js';
import { IndexChatBot } from './componentes/COMUN/IndexChatBot.js'

import { PadreComponente } from './componentes/NUBE/PadreComponente.js';
import { VerPalabraPadre } from './componentes/NUBE/verPalabraPadre.js';

import { RutaNoValida } from './componentes/RutaNoValida';




function App() {
  const [showIndex, setShowIndex] = useState(false);

  console.log(showIndex);

  const handleEnterClick = () => {
    setShowIndex(true);
  };

  return (
    <div className="App">
      <div className="container-fluid mt-3">
        <div className="">
          <h1 className='nombre_marca'>Octopus Trivia  <span><img src={require("./img/pngimg.com - octopus_PNG24.png")} alt="" />
          </span></h1>
          <hr />
          <BrowserRouter>
            <Routes>
              <Route path='/index/sala/:salaId/pregunta/:preguntaId' element={<Sala1 titulo="Sala1" />} />
              <Route path='/resultado/sala/:salaId/pregunta/:preguntaId' element={<R11 titulo="R11" />} />

              <Route path='/' element={<HomePage onEnterClick={handleEnterClick} />} />
              <Route path='/index' element={<Index titulo="Index" />} />
              
              <Route path='/indexNube' element={<IndexNube titulo="IndexNube" />} />

              
              <Route path='/palabraEnviada' element={<PadreComponente titulo="PadreComponente" />} />
              <Route path='/verNube' element={<VerPalabraPadre titulo="verPalabraPadre" />} />
              <Route path='/chatBot' element={<IndexChatBot titulo="IndexchatBot" />} />


              <Route path='/sala1_qr1/sala/:salaId/pregunta/:preguntaId' element={<Qr1 titulo="Qr1" />} />
              <Route path='*' element={<RutaNoValida />} />
            </Routes>
          </BrowserRouter>
          <hr />
          <div className="separador"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
