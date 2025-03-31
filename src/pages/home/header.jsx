import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './style.css'; // Certifique-se de que o caminho está correto

function Header() {
    const handleNavClick = (e, section) => {
        // Defina a lógica para a navegação aqui
    };

    return (
        <div className='Header'>
            <div className='Desconto'>
                <p>RECEBA 5% DE DESCONBTO VIA PIX </p>
            </div>
            <div className='BuscaHeader'> {/* Corrigido para 'BuscaHeader' */}
                <div className='Logo'>
                    <img src="" alt="" />
                </div>
                <div className='Pesquisa'>
                    <p>Buscar produtos</p>
                    <div className='Iconpesquisa'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                </div>
                <div className='Iconsbusac'>
                    <FontAwesomeIcon icon={faUser} />
                    <FontAwesomeIcon icon={faShoppingCart} />
                </div>
            </div>
            <nav className="Navbar">
                <a href="#Sneakers" onClick={(e) => handleNavClick(e, "Sneakers")}>Sneakers</a>
                <a href="#Roupas" onClick={(e) => handleNavClick(e, "Roupas")}>Roupas</a>
                <a href="#Conjuntos" onClick={(e) => handleNavClick(e, "Conjuntos")}>Conjuntos</a>
                <a href="#Acessorios" onClick={(e) => handleNavClick(e, "Acessorios")}>Acessorios</a>
                <a href="#Marcas" onClick={(e) => handleNavClick(e, "Marcas")}>Marcas</a>
            </nav>
        </div>
    );
}

export default Header;
