// Footer.js

import React from 'react';
import './Social.css'; //    Importa el archivo de estilos CSS
import FacebookLogo from '../../assets/redes/facebook.png';
import InstagramLogo from '../../assets/redes/instagram.png';
import Youtube from '../../assets/redes/youtube.png';
/* import TwitterLogo from '../../assets/redes/twitter.png'; */
import Bago_mas from '../../assets/redes/bago_mas.png';

const Social = () => {
    return (
        <div>
         {/*    <div className="contact-links">
                <h3>Contacto</h3>
                <ul>
                    <li><a href="mailto:info@example.com">Correo Electrónico</a></li>
                    <li><a href="tel:+123456789">Teléfono</a></li>
                </ul>
            </div> */}
            <div className="social-links">
                {/* <h3>Redes Sociales</h3> */}
                <ul>
                    <li><a href="https://www.facebook.com/Bagomas.ar/"><img src={FacebookLogo} alt="Facebook" /></a></li>
                    {/* <li><a href="https://twitter.com/"><img src={TwitterLogo} alt="Twitter" /></a></li> */}
                    <li><a href="https://www.instagram.com/bagomas.ar"><img src={InstagramLogo} alt="Instagram" /></a></li>
                    <li><a href="https://www.youtube.com/channel/UCBGf-MMU-a5vito8i0c_Yxw"><img src={Youtube} alt="Youtube" /></a></li>
                    <li><a id='bago-link' href="https://bagomas.com.ar/"><img src={Bago_mas} alt="Bago Mas"/></a></li>
                </ul>
            </div>
        </div>
    );
};

export default Social;