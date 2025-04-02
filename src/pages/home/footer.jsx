import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faTiktok, faInstagram, } from "@fortawesome/free-brands-svg-icons"; // Importando do pacote correto
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"; // Corrigido para importar do pacote correto
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return (
        <footer>
            <div className='container-footer'>
                <div className='informacoes'>
                    <h4>Informações</h4>
                    <ul>
                        <li><a href="">Perguntas frequentes</a></li>
                        <li><a href="">Política de envio</a></li>
                        <li><a href="">Política de privacidade</a></li>
                        <li><a href="">Política de reembolso</a></li>
                        <li><a href="">Política de troca e devoluções</a></li>
                        <li><a href="">Termos de Serviço</a></li>
                        <li><a href="">Termos legais</a></li>
                        <li><a href="">Política de cookies</a></li>
                    </ul>
                </div>
                <div className='atendimento'>
                    <div className='whats'>
                        <FontAwesomeIcon icon={faWhatsapp} className="whast-icon" />
                        <h3>35 997361138</h3>
                    </div>
                    <div className='email'>
                        <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
                        <a href="mailto:onlywavestore@gmail.com">onlywavestore@gmail.com</a>
                    </div>
                    <div className='social-icons'>
                        <a href=""><FontAwesomeIcon icon={faTiktok} className='tik-icon' /></a>
                        <a href=""><FontAwesomeIcon icon={faInstagram} className='insta-icon' /></a>
                    </div>
                </div>
                <div className="formas-pagamento">
                    Imagens formas de pagamento
                    Loja protegida
                </div>
            </div>
        </footer>
    );
}

export default Footer;
