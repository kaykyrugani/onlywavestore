import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './CheckoutPage.module.css';

// Componentes de etapas do checkout
import EnderecoForm from '../../components/Checkout/EnderecoForm';
import EntregaInfo from '../../components/Checkout/EntregaInfo';
import PagamentoForm from '../../components/Checkout/PagamentoForm';
import CheckoutCart from '../../components/Checkout/CheckoutCart';
import AccountHeader from '../../components/AccountHeader';
import Modal from '../../components/Modal';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartItem, removeFromCart, clearCart } = useCart();
  const { theme } = useTheme();
  
  // Estado para controlar a etapa atual do checkout
  const [etapaAtual, setEtapaAtual] = useState('endereco');
  
  // Estado para armazenar dados do endereço
  const [endereco, setEndereco] = useState(null);
  
  // Estado para controlar o modal do carrinho vazio
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
  
  // Verificar se o carrinho está vazio
  useEffect(() => {
    if (cartItems.length === 0) {
      setShowEmptyCartModal(true);
    } else {
      setShowEmptyCartModal(false);
    }
  }, [cartItems]);
  
  // Função para lidar com o carrinho vazio
  const handleEmptyCart = () => {
    navigate('/');
  };
  
  // Função customizada para remover item e verificar se o carrinho fica vazio
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
    
    // Se após a remoção o carrinho ficar vazio, mostrar o modal
    if (cartItems.length <= 1) {
      setShowEmptyCartModal(true);
    }
  };
  
  // Função para avançar para a próxima etapa
  const avancarEtapa = (novaEtapa) => {
    setEtapaAtual(novaEtapa);
  };
  
  // Função para salvar endereço e ir para próxima etapa
  const salvarEndereco = (dadosEndereco) => {
    setEndereco(dadosEndereco);
    avancarEtapa('entrega');
  };
  
  // Função para editar o endereço
  const editarEndereco = () => {
    avancarEtapa('endereco');
  };
  
  // Função para excluir o endereço
  const excluirEndereco = () => {
    setEndereco(null);
    avancarEtapa('endereco');
  };

  return (
    <div className={`${styles.page} ${theme === 'dark' ? styles.darkMode : ''}`}>
      <AccountHeader />
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutProgress}>
          <div className={`${styles.progressStep} ${etapaAtual === 'endereco' ? styles.active : (endereco ? styles.completed : '')}`}>
            <div className={styles.stepNumber}>1</div>
            <span>Endereço</span>
          </div>
          <div className={styles.progressLine}></div>
          <div className={`${styles.progressStep} ${etapaAtual === 'entrega' ? styles.active : (etapaAtual === 'pagamento' ? styles.completed : '')}`}>
            <div className={styles.stepNumber}>2</div>
            <span>Entrega</span>
          </div>
          <div className={styles.progressLine}></div>
          <div className={`${styles.progressStep} ${etapaAtual === 'pagamento' ? styles.active : ''}`}>
            <div className={styles.stepNumber}>3</div>
            <span>Pagamento</span>
          </div>
        </div>
      
        <div className={styles.mainContent}>
          <div className={styles.checkoutContent} data-etapa={etapaAtual}>
            <div className={styles.etapasContainer}>
              {/* Etapa 1: Formulário de Endereço */}
              {etapaAtual === 'endereco' && (
                <EnderecoForm 
                  onSalvar={salvarEndereco} 
                  enderecoAtual={endereco}
                />
              )}
              
              {/* Etapa 2: Informações de Entrega */}
              {etapaAtual === 'entrega' && (
                <EntregaInfo 
                  endereco={endereco}
                  onEditar={editarEndereco}
                  onExcluir={excluirEndereco}
                  onAvancar={() => avancarEtapa('pagamento')}
                />
              )}
              
              {/* Etapa 3: Formulário de Pagamento */}
              {etapaAtual === 'pagamento' && (
                <PagamentoForm 
                  endereco={endereco}
                  onVoltar={() => avancarEtapa('entrega')}
                  cartItems={cartItems}
                />
              )}
            </div>
          </div>
          
          {/* Lado direito - Resumo e Carrinho */}
          {etapaAtual !== 'pagamento' && (
            <div className={styles.summaryContainer}>
              <div className={styles.carrinhoContainer}>
                <CheckoutCart 
                  items={cartItems}
                  onUpdateQuantity={updateCartItem}
                  onRemoveItem={handleRemoveItem}
                  onClearCart={clearCart}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal para carrinho vazio */}
      {showEmptyCartModal && (
        <Modal 
          isOpen={showEmptyCartModal}
          title="Seu carrinho está vazio"
          message="Para continuar com a compra, adicione produtos ao seu carrinho."
          buttons={[
            {
              text: "Continuar comprando",
              onClick: handleEmptyCart,
              primary: true
            }
          ]}
        />
      )}
      
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Only Wave Store. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default CheckoutPage; 