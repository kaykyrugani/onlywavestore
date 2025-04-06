import React from 'react';
import styles from './EntregaInfo.module.css';

const EntregaInfo = ({ endereco, onEditar, onExcluir, onAvancar }) => {
  // Se não tiver endereço, não renderizar nada
  if (!endereco) return null;
  
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Endereço de Entrega</h2>
      
      <div className={styles.enderecoCard}>
        <div className={styles.enderecoInfo}>
          <div className={styles.nomeCliente}>{endereco.nome}</div>
          <div className={styles.enderecoDetalhes}>
            {endereco.endereco}, {endereco.numero}
            {endereco.complemento && `, ${endereco.complemento}`}
          </div>
          <div className={styles.bairroCep}>
            {endereco.bairro} - CEP: {endereco.cep}
          </div>
        </div>
        
        <div className={styles.actions}>
          <button 
            onClick={onEditar} 
            className={styles.editarBtn}
            aria-label="Editar endereço"
          >
            Editar
          </button>
          <button 
            onClick={onExcluir} 
            className={styles.excluirBtn}
            aria-label="Excluir endereço"
          >
            Excluir
          </button>
        </div>
      </div>
      
      <div className={styles.entregaMetodo}>
        <h3 className={styles.entregaTitulo}>Método de Entrega</h3>
        <div className={styles.metodoCard}>
          <div className={styles.metodoInfo}>
            <div className={styles.metodoNome}>Frete padrão – Grátis</div>
            <div className={styles.metodoPrazo}>Entrega em até 7 dias úteis</div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onAvancar} 
        className={styles.avancarBtn}
        aria-label="Ir para a forma de pagamento"
      >
        Ir para Pagamento
      </button>
    </div>
  );
};

export default EntregaInfo; 