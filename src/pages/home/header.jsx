import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import { tenis, camisetas, acessorios } from './produtoscards';
import SearchBar from '../../components/SearchBar/SearchBar';

// Configuração necessária para acessibilidade do React Modal
Modal.setAppElement('#root');

// Exportar menuItems para ser usado em outros componentes
export const menuItems = [
    {
        id: 'sneakers',
        label: 'Sneakers',
        items: tenis.map(item => ({ id: item.id, name: item.nome })),
    },
    {
        id: 'roupas',
        label: 'Roupas',
        items: camisetas.map(item => ({ id: item.id, name: item.nome })),
    },
    {
        id: 'conjuntos',
        label: 'Conjuntos',
        items: [], // Sem itens por enquanto
    },
    {
        id: 'acessorios',
        label: 'Acessorios',
        items: acessorios.map(item => ({ id: item.id, name: item.nome })),
    },
    {
        id: 'marcas',
        label: 'Marcas',
        items: [
            { id: 'nike', name: 'Nike' },
            { id: 'adidas', name: 'Adidas' },
            { id: 'puma', name: 'Puma' },
            { id: 'reebok', name: 'Reebok' },
            { id: 'newbalance', name: 'New Balance' },
        ],
    },
];

function Header() {
    // Estado para controlar a abertura/fechamento do carrinho
    const [isCartOpen, setIsCartOpen] = useState(false);
    // Estado para armazenar os itens do carrinho
    const [cartItems, setCartItems] = useState([]);
    // Estado para controlar a abertura/fechamento do modal de confirmação
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Estado para controlar qual menu está ativo
    const [activeMenu, setActiveMenu] = useState(null);
    // Ref para controlar o timeout do debounce
    const debounceRef = useRef(null);
    // Ref para o elemento do menu ativo
    const menuRef = useRef(null);

    // Função para lidar com o hover no item do menu
    const handleMenuHover = (menuId) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        setActiveMenu(menuId);
    };

    // Função para lidar com o mouse saindo do item do menu
    const handleMenuLeave = () => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 400); // Debounce de 400ms
    };

    // Efeito para lidar com cliques fora do menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNavClick = (e, section) => {
        e.preventDefault();
        // Defina a lógica para a navegação aqui
    };

    // Função para abrir o carrinho
    const openCart = () => {
        setIsCartOpen(true);
    };

    // Função para fechar o carrinho
    const closeCart = () => {
        setIsCartOpen(false);
    };

    // Função para atualizar a quantidade de um item no carrinho
    // Se a quantidade for 0, remove o item do carrinho
    const updateCartItem = (itemId, newQuantity) => {
        if (newQuantity === 0) {
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } else {
            setCartItems(cartItems.map(item => 
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    // Função para limpar todos os itens do carrinho
    const clearCart = () => {
        setCartItems([]);
        setIsModalOpen(false);
    };

    // Função para abrir o modal de confirmação antes de limpar o carrinho
    const handleClearCart = () => {
        setIsModalOpen(true);
    };

    // Função para fechar o modal de confirmação
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Cálculo do total de itens no carrinho
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    // Cálculo do subtotal do carrinho
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className='Header'>
            <div className='Desconto'>
                <p>RECEBA 5% DE DESCONBTO VIA PIX </p>
            </div>
            <div className='BuscaHeader'>
                <div className='Logo'>
                    <img src="" alt="" />
                </div>
                {/* Substituir a div Pesquisa pelo componente SearchBar */}
                <SearchBar />
                <div className='Iconsbusac'>
                    <FontAwesomeIcon icon={faUser} />
                    {/* Adicionando evento de clique ao ícone do carrinho */}
                    <div className="cart-icon-wrapper">
                        <FontAwesomeIcon 
                            icon={faShoppingCart} 
                            onClick={openCart}
                            className="cart-icon"
                        />
                        <span className="cart-count">{totalItems}</span>
                    </div>
                </div>
            </div>
            <nav className="Navbar" ref={menuRef}>
                {menuItems.map((item) => (
                    <div 
                        key={item.id} 
                        className={`nav-item-container ${activeMenu === item.id ? "active" : ""}`}
                        onMouseEnter={() => handleMenuHover(item.id)}
                        onMouseLeave={handleMenuLeave}
                    >
                        <a 
                            href={`#${item.id}`} 
                            onClick={(e) => handleNavClick(e, item.id)}
                            className={activeMenu === item.id ? "active-nav-item" : ""}
                        >
                            {item.label}
                        </a>
                        
                        <div className="tooltip-arrow"></div>
                        
                        <AnimatePresence>
                            {activeMenu === item.id && item.items.length > 0 && (
                                <motion.div 
                                    className="dropdown-menu"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    <div className="dropdown-content">
                                        <motion.div 
                                            className="see-all-link"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <a href={`#ver-todos-${item.id}`}>
                                                Ver todos os produtos
                                            </a>
                                        </motion.div>
                                        <div className="dropdown-items">
                                            {item.items.map((subItem, index) => (
                                                <motion.div 
                                                    key={subItem.id}
                                                    className="dropdown-item"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ 
                                                        delay: 0.5 + (index * 0.1),
                                                        duration: 0.5
                                                    }}
                                                    whileHover={{ 
                                                        scale: 1.2,
                                                        textDecoration: 'underline',
                                                        transition: { duration: 0.7 }
                                                    }}
                                                >
                                                    <a href={`#${item.id}-${subItem.id}`}>
                                                        {subItem.name}
                                                    </a>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </nav>

            {/* Componente do Carrinho de Compras */}
            {/* AnimatePresence permite animar a saída de componentes */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        {/* Overlay escuro que cobre a tela quando o carrinho está aberto */}
                        <motion.div 
                            className="cart-overlay"
                            initial={{ opacity: 0 }} // Estado inicial da animação
                            animate={{ opacity: 0.8 }} // Estado final da animação
                            exit={{ opacity: 0 }} // Estado ao sair/fechar
                            transition={{ duration: 1.2, ease: "easeOut" }} // Configuração da transição
                            onClick={closeCart} // Fecha o carrinho ao clicar no overlay
                        />
                        
                        {/* Container principal do carrinho - modificado para aparecer do lado direito */}
                        <motion.div 
                            className="cart-container"
                            initial={{ x: 700 }} // Inicia fora da tela (direita)
                            animate={{ x: 0 }} // Anima para a posição visível
                            exit={{ x: 700 }} // Sai para fora da tela ao fechar (direita)
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            {/* Cabeçalho do carrinho */}
                            <div className="cart-header">
                                <h2>Seu carrinho</h2>
                                <button className="close-button" onClick={closeCart}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>

                            {/* Conteúdo condicional: exibe mensagem de vazio ou os itens */}
                            {cartItems.length === 0 ? (
                                // Exibido quando o carrinho está vazio
                                <div className="empty-cart">
                                    <FontAwesomeIcon icon={faShoppingCart} className="empty-cart-icon" />
                                    <h3>Seu carrinho está vazio!</h3>
                                    <p>OnlyWave - Sua moda, nossa onda</p>
                                    <button className="back-to-shop-btn" onClick={closeCart}>
                                        Voltar à loja
                                    </button>
                                </div>
                            ) : (
                                // Exibido quando há itens no carrinho
                                <>
                                    {/* Lista de itens no carrinho com scroll */}
                                    <div className="cart-items">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="cart-item">
                                                <div className="item-image">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                                <div className="item-details">
                                                    <h3>{item.name}</h3>
                                                    <p className="item-price">R$ {item.price.toFixed(2)}</p>
                                                    {/* Controle de quantidade com botões + e - */}
                                                    <div className="quantity-control">
                                                        <button onClick={() => {
                                                            // Diminui a quantidade ou remove se chegar a zero
                                                            if (item.quantity > 1) {
                                                                updateCartItem(item.id, item.quantity - 1);
                                                            } else {
                                                                updateCartItem(item.id, 0);
                                                            }
                                                        }}>
                                                            <FontAwesomeIcon icon={faMinus} />
                                                        </button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => updateCartItem(item.id, item.quantity + 1)}>
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Rodapé do carrinho com resumo e botões de ação */}
                                    <div className="cart-footer">
                                        <h4>Produtos na sacola: {totalItems}</h4>
                                        <h4 className="subtotal">Subtotal: R$ {subtotal.toFixed(2)}</h4>
                                        <div className="cart-buttons">
                                            <button className="checkout-btn">Finalizar Compra</button>
                                            <button className="clear-cart-btn" onClick={handleClearCart}>
                                                Limpar Sacola
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Modal de confirmação para limpar o carrinho */}
            <Modal
                isOpen={isModalOpen} // Controla se o modal está aberto
                onRequestClose={closeModal} // Função chamada ao tentar fechar o modal
                className="clear-cart-modal" // Classe CSS para o conteúdo do modal
                overlayClassName="clear-cart-modal-overlay" // Classe CSS para o overlay do modal
            >
                <h3>Você quer remover todos os itens da sacola?</h3>
                <div className="modal-buttons">
                    <button onClick={clearCart}>Sim</button>
                    <button onClick={closeModal}>Não</button>
                </div>
            </Modal>
        </div>
    );
}

export default Header;
