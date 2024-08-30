import React, { forwardRef } from 'react';
import './CredentialCard.css'

const CredentialCard = forwardRef(({ user }, ref) => {
  const getColorByTipo = (tipo) => {
    switch (tipo) {
      case 'Química Montpellier': return 'green';
      case 'Nutricia': return 'blue';
      case 'Bioprofarma-Bagó': return 'purple';
      case 'Synthon Bagó': return 'yellow';
      case 'Sinergium Biotech': return 'orange';
      case 'Biogénesis-Bagó': return 'purple';
      case 'Intercom': return 'pink';
      case 'Novofarma': return 'brown';
      case 'Disprofarma': return 'grey';
      case 'Laboratorios Bagó Brasil': return 'black';
      default: return 'white';
    }
  };

  const backgroundColor = getColorByTipo(user.tipo);

  return (
    <div 
      ref={ref} 
      style={{ 
        border: `10px solid ${backgroundColor}`, 
        padding: '20px', 
        width: '300px', 
        textAlign: 'center',
      }}
    >
      <h2>BAGO 2024<hr></hr></h2>
      <p><strong>Nombre:</strong><br></br> {user.name}</p>
      <p><strong>Email:</strong><br></br> {user.email}</p>
      <p><strong>Código:</strong> {user.code}</p>
      <p><strong>Empresa:</strong> {user.tipo}</p>
      <img src={user.qrCode} alt="Código QR" style={{ width: '150px' }} />
    </div>
  );
});

export default CredentialCard;
