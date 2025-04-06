import React from 'react';
import styles from './ResumoCompra.module.css';

const ResumoCompra = ({ cartItems, metodoPagamento }) => {
  // Calcular o subtotal dos itens
  const subtotal = cartItems.reduce((total, item) => 
    total + (item.price * item.quantity), 0);
  
  // Valor do frete (grátis neste exemplo)
  const valorFrete = 0;
  
  // Calcular desconto para PIX (5%)
  const descontoPix = metodoPagamento === 'pix' ? subtotal * 0.05 : 0;
  
  // Total da compra
  const total = subtotal + valorFrete - descontoPix;
  
  // Função para formatar valores em reais
  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };
  
  // Determinar texto do método de pagamento
  const getMetodoPagamentoTexto = () => {
    switch(metodoPagamento) {
      case 'cartao':
        return 'Cartão de Crédito';
      case 'pix':
        return 'PIX (5% de desconto)';
      case 'boleto':
        return 'Boleto Bancário';
      default:
        return 'Não selecionado';
    }
  };

  return (
    <div className={styles.resumoContainer}>
      <h2 className={styles.resumoTitulo}>Resumo da Compra</h2>
      
      <div className={styles.resumoItens}>
        <div className={styles.resumoLinha}>
          <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})</span>
          <span>{formatarMoeda(subtotal)}</span>
        </div>
        
        <div className={styles.resumoLinha}>
          <span>Frete</span>
          <span className={styles.freteGratis}>Grátis</span>
        </div>
        
        {metodoPagamento === 'pix' && (
          <div className={styles.resumoLinha}>
            <span>Desconto PIX (5%)</span>
            <span className={styles.desconto}>-{formatarMoeda(descontoPix)}</span>
          </div>
        )}
        
        {metodoPagamento && (
          <div className={styles.resumoLinha}>
            <span>Forma de Pagamento</span>
            <span>{getMetodoPagamentoTexto()}</span>
          </div>
        )}
      </div>
      
      <div className={styles.linhaDivisoria}></div>
      
      <div className={styles.resumoTotal}>
        <span>Total</span>
        <span className={styles.valorTotal}>{formatarMoeda(total)}</span>
      </div>
      
      {/* Parcelamento - Apenas para cartão de crédito */}
      {metodoPagamento === 'cartao' && total > 0 && (
        <div className={styles.parcelamento}>
          <span>
            ou em até {Math.min(12, Math.floor(total / 10))}x de {formatarMoeda(total / Math.min(12, Math.floor(total / 10)))} sem juros
          </span>
        </div>
      )}
    </div>
  );
};

export default ResumoCompra; 