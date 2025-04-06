import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './ParcelamentoModal.module.css';

const ParcelamentoModal = ({ isOpen, onClose, preco }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const calcularParcelas = () => {
    const parcelas = [];
    for (let i = 1; i <= 12; i++) {
      const valorParcela = preco / i;
      parcelas.push({
        numero: i,
        valor: valorParcela.toFixed(2),
        total: preco.toFixed(2)
      });
    }
    return parcelas;
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Parcelamento</h3>
        </div>

        <table className={styles.parcelamentoTable}>
          <tbody>
            {calcularParcelas().map(parcela => (
              <tr key={parcela.numero}>
                <td>
                  <span className={styles.parcelaNumero}>{parcela.numero}x</span>
                  {' de '}
                  <span className={styles.parcelaValor}>R$ {parcela.valor}</span>
                  {' sem juros'}
                </td>
                <td>
                  R$ {parcela.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParcelamentoModal; 