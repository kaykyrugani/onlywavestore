import React, { useState } from 'react';
import styles from './PagamentoOpcoes.module.css';
import CartaoForm from './CartaoForm';
import PixForm from './PixForm';
import BoletoForm from './BoletoForm';

const PagamentoOpcoes = ({ onConfirmarPagamento }) => {
  const [metodoSelecionado, setMetodoSelecionado] = useState(null);
  const [abaSelecionada, setAbaSelecionada] = useState(null);

  const handleSelecionarMetodo = (metodo) => {
    setMetodoSelecionado(metodo);
    
    // Se clicar no mesmo método, alternar entre abrir/fechar a aba
    if (abaSelecionada === metodo) {
      setAbaSelecionada(null);
    } else {
      setAbaSelecionada(metodo);
    }
  };

  const handleConfirmar = (dados) => {
    onConfirmarPagamento({
      metodo: metodoSelecionado,
      dados
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Forma de Pagamento</h2>
      
      <div className={styles.metodosLista}>
        {/* Opção Cartão de Crédito */}
        <div className={styles.metodoContainer}>
          <div 
            className={`${styles.metodoHeader} ${metodoSelecionado === 'cartao' ? styles.selecionado : ''}`}
            onClick={() => handleSelecionarMetodo('cartao')}
          >
            <div className={styles.radioCircle}>
              {metodoSelecionado === 'cartao' && <div className={styles.radioInner}></div>}
            </div>
            <div className={styles.metodoInfo}>
              <h3 className={styles.metodoTitulo}>Cartão de Crédito</h3>
              <p className={styles.metodoDesc}>Pagamento em até 12x</p>
            </div>
            <div className={styles.metodoIcone}>
              <span className={`${styles.seta} ${abaSelecionada === 'cartao' ? styles.aberto : ''}`}>
                ↓
              </span>
            </div>
          </div>
          
          {abaSelecionada === 'cartao' && (
            <div className={styles.metodoConteudo}>
              <CartaoForm onConfirmar={handleConfirmar} />
            </div>
          )}
        </div>
        
        {/* Opção PIX */}
        <div className={styles.metodoContainer}>
          <div 
            className={`${styles.metodoHeader} ${metodoSelecionado === 'pix' ? styles.selecionado : ''}`}
            onClick={() => handleSelecionarMetodo('pix')}
          >
            <div className={styles.radioCircle}>
              {metodoSelecionado === 'pix' && <div className={styles.radioInner}></div>}
            </div>
            <div className={styles.metodoInfo}>
              <h3 className={styles.metodoTitulo}>PIX</h3>
              <p className={styles.metodoDesc}>Pagamento instantâneo</p>
            </div>
            <div className={styles.metodoIcone}>
              <span className={`${styles.seta} ${abaSelecionada === 'pix' ? styles.aberto : ''}`}>
                ↓
              </span>
            </div>
          </div>
          
          {abaSelecionada === 'pix' && (
            <div className={styles.metodoConteudo}>
              <PixForm onConfirmar={handleConfirmar} />
            </div>
          )}
        </div>
        
        {/* Opção Boleto */}
        <div className={styles.metodoContainer}>
          <div 
            className={`${styles.metodoHeader} ${metodoSelecionado === 'boleto' ? styles.selecionado : ''}`}
            onClick={() => handleSelecionarMetodo('boleto')}
          >
            <div className={styles.radioCircle}>
              {metodoSelecionado === 'boleto' && <div className={styles.radioInner}></div>}
            </div>
            <div className={styles.metodoInfo}>
              <h3 className={styles.metodoTitulo}>Boleto Bancário</h3>
              <p className={styles.metodoDesc}>Prazo de até 3 dias úteis</p>
            </div>
            <div className={styles.metodoIcone}>
              <span className={`${styles.seta} ${abaSelecionada === 'boleto' ? styles.aberto : ''}`}>
                ↓
              </span>
            </div>
          </div>
          
          {abaSelecionada === 'boleto' && (
            <div className={styles.metodoConteudo}>
              <BoletoForm onConfirmar={handleConfirmar} />
            </div>
          )}
        </div>
      </div>
      
      {metodoSelecionado && !abaSelecionada && (
        <button 
          className={styles.continuarBtn}
          onClick={() => setAbaSelecionada(metodoSelecionado)}
        >
          Continuar com {metodoSelecionado === 'cartao' ? 'Cartão de Crédito' : metodoSelecionado === 'pix' ? 'PIX' : 'Boleto'}
        </button>
      )}
    </div>
  );
};

export default PagamentoOpcoes; 