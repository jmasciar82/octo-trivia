// Footer.js

import React from 'react';
import './Footer.css'; //    Importa el archivo de estilos CSS
import FacebookLogo from '../../img/317727_facebook_social media_social_icon.png'; // Reemplaza con la ruta correcta a tu logo de Facebook
import InstagramLogo from '../../img/1298747_instagram_brand_logo_social media_icon.png'; // Reemplaza con la ruta correcta a tu logo de Twitter
import TwitterLogo from '../../img/11053969_x_logo_twitter_new_brand_icon.png'; // Reemplaza con la ruta correcta a tu logo de Instagram

const Footer = () => {
    return (
        <footer className="footer-container bg-dark">
            <div className="contact-links">
                <h3>Contacto</h3>
                <ul>
                    <li><a href="mailto:info@example.com">Correo Electrónico</a></li>
                    <li><a href="tel:+123456789">Teléfono</a></li>
                </ul>
            </div>
            <div className="social-links">
                <h3>Redes Sociales</h3>
                <ul>
                    <li><a href="https://www.facebook.com/"><img src={FacebookLogo} alt="Facebook" /></a></li>
                    <li><a href="https://twitter.com/"><img src={TwitterLogo} alt="Twitter" /></a></li>
                    <li><a href="https://www.instagram.com/"><img src={InstagramLogo} alt="Instagram" /></a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
