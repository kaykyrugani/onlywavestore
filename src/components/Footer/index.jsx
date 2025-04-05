import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faTiktok, faInstagram, } from "@fortawesome/free-brands-svg-icons"; // Importando do pacote correto
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"; // Corrigido para importar do pacote correto
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import styles from './Footer.module.css'; // Corrigido para o caminho correto do CSS

function Footer() {
    return (
        <footer>
            <div className={styles.containerfooter}>
                <div className={styles.informacoes}>
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
                <div className={styles.atendimento}>
                    <div className={styles.whats}>
                        <FontAwesomeIcon icon={faWhatsapp} className={styles.whasticon} />
                        <h3>35 997361138</h3>
                    </div>
                    <div className={styles.email}>
                        <FontAwesomeIcon icon={faEnvelope} className={styles.emailicon} />
                        <a href="mailto:onlywavestore@gmail.com">onlywavestore@gmail.com</a>
                    </div>
                    <div className={styles.socialicons}>
                        <a href=""><FontAwesomeIcon icon={faTiktok} className={styles.tiktokicon} /></a>
                        <a href=""><FontAwesomeIcon icon={faInstagram} className={styles.instaicon} /></a>
                    </div>
                </div>
                <div className={styles.formaspagamento}>
                    Imagens formas de pagamento
                    Loja protegida
                </div>
            </div>
        </footer>
    );
}

export default Footer;
