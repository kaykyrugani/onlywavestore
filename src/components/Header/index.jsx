import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faTimes, faShoppingBag, faBars } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { tenis, camisetas, acessorios } from '../../pages/home/produtoscards';
import SearchBar from '../SearchBar/index';
import Cart from '../Cart/index';
import MobMenu from '../MobMenu/MobMenu';
import { useCart } from '../../contexts/CartContext';
import { useCarrinho } from '../../contexts/CarrinhoContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
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

// Componente de item do mini carrinho
const MiniCartItem = ({ item, onRemove, onIncrement, onDecrement }) => {
    const [isNew, setIsNew] = useState(false);
    
    useEffect(() => {
        setIsNew(true);
        const timer = setTimeout(() => setIsNew(false), 500);
        return () => clearTimeout(timer);
    }, [item.quantidade]);
    
    // Garantir que nome, preco e tamanho estejam definidos
    const nome = item.nome || 'Produto';
    const tamanho = item.tamanho || '-';
    let preco = 0;
    if (typeof item.preco === 'number' && !isNaN(item.preco)) {
        preco = item.preco;
    } else if (typeof item.preco === 'string') {
        const parsed = parseFloat(item.preco.replace(/[^0-9.,]/g, '').replace(',', '.'));
        preco = isNaN(parsed) ? 0 : parsed;
    }
    const quantidade = Number(item.quantidade) || 1;

    return (
        <motion.div 
            key={`${item.id}-${tamanho}`}
            className={`${styles.miniCartItem} ${isNew ? styles.added : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
        >
            <div className={styles.miniCartItemImage}>
                <img 
                    src={Array.isArray(item.imagens) ? item.imagens[0] : item.imagens || '/sem-imagem.png'} 
                    alt={nome} 
                />
            </div>
            <div className={styles.miniCartItemDetails}>
                <h5>{nome}</h5>
                <p className={styles.miniCartItemSize}>Tam: {tamanho}</p>
                <div className={styles.miniCartItemPrice}>
                    <span>{quantidade}x</span>
                    <span>R$ {preco.toFixed(2)}</span>
                </div>
                <div className={styles.miniCartItemActions}>
                    <button type="button" onClick={() => onDecrement(item)} aria-label={`Diminuir quantidade de ${nome}`}>-</button>
                    <span>{quantidade}</span>
                    <button type="button" onClick={() => onIncrement(item)} aria-label={`Aumentar quantidade de ${nome}`}>+</button>
                    <button type="button" onClick={(e) => onRemove(e, item.id, tamanho)} aria-label={`Remover ${nome} do carrinho`} className={styles.miniCartItemRemove}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

function Header() {
    const navigate = useNavigate();
    const { 
        cartItems, 
        isCartOpen, 
        openCart, 
        closeCart, 
        updateCartItem,
        removeFromCart, 
        clearCart,
        getTotalItems 
    } = useCart();

    const { carrinho, valorTotal, totalItens, removerItem, atualizarQuantidade, itemAnimando } = useCarrinho();
    
    // Estado para controlar qual menu está ativo
    const [activeMenu, setActiveMenu] = useState(null);
    // Ref para controlar o timeout do debounce
    const debounceRef = useRef(null);
    // Ref para o elemento do menu ativo
    const menuRef = useRef(null);
    // Estado para controlar a miniatura do carrinho
    const [mostrarMiniCarrinho, setMostrarMiniCarrinho] = useState(false);
    const miniCarrinhoTimeoutRef = useRef(null);
    // Estado para animação do ícone do carrinho
    const [cartBump, setCartBump] = useState(false);
    const [isMobMenuOpen, setIsMobMenuOpen] = useState(false);

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

    // Funções para controlar a exibição da miniatura do carrinho
    const handleCartMouseEnter = () => {
        // Limpar qualquer timeout existente para evitar que o carrinho feche durante o hover
        if (miniCarrinhoTimeoutRef.current) {
            clearTimeout(miniCarrinhoTimeoutRef.current);
            miniCarrinhoTimeoutRef.current = null;
        }
        setMostrarMiniCarrinho(true);
    };

    const handleCartMouseLeave = () => {
        // Só define o timeout se não estiver já definido
        if (!miniCarrinhoTimeoutRef.current) {
            miniCarrinhoTimeoutRef.current = setTimeout(() => {
                setMostrarMiniCarrinho(false);
                miniCarrinhoTimeoutRef.current = null;
            }, 500); // Aumentado para 500ms para evitar fechamentos acidentais
        }
    };

    const handleMiniCartMouseEnter = () => {
        // Limpar o timeout quando o mouse entrar no mini carrinho
        if (miniCarrinhoTimeoutRef.current) {
            clearTimeout(miniCarrinhoTimeoutRef.current);
            miniCarrinhoTimeoutRef.current = null;
        }
    };

    const handleMiniCartMouseLeave = () => {
        // Só define o timeout se não estiver já definido
        if (!miniCarrinhoTimeoutRef.current) {
            miniCarrinhoTimeoutRef.current = setTimeout(() => {
                setMostrarMiniCarrinho(false);
                miniCarrinhoTimeoutRef.current = null;
            }, 500); // Aumentado para 500ms para maior consistência
        }
    };

    // Handler para remover um item do mini carrinho
    const handleRemoveFromMiniCart = (e, produtoId, tamanho) => {
        e.stopPropagation(); // Evita que o clique propague para o carrinho
        removerItem(produtoId, tamanho);
    };

    // Efeito para mostrar o mini carrinho quando um item é adicionado
    useEffect(() => {
        if (itemAnimando && itemAnimando.tipo === 'adicionado') {
            // Mostrar o mini carrinho
            setMostrarMiniCarrinho(true);
            
            // Animar o ícone do carrinho
            setCartBump(true);
            const bumpTimer = setTimeout(() => {
                setCartBump(false);
            }, 500);
            
            // Esconder o mini carrinho após 3 segundos
            const closeTimer = setTimeout(() => {
                setMostrarMiniCarrinho(false);
            }, 3000);
            
            return () => {
                clearTimeout(bumpTimer);
                clearTimeout(closeTimer);
            };
        }
    }, [itemAnimando]);

    // Efeito para limpar os timeouts quando o componente é desmontado
    useEffect(() => {
        return () => {
            // Limpa todos os timeouts na desmontagem do componente
            if (miniCarrinhoTimeoutRef.current) {
                clearTimeout(miniCarrinhoTimeoutRef.current);
                miniCarrinhoTimeoutRef.current = null;
            }
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
                debounceRef.current = null;
            }
        };
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.desconto}>
                <Link to="/">
                    <p>Frete grátis para compras acima de R$ 200,00</p>
                </Link>
            </div>
            <div className={styles.buscaHeader}>
                <div className={styles.mobMenu} onClick={() => setIsMobMenuOpen(true)}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src="/logo.png" alt="Logo OnlyWave" />
                    </Link>
                </div>
                <SearchBar />
                <div className={styles.iconsBusca}>
                    <Link to="/conta" className={styles.userIconWrapper} aria-label="Minha Conta">
                        <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
                    </Link>
                    <div
                        className={`${styles.cartIconWrapper} ${cartBump ? styles.bump : ''}`}
                        onClick={e => { e.preventDefault(); openCart(); }}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCart(); } }}
                        tabIndex={0}
                        role="button"
                        aria-label="Abrir carrinho"
                        onMouseEnter={handleCartMouseEnter}
                        onMouseLeave={handleCartMouseLeave}
                        style={{ cursor: 'pointer' }}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} className={styles.cartIcon} />
                        <span className={styles.cartCount}>{getTotalItems()}</span>
                        {mostrarMiniCarrinho && (
                            <div
                                className={styles.miniCart}
                                onMouseEnter={handleMiniCartMouseEnter}
                                onMouseLeave={handleMiniCartMouseLeave}
                            >
                                <div className={styles.miniCartHeader}>
                                    <h4>Mini Carrinho</h4>
                                </div>
                                <div className={styles.miniCartItems}>
                                    {cartItems.length === 0 ? (
                                        <p>Carrinho vazio</p>
                                    ) : (
                                        cartItems.map(item => (
                                            <MiniCartItem 
                                                key={`${item.id}-${item.tamanho}`} 
                                                item={item} 
                                                onRemove={handleRemoveFromMiniCart}
                                                onIncrement={() => updateCartItem(item.id, item.quantidade + 1)}
                                                onDecrement={() => updateCartItem(item.id, Math.max(1, item.quantidade - 1))}
                                            />
                                        ))
                                    )}
                                </div>
                                {cartItems.length > 0 && (
                                    <div className={styles.miniCartFooter}>
                                        <div className={styles.miniCartTotal}>
                                            <span>Total:</span>
                                            <span>R$ {cartItems.reduce((acc, item) => {
                                                let preco = 0;
                                                if (typeof item.preco === 'number' && !isNaN(item.preco)) {
                                                    preco = item.preco;
                                                } else if (typeof item.preco === 'string') {
                                                    const parsed = parseFloat(item.preco.replace(/[^0-9.,]/g, '').replace(',', '.'));
                                                    preco = isNaN(parsed) ? 0 : parsed;
                                                }
                                                const quantidade = Number(item.quantidade) || 1;
                                                return acc + preco * quantidade;
                                            }, 0).toFixed(2)}</span>
                                        </div>
                                        <button 
                                            type="button"
                                            className={styles.miniCartCheckout}
                                            onClick={() => { setMostrarMiniCarrinho(false); navigate('/checkout'); }}
                                        >
                                            Finalizar Compra
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <ThemeToggle />
                </div>
                <MobMenu isOpen={isMobMenuOpen} onClose={() => setIsMobMenuOpen(false)} />
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

            <Cart 
                isOpen={isCartOpen}
                onClose={closeCart}
                items={cartItems}
                onUpdateQuantity={updateCartItem}
                onRemoveItem={removeFromCart}
                onClearCart={clearCart}
                onCheckout={() => {
                    closeCart();
                    navigate('/checkout');
                }}
            />
        </header>
    );
}

export default Header;