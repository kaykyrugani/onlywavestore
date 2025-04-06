import React, { useState } from 'react';
import styles from './FormPagamento.module.css';

const BoletoForm = ({ onConfirmar }) => {
  const [copiado, setCopiado] = useState(false);
  
  // Código de barras simulado
  const codigoBarras = "34191.09008 76456.830898 62389.000007 4 90320026000";
  
  // Função para copiar código
  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigoBarras)
      .then(() => {
        setCopiado(true);
        setTimeout(() => setCopiado(false), 3000);
      })
      .catch(err => {
        console.error('Erro ao copiar: ', err);
      });
  };
  
  // Função para download do boleto (simulado)
  const baixarBoleto = () => {
    alert('Download do boleto iniciado...');
    // Normalmente aqui você teria uma chamada para API para gerar o PDF
  };
  
  // Função para confirmação do pagamento
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmar({
      tipo: 'boleto',
      codigo: codigoBarras
    });
  };
  
  return (
    <div className={styles.boletoContainer}>
      <div className={styles.boletoCodigo}>
        <div className={styles.codigoBarrasImagem}>
          {/* Imagem simulada de código de barras */}
          <div className={styles.barCodeSimulado}>
            <div className={styles.barras}></div>
          </div>
        </div>
        
        <div className={styles.codigoBarrasTexto}>
          <div className={styles.codigoBarrasLinha}>{codigoBarras}</div>
          <button 
            className={styles.copiarCodigoBtn}
            onClick={copiarCodigo}
          >
            {copiado ? "Copiado!" : "Copiar código"}
          </button>
        </div>
      </div>
      
      <div className={styles.boletoInstrucoes}>
        <h3 className={styles.boletoTitulo}>Boleto Bancário</h3>
        <p className={styles.boletoDescricao}>
          Você pode pagar este boleto em qualquer banco, casas lotéricas ou através do seu internet banking.
        </p>
        
        <div className={styles.boletoInfo}>
          <div className={styles.boletoInfoItem}>
            <span className={styles.boletoInfoLabel}>Valor:</span>
            <span className={styles.boletoInfoValor}>R$ 299,90</span>
          </div>
          <div className={styles.boletoInfoItem}>
            <span className={styles.boletoInfoLabel}>Vencimento:</span>
            <span className={styles.boletoInfoValor}>
              {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
        
        <button 
          className={styles.baixarBoletoBtn}
          onClick={baixarBoleto}
        >
          Baixar Boleto (PDF)
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.boletoForm}>
        <button type="submit" className={styles.submitBtn}>
          Confirmar Pedido
        </button>
      </form>
    </div>
  );
};

export default BoletoForm; 