import React, { useState, useEffect } from 'react';
import styles from './PagamentoForm.module.css';
import ResumoCompra from './ResumoCompra';

const PagamentoForm = ({ endereco, onVoltar, cartItems }) => {
  // Estado para o método de pagamento selecionado
  const [metodoPagamento, setMetodoPagamento] = useState('cartao');
  
  // Estado para representação visual do cartão
  const [cartaoInfo, setCartaoInfo] = useState({
    numero: '',
    nome: '',
    validade: '',
    cvv: ''
  });
  
  // Estado para controlar a animação de virar o cartão
  const [mostrarVerso, setMostrarVerso] = useState(false);
  
  // Estado para cartões salvos
  const [cartoesSalvos, setCartoesSalvos] = useState(() => {
    const cartoesStorage = localStorage.getItem('cartoesSalvos');
    return cartoesStorage ? JSON.parse(cartoesStorage) : [];
  });
  
  // Estado para controlar se o cartão deve ser salvo
  const [salvarCartao, setSalvarCartao] = useState(false);
  
  // Estado para controlar cartão selecionado
  const [cartaoSelecionado, setCartaoSelecionado] = useState(null);
  
  // Efeito para salvar os cartões no localStorage
  useEffect(() => {
    localStorage.setItem('cartoesSalvos', JSON.stringify(cartoesSalvos));
  }, [cartoesSalvos]);
  
  // Efeito para virar o cartão quando o campo CVV recebe foco
  useEffect(() => {
    // Se clicar fora, voltar para a frente do cartão
    const handleClickOutside = () => {
      setMostrarVerso(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  // Função para formatar o número do cartão
  const formatarNumeroCartao = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    
    // Formatação do número do cartão: #### #### #### ####
    let numeroFormatado = '';
    for (let i = 0; i < apenasNumeros.length; i++) {
      if (i > 0 && i % 4 === 0) {
        numeroFormatado += ' ';
      }
      numeroFormatado += apenasNumeros[i];
    }
    
    return numeroFormatado;
  };
  
  // Função para formatar a data de validade
  const formatarValidade = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    
    if (apenasNumeros.length <= 2) {
      return apenasNumeros;
    } else {
      return `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2, 4)}`;
    }
  };
  
  // Função para mascarar o número do cartão
  const mascaraNumeroCartao = (numero) => {
    if (!numero) return '';
    const partes = numero.split(' ');
    if (partes.length < 4) return numero;
    
    return `**** **** **** ${partes[3]}`;
  };
  
  // Handlers para os diferentes campos do cartão
  const handleNumeroChange = (e) => {
    const valorFormatado = formatarNumeroCartao(e.target.value);
    if (valorFormatado.length <= 19) { // Limitando a 16 dígitos + 3 espaços
      setCartaoInfo({ ...cartaoInfo, numero: valorFormatado });
    }
  };
  
  const handleNomeChange = (e) => {
    setCartaoInfo({ ...cartaoInfo, nome: e.target.value.toUpperCase() });
  };
  
  const handleValidadeChange = (e) => {
    const valorFormatado = formatarValidade(e.target.value);
    if (valorFormatado.length <= 5) { // MM/YY
      setCartaoInfo({ ...cartaoInfo, validade: valorFormatado });
    }
  };
  
  const handleCvvChange = (e) => {
    const valor = e.target.value.replace(/\D/g, '');
    if (valor.length <= 3) {
      setCartaoInfo({ ...cartaoInfo, cvv: valor });
    }
  };
  
  // Handler para foco no campo CVV
  const handleCvvFocus = (e) => {
    e.stopPropagation();
    setMostrarVerso(true);
  };
  
  // Função para confirmar a compra
  const confirmarCompra = () => {
    // Se está usando cartão e marcou para salvar, adicionar aos cartões salvos
    if (metodoPagamento === 'cartao' && salvarCartao && !cartaoSelecionado) {
      const novoCartao = {
        id: Date.now(),
        numero: cartaoInfo.numero,
        nome: cartaoInfo.nome,
        validade: cartaoInfo.validade
      };
      
      setCartoesSalvos([...cartoesSalvos, novoCartao]);
    }
    
    alert('Compra confirmada! Obrigado por comprar na OnlyWave.');
  };
  
  // Função para selecionar um cartão salvo
  const selecionarCartao = (cartao) => {
    setCartaoSelecionado(cartao);
    setCartaoInfo({
      ...cartaoInfo,
      numero: cartao.numero,
      nome: cartao.nome,
      validade: cartao.validade
    });
  };
  
  // Função para remover um cartão salvo
  const removerCartao = (id, e) => {
    e.stopPropagation();
    const novosCartoes = cartoesSalvos.filter(cartao => cartao.id !== id);
    setCartoesSalvos(novosCartoes);
    
    // Se o cartão removido era o selecionado, limpar a seleção
    if (cartaoSelecionado && cartaoSelecionado.id === id) {
      setCartaoSelecionado(null);
      setCartaoInfo({
        numero: '',
        nome: '',
        validade: '',
        cvv: ''
      });
    }
  };
  
  // Função para adicionar novo cartão
  const adicionarNovoCartao = () => {
    setCartaoSelecionado(null);
    setCartaoInfo({
      numero: '',
      nome: '',
      validade: '',
      cvv: ''
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Forma de Pagamento</h2>
      
      {/* Resumo da compra */}
      <ResumoCompra 
        cartItems={cartItems} 
        metodoPagamento={metodoPagamento} 
      />
      
      <div className={styles.metodosContainer}>
        <div className={styles.metodosToggle}>
          <button 
            className={`${styles.metodoBtn} ${metodoPagamento === 'cartao' ? styles.ativo : ''}`}
            onClick={() => setMetodoPagamento('cartao')}
          >
            Cartão de Crédito
          </button>
          <button 
            className={`${styles.metodoBtn} ${metodoPagamento === 'pix' ? styles.ativo : ''}`}
            onClick={() => setMetodoPagamento('pix')}
          >
            Pix
          </button>
          <button 
            className={`${styles.metodoBtn} ${metodoPagamento === 'boleto' ? styles.ativo : ''}`}
            onClick={() => setMetodoPagamento('boleto')}
          >
            Boleto
          </button>
        </div>
        
        {/* Formulário de Cartão de Crédito */}
        {metodoPagamento === 'cartao' && (
          <div className={styles.cartaoContainer}>
            {/* Cartões salvos */}
            {cartoesSalvos.length > 0 && (
              <div className={styles.cartoesSalvos}>
                <h3 className={styles.cartoesSalvosTitulo}>Seus Cartões</h3>
                <div className={styles.cartoesList}>
                  {cartoesSalvos.map((cartao) => (
                    <div 
                      key={cartao.id}
                      className={`${styles.cartaoSalvo} ${cartaoSelecionado?.id === cartao.id ? styles.selecionado : ''}`}
                      onClick={() => selecionarCartao(cartao)}
                    >
                      <div className={styles.cartaoSalvoInfo}>
                        <div className={styles.cartaoSalvoNumero}>
                          {mascaraNumeroCartao(cartao.numero)}
                        </div>
                        <div className={styles.cartaoSalvoNome}>{cartao.nome}</div>
                      </div>
                      <button 
                        className={styles.removerCartaoBtn}
                        onClick={(e) => removerCartao(cartao.id, e)}
                        aria-label="Remover cartão"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button 
                    className={styles.novoCartaoBtn}
                    onClick={adicionarNovoCartao}
                  >
                    + Adicionar novo cartão
                  </button>
                </div>
              </div>
            )}
            
            {/* Representação visual do cartão */}
            <div className={styles.cartaoVisual}>
              <div className={`${styles.cartao} ${mostrarVerso ? styles.virarCartao : ''}`}>
                {/* Frente do cartão */}
                <div className={styles.cartaoFrente}>
                  <div className={styles.cartaoLogo}>OnlyWave Card</div>
                  <div className={styles.cartaoChip}></div>
                  <div className={styles.cartaoNumero}>
                    {cartaoInfo.numero || '•••• •••• •••• ••••'}
                  </div>
                  <div className={styles.cartaoDetalhes}>
                    <div className={styles.cartaoNome}>
                      {cartaoInfo.nome || 'SEU NOME AQUI'}
                    </div>
                    <div className={styles.cartaoValidade}>
                      {cartaoInfo.validade || 'MM/AA'}
                    </div>
                  </div>
                </div>
                
                {/* Verso do cartão */}
                <div className={styles.cartaoVerso}>
                  <div className={styles.cartaoFaixa}></div>
                  <div className={styles.cartaoCvvContainer}>
                    <div className={styles.cartaoCvvLabel}>CVV</div>
                    <div className={styles.cartaoCvv}>{cartaoInfo.cvv}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Formulário de dados do cartão */}
            <div className={styles.cartaoForm}>
              <div className={styles.formGroup}>
                <label htmlFor="numero">Número do Cartão</label>
                <input 
                  type="text" 
                  id="numero"
                  value={cartaoInfo.numero}
                  onChange={handleNumeroChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  disabled={cartaoSelecionado !== null}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="nome">Nome do Titular</label>
                <input 
                  type="text" 
                  id="nome"
                  value={cartaoInfo.nome}
                  onChange={handleNomeChange}
                  placeholder="NOME COMO ESTÁ NO CARTÃO"
                  disabled={cartaoSelecionado !== null}
                />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="validade">Validade</label>
                  <input 
                    type="text" 
                    id="validade"
                    value={cartaoInfo.validade}
                    onChange={handleValidadeChange}
                    placeholder="MM/AA"
                    maxLength="5"
                    disabled={cartaoSelecionado !== null}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="cvv">Cód. Segurança</label>
                  <input 
                    type="text" 
                    id="cvv"
                    value={cartaoInfo.cvv}
                    onChange={handleCvvChange}
                    onFocus={handleCvvFocus}
                    placeholder="CVV"
                    maxLength="3"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              
              {/* Opção para salvar o cartão */}
              {!cartaoSelecionado && (
                <div className={styles.salvarCartaoCheck}>
                  <label className={styles.checkboxContainer}>
                    <input 
                      type="checkbox" 
                      checked={salvarCartao}
                      onChange={() => setSalvarCartao(!salvarCartao)}
                    />
                    <span className={styles.checkmark}></span>
                    Salvar este cartão para futuras compras
                  </label>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Método de Pagamento: Pix */}
        {metodoPagamento === 'pix' && (
          <div className={styles.pixContainer}>
            <div className={styles.pixInfo}>
              <h3>Pagamento via Pix</h3>
              <p>Você receberá as instruções para pagamento após confirmar sua compra.</p>
              <div className={styles.pixIcon}>
                <svg viewBox="0 0 512 512" width="80" height="80">
                  <path d="M242,180.7l-52-53.1l-86.1,87.2c-11.3,11.5-29.6,11.5-41,0l-17.8-18c-11.3-11.5-11.3-30,0-41.5l129.8-131.6
                  c11.3-11.5,29.6-11.5,41,0l17.8,18.1c11.3,11.5,11.3,30,0,41.5l17.8,18.1c22.7-23,22.7-60.3,0-83.3L234,0.7
                  c-22.7-23-59.6-23-82.3,0L21.9,132.3c-22.7,23-22.7,60.3,0,83.3l17.8,18.1c22.7,23,59.6,23,82.3,0l120.1-121.8
                  C242,180.7,242,180.7,242,180.7z"/>
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {/* Método de Pagamento: Boleto */}
        {metodoPagamento === 'boleto' && (
          <div className={styles.boletoContainer}>
            <div className={styles.boletoInfo}>
              <h3>Pagamento via Boleto</h3>
              <p>Após confirmar a compra, você receberá o boleto por e-mail. O prazo de compensação é de até 3 dias úteis.</p>
              <div className={styles.boletoIcon}>
                <svg viewBox="0 0 24 24" width="80" height="80">
                  <path d="M2,4V20H22V4H2M4,6H20V18H4V6M6,8V16H8V8H6M10,8V16H12V8H10M14,8V16H16V8H14M18,8V16H20V8H18Z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className={styles.botoesContainer}>
        <button 
          className={styles.voltarBtn}
          onClick={onVoltar}
        >
          Voltar para Entrega
        </button>
        
        <button 
          className={styles.confirmarBtn}
          onClick={confirmarCompra}
        >
          Confirmar Compra
        </button>
      </div>
    </div>
  );
};

export default PagamentoForm; 