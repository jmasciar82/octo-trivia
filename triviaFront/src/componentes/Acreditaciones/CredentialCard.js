import React, { forwardRef } from 'react';
import './CredentialCard.css'


const CredentialCard = forwardRef(({ user }, ref) => {
  const getColorByTipo = (tipo) => {
    switch (tipo) {
      case 1: return 'green';
      case 2: return 'blue';
      case 3: return 'purple';
      case 4: return 'yellow';
      case 5: return 'orange';
      case 6: return 'purple';
      case 7: return 'pink';
      case 8: return 'brown';
      case 9: return 'grey';
      case 10: return 'black';
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
      <h2>Credencial de Usuario</h2>
      <p><strong>Nombre:</strong><br></br> {user.name.toUpperCase()}</p>
      <p><strong>Email:</strong><br></br> {user.email}</p>
      <p><strong>Código:</strong> {user.code}</p>
      <p><strong>Tipo:</strong> {user.tipo}</p>
      <img src={user.qrCode} alt="Código QR" />
    </div>
  );
});

export default CredentialCard;
