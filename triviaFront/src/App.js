import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './HomePage';
import { Index } from './componentes/COMUN/Index';
import { Index as Sala1 } from './componentes/Sala1/Pregunta1';
import { Resultado as R11 } from './componentes/Sala1/Resultado1';
import { QRGenerator as Qr1 } from './componentes/Sala1/Qr';

import { IndexNube } from './componentes/COMUN/IndexNube';
import { IndexChatBot } from './componentes/COMUN/IndexChatBot';
import { IndexChat } from './componentes/CHAT-BOT/ChatBot';

import { PadreComponente } from './componentes/NUBE/PadreComponente';
import { VerPalabraPadre } from './componentes/NUBE/VerPalabraPadre';

import PollComponent from './componentes/PollComponent';

import Admin from './componentes/Crud/votacion/Admin';
import PreguntaList from './componentes/Crud/votacion/PreguntaList';
import SalaList from './componentes/Crud/votacion/SalaList';


import UsersAcreditaciones from './componentes/Acreditaciones/UsersAcreditaciones';
import Login from './componentes/Acreditaciones/Login';
import QRScanner from './componentes/Acreditaciones/QRScanner';

import { NavBarPreguntas } from './componentes/COMUN/NavBarPreguntas';

import { RutaNoValida } from './componentes/RutaNoValida';

function App() {
  return (
    <div className="App">
      <div className="container-fluid mt-3">
        <div>
          <h1 className='nombre_marca'>KraKen Trivia 2.0
            <span><img src={require("./assets/imgbin_kraken-rum-logo-octopus-png.png")} alt="KraKen Logo" /></span>
          </h1>
          <hr />
          <BrowserRouter>
            <Routes>
              <Route path='/sala_qr/sala/:salaId/pregunta/:preguntaId' element={<Qr1 titulo="Qr1" />} />
              <Route path='/index/sala/:salaId/pregunta/:preguntaId' element={<Sala1 titulo="Sala1" />} />
              <Route path="/index/sala/:salaId" element={<NavBarPreguntas />} />
              <Route path='/resultado/sala/:salaId/pregunta/:preguntaId' element={<R11 titulo="R11" />} />
              <Route path='/' element={<HomePage />} />
              <Route path='/index' element={<Index titulo="Index" />} />
              <Route path='/indexNube' element={<IndexNube titulo="IndexNube" />} />
              <Route path='/palabraEnviada' element={<PadreComponente titulo="PadreComponente" />} />
              <Route path='/verNube' element={<VerPalabraPadre titulo="VerPalabraPadre" />} />
              <Route path='/chatBot' element={<IndexChatBot titulo="IndexChatBot" />} />
              <Route path='/chat' element={<IndexChat titulo="IndexChat" />} />
              <Route path="/admin/index/sala/:salaId/pregunta/:preguntaId" element={<PollComponent titulo="PollComponent" />} />
              <Route path="/admin/preguntas" element={<PreguntaList titulo="PreguntaList" />} />
              <Route path="/admin/salas" element={<SalaList titulo="SalaList" />} />
              <Route path="/admin" element={<Admin titulo="Admin" />} />
              <Route path="admin/users/acreditaciones" element={<UsersAcreditaciones titulo="UsersAcreditaciones" />} />
              <Route path="/login" element={<Login titulo="Login" />} />
              
              <Route path="/qrscanner" element={<QRScanner />} />
              <Route path='*' element={<RutaNoValida />} />
            </Routes>
          </BrowserRouter>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default App;
