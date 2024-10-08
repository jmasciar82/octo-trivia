// /frontend/src/App.js

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Autoservicio from './componentes/Acreditaciones/AcreditacionAutoServicio';
import HomePage from './HomePage';
import { Index } from './componentes/COMUN/Index';
import { Index as Sala1 } from './componentes/Sala1/pregunta1';
import { Resultado as R11 } from './componentes/Sala1/resultado1';
import { QRGenerator as Qr1 } from './componentes/Sala1/qr';
import { IndexNube } from './componentes/COMUN/IndexNube';
import { PadreComponente } from './componentes/NUBE/PadreComponente';
import { VerPalabraPadre } from './componentes/NUBE/verPalabraPadre';
import PollComponent from './componentes/PollComponent';
import Admin from './componentes/Crud/votacion/Admin';
import PreguntaList from './componentes/Crud/votacion/PreguntaList';
import SalaList from './componentes/Crud/votacion/SalaList';
import UsersAcreditaciones from './componentes/Acreditaciones/UsersAcreditaciones';
import Login from './componentes/Acreditaciones/Login';
import LoginHome from './componentes/Acreditaciones/LoginHome';
import ReceptoresHome from './componentes/Acreditaciones/ReceptoresHome';
import { NavBarPreguntas } from './componentes/COMUN/NavBarPreguntas';
import { RutaNoValida } from './componentes/RutaNoValida';
import QRScanner from './componentes/Acreditaciones/QRScanner';
import EquipmentCheckout from './componentes/Equipos/EquipmentCheckout'; // Importa el nuevo componente
import EquipmentReturn from './componentes/Equipos/EquipmentReturn';

import LoginAdminForm from './componentes/Admin/LoginForm';
import RegisterAdminForm from './componentes/Admin/RegisterForm';

import FileManager from './componentes/Manager/FileManager';
import FileUpload from './componentes/Manager/FileUpload';
import FilterFile from './componentes/Manager/FilterFile';
import ListaReceptores from './componentes/Equipos/ListaReceptores';



function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };



  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className='container1' >
      <div className="container-fluid mt-3">

        <div className="logo-container">

        </div>

        <div>

          <BrowserRouter>

            <Routes>
              <Route path="/" element={<Navigate to="/registro" />} />
              <Route path="/loginAdmin" element={<LoginAdminForm onLogin={handleLogin} titulo="LoginAdminForm" />} />
              <Route path="/registerAdmin" element={<ProtectedRoute token={token} element={<RegisterAdminForm onRegister={handleLogin} />} />} />

              <Route path='/sala_qr/sala/:salaId/pregunta/:preguntaId' element={<Qr1 titulo="Qr1" />} />
              <Route path='/index/sala/:salaId/pregunta/:preguntaId' element={<Sala1 titulo="Sala1" />} />
              <Route path="/index/sala/:salaId" element={<NavBarPreguntas />} />
              <Route path='/resultado/sala/:salaId/pregunta/:preguntaId' element={<R11 titulo="R11" />} />
              <Route path='/registro' element={<Autoservicio />} />
              <Route path='/sistema' element={<HomePage />} />
              <Route path='/index' element={<Index titulo="Index" />} />
              <Route path='/indexNube' element={<IndexNube titulo="IndexNube" />} />
              <Route path='/palabraEnviada' element={<PadreComponente titulo="PadreComponente" />} />
              <Route path='/verNube' element={<VerPalabraPadre titulo="VerPalabraPadre" />} />

              <Route path="/admin/index/sala/:salaId/pregunta/:preguntaId" element={<ProtectedRoute token={token} element={<PollComponent titulo="PollComponent" />} />} />
              <Route path="admin/users/acreditaciones" element={<ProtectedRoute token={token} element={<UsersAcreditaciones titulo="UsersAcreditaciones" />} />} />
              <Route path="/admin/preguntas" element={<ProtectedRoute token={token} element={<PreguntaList titulo="PreguntaList" />} />} />
              <Route path="/admin/salas" element={<ProtectedRoute token={token} element={<SalaList titulo="SalaList" />} />} />
              <Route path="/admin" element={<ProtectedRoute token={token} element={<Admin titulo="Admin" />} />} />

              <Route path="/fileManager" element={<FileManager titulo="FileManager" />} />
              <Route path="/fileUpload" element={<FileUpload titulo="FileUpload" />} />
              <Route path="/filterFile" element={<FilterFile titulo="FilterFile" />} />

              <Route path="/loginHome" element={<LoginHome titulo="LoginHome" />} />
              <Route path="/receptoresHome" element={<ReceptoresHome titulo="ReceptoresHome" />} />
              <Route path="/login" element={<Login titulo="Login" />} />
              <Route path="/qrscanner" element={<QRScanner titulo="QRScanner" />} />
              <Route path="/equipment-checkout" element={<EquipmentCheckout titulo="EquipmentCheckout" />} />
              <Route path="/return" element={<EquipmentReturn />} />
              <Route path="/lista-receptores" element={<ListaReceptores />} />


              <Route path='*' element={<RutaNoValida />} />
            </Routes>
          </BrowserRouter>

        </div>
      </div>
    </div>
  );
}

const ProtectedRoute = ({ token, element }) => {
  return token ? element : <Navigate to="/loginAdmin" />;
};

export default App;
