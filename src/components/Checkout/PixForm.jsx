import React, { useState } from 'react';
import styles from './FormPagamento.module.css';

const PixForm = ({ onConfirmar }) => {
  const [copiado, setCopiado] = useState(false);
  
  // Código PIX de exemplo
  const pixCopia = "00020126330014BR.GOV.BCB.PIX0111123456789012520400005303986540510.005802BR5915LOJA ONLYWAVE6009SAO PAULO62070503***63044D12";
  
  // Função para copiar código
  const copiarCodigo = () => {
    navigator.clipboard.writeText(pixCopia)
      .then(() => {
        setCopiado(true);
        setTimeout(() => setCopiado(false), 3000);
      })
      .catch(err => {
        console.error('Erro ao copiar: ', err);
      });
  };
  
  // Função para simular pagamento
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmar({
      tipo: 'pix',
      codigo: pixCopia
    });
  };
  
  return (
    <div className={styles.pixContainer}>
      <div className={styles.pixQrCode}>
        {/* Simulação de QR Code com um div estilizado */}
        <div className={styles.qrCodeSimulado}>
          <div className={styles.qrCodeInner}>
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTTIgMmgydjJoLTJ6bTQgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTQgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTQgMGgydjJoLTJ6bTQgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTRgMGgydjJoLTJ6TTIgNGgydjJoLTJ6bTggMGgydjJoLTJ6bTYgMGgydjJoLTJ6bTggMGgydjJoLTJ6TTIgNmgydjJoLTJ6bTIgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTQgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTQgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTIgMGgydjJoLTJ6TTIgOGgydjJoLTJ6bTQgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTQgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTQgMGgydjJoLTJ6TTIgMTBoMnYyaC0yek0xMCAxMGgydjJoLTJ6bTQgMGgydjJoLTJ6bTYgMGgydjJoLTJ6bTIgMGgydjJoLTJ6TTggMTJoMnYyaC0yek0xNCAxMmgydjJoLTJ6TTE4IDEyaDJ2MmgtMnpNMjIgMTJoMnYyaC0yek0yNiAxMmgydjJoLTJ6TTQgMTRoMnYyaC0yek04IDE0aDJ2MmgtMnpNMTIgMTRoMnYyaC0yek0xNiAxNGgydjJoLTJ6TTIwIDE0aDJ2MmgtMnpNMjQgMTRoMnYyaC0yek0yOCAxNGgydjJoLTJ6TTIgMTZoMnYyaC0yek02IDE2aDJ2MmgtMnpNMTAgMTZoMnYyaC0yek0xNCAxNmgydjJoLTJ6TTE4IDE2aDJ2MmgtMnpNMjIgMTZoMnYyaC0yek0yNiAxNmgydjJoLTJ6TTQgMThoMnYyaC0yek04IDE4aDJ2MmgtMnpNMTIgMThoMnYyaC0yek0xNiAxOGgydjJoLTJ6TTIwIDE4aDJ2MmgtMnpNMjQgMThoMnYyaC0yek0yOCAxOGgydjJoLTJ6TTYgMjBoMnYyaC0yek0xNCAyMGgydjJoLTJ6TTE4IDIwaDJ2MmgtMnpNMjIgMjBoMnYyaC0yek0yNiAyMGgydjJoLTJ6TTIgMjJoMnYyaC0yek0xMCAyMmgydjJoLTJ6TTE0IDIyaDJ2MmgtMnpNMTggMjJoMnYyaC0yek0yMiAyMmgydjJoLTJ6TTI2IDIyaDJ2MmgtMnpNMiAyNGgydjJoLTJ6bTIgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTIgMGgydjJoLTJ6bTYgMGgydjJoLTJ6bTYgMGgydjJoLTJ6TTggMjZoMnYyaC0yek0xNCAyNmgydjJoLTJ6TTE4IDI2aDJ2MmgtMnpNMjIgMjZoMnYyaC0yek0yNiAyNmgydjJoLTJ6TTQgMjhoMnYyaC0yek04IDI4aDJ2MmgtMnpNMTIgMjhoMnYyaC0yek0xNiAyOGgydjJoLTJ6TTIwIDI4aDJ2MmgtMnpNMjQgMjhoMnYyaC0yek0yOCAyOGgydjJoLTJ6Ii8+PC9zdmc+"
              alt="QR Code PIX"
              className={styles.qrCodeImg}
            />
          </div>
        </div>
      </div>
      
      <div className={styles.pixInstrucoes}>
        <h3 className={styles.pixTitulo}>Pague com PIX</h3>
        <p className={styles.pixTexto}>
          1. Abra o aplicativo do seu banco
        </p>
        <p className={styles.pixTexto}>
          2. Escolha pagar via PIX com QR Code
        </p>
        <p className={styles.pixTexto}>
          3. Escaneie o código ao lado ou cole o código abaixo
        </p>
        
        <div className={styles.pixCodigoContainer}>
          <div className={styles.pixCodigo}>
            {pixCopia.substring(0, 20)}...
          </div>
          <button 
            type="button" 
            className={styles.pixCopiarBtn}
            onClick={copiarCodigo}
          >
            {copiado ? "Copiado!" : "Copiar"}
          </button>
        </div>
        
        <div className={styles.pixInfoValidade}>
          <p>Este código expira em 30 minutos</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.pixForm}>
        <button type="submit" className={styles.submitBtn}>
          Confirmar Pagamento
        </button>
      </form>
    </div>
  );
};

export default PixForm; 