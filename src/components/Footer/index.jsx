import React from 'react';
import { Link } from 'react-router-dom';
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
                        <li><Link to="/informacoes/perguntas-frequentes">Perguntas frequentes</Link></li>
                        <li><Link to="/informacoes/politica-de-envio">Política de envio</Link></li>
                        <li><Link to="/informacoes/politica-de-privacidade">Política de privacidade</Link></li>
                        <li><Link to="/informacoes/politica-de-reembolso">Política de reembolso</Link></li>
                        <li><Link to="/informacoes/politica-de-trocas-e-devolucoes">Política de troca e devoluções</Link></li>
                        <li><Link to="/informacoes/termos-de-servico">Termos de Serviço</Link></li>
                        <li><Link to="/informacoes/termos-legais">Termos legais</Link></li>
                        <li><Link to="/informacoes/politica-de-cookies">Política de cookies</Link></li>
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
