import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { tenis, camisetas, acessorios } from '../../pages/home/produtoscards';
import SearchBar from '../SearchBar/index';
import Cart from '../cart/index';
import { useCart } from '../../contexts/CartContext';
import styles from './Header.module.css';

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
    const navigate = useNavigate();
    const { 
        cartItems, 
        isCartOpen, 
        openCart, 
        closeCart, 
        updateCartItem, 
        clearCart,
        getTotalItems 
    } = useCart();
    
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

    // Função atualizada para lidar com cliques nos itens do menu principal
    const handleNavClick = (e, menuId) => {
        e.preventDefault();
        
        // Mapeamento de IDs de menu para rotas
        const menuToRoute = {
            'sneakers': 'tenis',
            'roupas': 'camisetas',
            'conjuntos': 'conjuntos',
            'acessorios': 'acessorios',
            'marcas': 'marcas'
        };
        
        // Navegar para a página correspondente
        if (menuToRoute[menuId]) {
            navigate(`/produtos/${menuToRoute[menuId]}`);
        } else {
            console.error(`Rota não definida para o menu: ${menuId}`);
        }
        
        // Fechar o menu após a navegação
        setActiveMenu(null);
    };

    // Total de itens no carrinho
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className={styles.header}>
            <div className={styles.desconto}>
                <p>RECEBA 5% DE DESCONTO VIA PIX</p>
            </div>
            <div className={styles.buscaHeader}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src="/logo.png" alt="OnlyWave Store" />
                    </Link>
                </div>
                <SearchBar />
                <div className={styles.iconsBusca}>
                <Link to="/conta" className={styles.userIconWrapper}>
                        <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
                    </Link>
                    <div className={styles.cartIconWrapper} onClick={openCart}>
                        <FontAwesomeIcon 
                            icon={faShoppingCart} 
                            className={styles.cartIcon}
                        />
                        <span className={styles.cartCount}>{totalItems}</span>
                    </div>
                </div>
            </div>
            <nav className={styles.navbar} ref={menuRef}>
                {menuItems.map((item) => (
                    <div 
                        key={item.id} 
                        className={`${styles.navItemContainer} ${activeMenu === item.id ? styles.active : ""}`}
                        onMouseEnter={() => handleMenuHover(item.id)}
                        onMouseLeave={handleMenuLeave}
                    >
                        <div 
                            className={`${styles.navItem} ${activeMenu === item.id ? styles.activeNavItem : ""}`}
                            onClick={(e) => handleNavClick(e, item.id)}
                            role="button"
                            tabIndex={0}
                        >
                            {item.label}
                        </div>
                        <div className={styles.tooltipArrow}></div>
                        <AnimatePresence>
                            {activeMenu === item.id && item.items.length > 0 && (
                                <motion.div 
                                    className={styles.dropdownMenu}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    <div className={styles.dropdownContent}>
                                        <motion.div 
                                            className={styles.seeAllLink}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <Link to={`/produtos/${item.id}`}>Ver todos os produtos</Link>
                                        </motion.div>
                                        <div className={styles.dropdownItems}>
                                            {item.items.map((subItem, index) => (
                                                <motion.div 
                                                    key={subItem.id}
                                                    className={styles.dropdownItem}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                                                    whileHover={{ scale: 1.2, transition: { duration: 0.7 } }}
                                                >
                                                    <Link to={`/produtos/${item.id}?produto=${subItem.id}`}>
                                                        {subItem.name}
                                                    </Link>
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
            <Cart 
                isOpen={isCartOpen} 
                onClose={closeCart} 
                cartItems={cartItems} 
                updateCartItem={updateCartItem} 
                clearCart={clearCart} 
            />
        </div>
    );
}

export default Header;