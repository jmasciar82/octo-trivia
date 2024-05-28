// client/src/componentes/Acreditaciones/CredentialCard.js

import React, { forwardRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CredentialCard.css';
import logo from '../../assets/imgbin_kraken-rum-logo-octopus-png.png';  // Asegúrate de usar la ruta correcta al logo

const CredentialCard = forwardRef(({ user }, ref) => {
  return (
    <div ref={ref} className="credential-card">
      <img src={logo} alt="Logo" className="credential-logo" />
      <h2 className="credential-title">Credencial de Usuario</h2>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Código:</strong> {user.code}</p>
      {user.qrCode && <img src={user.qrCode} alt="Código QR" className="qr-code" />}
    </div>
  );
});

export default CredentialCard;
