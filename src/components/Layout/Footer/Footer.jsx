import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3 className="footer__title">OnlyWave Store</h3>
          <p className="footer__description">
            Sua loja online de confiança para produtos de qualidade.
          </p>
          <div className="footer__social">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
            >
              Twitter
            </a>
          </div>
        </div>

        <div className="footer__section">
          <h3 className="footer__title">Links Úteis</h3>
          <nav className="footer__nav">
            <Link to="/sobre" className="footer__nav-link">
              Sobre Nós
            </Link>
            <Link to="/contato" className="footer__nav-link">
              Contato
            </Link>
            <Link to="/termos" className="footer__nav-link">
              Termos de Uso
            </Link>
            <Link to="/privacidade" className="footer__nav-link">
              Política de Privacidade
            </Link>
          </nav>
        </div>

        <div className="footer__section">
          <h3 className="footer__title">Categorias</h3>
          <nav className="footer__nav">
            <Link to="/categorias/eletronicos" className="footer__nav-link">
              Eletrônicos
            </Link>
            <Link to="/categorias/roupas" className="footer__nav-link">
              Roupas
            </Link>
            <Link to="/categorias/acessorios" className="footer__nav-link">
              Acessórios
            </Link>
            <Link to="/categorias/casa" className="footer__nav-link">
              Casa
            </Link>
          </nav>
        </div>

        <div className="footer__section">
          <h3 className="footer__title">Contato</h3>
          <address className="footer__contact">
            <p>Email: contato@onlywave.com</p>
            <p>Telefone: (11) 1234-5678</p>
            <p>Endereço: Rua Example, 123</p>
            <p>São Paulo - SP</p>
          </address>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__container">
          <p className="footer__copyright">
            © {new Date().getFullYear()} OnlyWave Store. Todos os direitos reservados.
          </p>
          <div className="footer__payment">
            <span className="footer__payment-text">Formas de Pagamento:</span>
            <div className="footer__payment-icons">
              💳 🏦 📱
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 