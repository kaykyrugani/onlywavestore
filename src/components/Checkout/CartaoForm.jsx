import React, { useState } from 'react';
import styles from './FormPagamento.module.css';

const CartaoForm = ({ onConfirmar }) => {
  const [numeroCartao, setNumeroCartao] = useState('');
  const [titular, setTitular] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');
  const [parcelas, setParcelas] = useState('1');
  const [erros, setErros] = useState({});
  const [formTocado, setFormTocado] = useState(false);

  // Formatação do número do cartão
  const formatarNumeroCartao = (valor) => {
    // Remove caracteres não numéricos
    const apenasNumeros = valor.replace(/\D/g, '');
    
    // Adiciona espaços a cada 4 dígitos
    const grupos = [];
    for (let i = 0; i < apenasNumeros.length; i += 4) {
      grupos.push(apenasNumeros.slice(i, i + 4));
    }
    
    return grupos.join(' ');
  };

  // Formatação da validade (MM/AA)
  const formatarValidade = (valor) => {
    // Remove caracteres não numéricos
    const apenasNumeros = valor.replace(/\D/g, '');
    
    if (apenasNumeros.length <= 2) {
      return apenasNumeros;
    } else {
      return `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2, 4)}`;
    }
  };

  // Opções de parcelas
  const opçoesParcelas = Array.from({ length: 12 }, (_, i) => i + 1).map(num => ({
    valor: num.toString(),
    texto: `${num}x ${num === 1 ? 'sem juros' : 'com juros'}`
  }));

  // Validação do formulário
  const validarFormulario = () => {
    const novosErros = {};
    
    // Validação do número do cartão (deve ter 16 dígitos sem espaços)
    if (!numeroCartao.trim() || numeroCartao.replace(/\D/g, '').length !== 16) {
      novosErros.numeroCartao = 'Número de cartão inválido';
    }
    
    // Validação do titular (obrigatório)
    if (!titular.trim()) {
      novosErros.titular = 'Nome do titular é obrigatório';
    }
    
    // Validação da validade (MM/AA)
    if (!validade.trim() || validade.replace(/\D/g, '').length !== 4) {
      novosErros.validade = 'Data de validade inválida';
    } else {
      const mes = parseInt(validade.replace(/\D/g, '').slice(0, 2));
      if (mes < 1 || mes > 12) {
        novosErros.validade = 'Mês inválido';
      }
    }
    
    // Validação do CVV (3 dígitos)
    if (!cvv.trim() || cvv.length !== 3 || !/^\d+$/.test(cvv)) {
      novosErros.cvv = 'CVV inválido';
    }
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Handler de submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormTocado(true);
    
    if (validarFormulario()) {
      onConfirmar({
        numeroCartao: numeroCartao.replace(/\D/g, ''),
        titular,
        validade,
        cvv,
        parcelas
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="numeroCartao">Número do Cartão*</label>
        <input
          type="text"
          id="numeroCartao"
          value={numeroCartao}
          onChange={(e) => {
            const formatado = formatarNumeroCartao(e.target.value);
            // Limita a 19 caracteres (16 dígitos + 3 espaços)
            if (formatado.length <= 19) {
              setNumeroCartao(formatado);
            }
            setFormTocado(true);
          }}
          placeholder="0000 0000 0000 0000"
          className={erros.numeroCartao && formTocado ? styles.inputError : ''}
        />
        {erros.numeroCartao && formTocado && <span className={styles.error}>{erros.numeroCartao}</span>}
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="titular">Nome do Titular*</label>
        <input
          type="text"
          id="titular"
          value={titular}
          onChange={(e) => {
            setTitular(e.target.value);
            setFormTocado(true);
          }}
          placeholder="Nome como está no cartão"
          className={erros.titular && formTocado ? styles.inputError : ''}
        />
        {erros.titular && formTocado && <span className={styles.error}>{erros.titular}</span>}
      </div>
      
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="validade">Validade*</label>
          <input
            type="text"
            id="validade"
            value={validade}
            onChange={(e) => {
              const formatado = formatarValidade(e.target.value);
              // Limita a 5 caracteres (MM/YY)
              if (formatado.length <= 5) {
                setValidade(formatado);
              }
              setFormTocado(true);
            }}
            placeholder="MM/AA"
            className={erros.validade && formTocado ? styles.inputError : ''}
          />
          {erros.validade && formTocado && <span className={styles.error}>{erros.validade}</span>}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="cvv">CVV*</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => {
              // Permite apenas dígitos e limita a 3
              const valor = e.target.value.replace(/\D/g, '');
              if (valor.length <= 3) {
                setCvv(valor);
              }
              setFormTocado(true);
            }}
            placeholder="123"
            className={erros.cvv && formTocado ? styles.inputError : ''}
          />
          {erros.cvv && formTocado && <span className={styles.error}>{erros.cvv}</span>}
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="parcelas">Parcelas*</label>
        <select
          id="parcelas"
          value={parcelas}
          onChange={(e) => setParcelas(e.target.value)}
          className={styles.select}
        >
          {opçoesParcelas.map(opcao => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.texto}
            </option>
          ))}
        </select>
      </div>
      
      <button type="submit" className={styles.submitBtn}>
        Finalizar Pagamento
      </button>
    </form>
  );
};

export default CartaoForm; 