import React, { useState, useEffect } from 'react';
import styles from './EnderecoForm.module.css';

const EnderecoForm = ({ onSalvar, enderecoAtual }) => {
  // Estado para endereços salvos mockados
  const [enderecosSalvos, setEnderecosSalvos] = useState([
    {
      id: 1,
      nome: 'João da Silva',
      cep: '37730-000',
      endereco: 'Rua Doutor Francisco Prestes Maia',
      numero: '315',
      bairro: 'Parque Universitário',
      complemento: 'apartamento 05',
      cidade: 'Campestre',
      estado: 'MG'
    }
  ]);

  // Estado para o endereço selecionado
  const [enderecoSelecionadoId, setEnderecoSelecionadoId] = useState(null);
  
  // Estado para mostrar formulário de novo endereço
  const [mostrarNovoEndereco, setMostrarNovoEndereco] = useState(false);
  
  // Estado para controlar modo de edição
  const [modoEdicao, setModoEdicao] = useState(false);
  const [enderecoEditandoId, setEnderecoEditandoId] = useState(null);
  
  // Estados para campos do formulário
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [nome, setNome] = useState('João da Silva'); // Mockado conforme requisito
  
  // Estados para validação
  const [erros, setErros] = useState({});
  const [formTocado, setFormTocado] = useState(false);
  
  // Selecionar o primeiro endereço por padrão, se existir
  useEffect(() => {
    if (enderecosSalvos.length > 0 && !enderecoSelecionadoId && !mostrarNovoEndereco && !modoEdicao) {
      setEnderecoSelecionadoId(enderecosSalvos[0].id);
    }
  }, [enderecosSalvos, enderecoSelecionadoId, mostrarNovoEndereco, modoEdicao]);
  
  // Preencher o formulário se tiver endereço existente selecionado
  useEffect(() => {
    if (enderecoAtual) {
      setCep(enderecoAtual.cep || '');
      setEndereco(enderecoAtual.endereco || '');
      setNumero(enderecoAtual.numero || '');
      setBairro(enderecoAtual.bairro || '');
      setComplemento(enderecoAtual.complemento || '');
      setCidade(enderecoAtual.cidade || '');
      setEstado(enderecoAtual.estado || '');
      setNome(enderecoAtual.nome || 'João da Silva');
    }
  }, [enderecoAtual]);
  
  // Função para formatar o CEP
  const formatarCep = (valor) => {
    // Remove caracteres não numéricos
    const apenasNumeros = valor.replace(/\D/g, '');
    
    // Formata como 00000-000
    if (apenasNumeros.length <= 5) {
      return apenasNumeros;
    } else {
      return `${apenasNumeros.slice(0, 5)}-${apenasNumeros.slice(5, 8)}`;
    }
  };
  
  // Handler para mudança do CEP
  const handleCepChange = (e) => {
    const valorFormatado = formatarCep(e.target.value);
    setCep(valorFormatado);
    setFormTocado(true);
  };
  
  // Função para validar o formulário
  const validarFormulario = () => {
    const novosErros = {};
    
    if (!cep.trim() || cep.replace(/\D/g, '').length !== 8) {
      novosErros.cep = 'CEP inválido';
    }
    
    if (!endereco.trim()) {
      novosErros.endereco = 'Endereço é obrigatório';
    }
    
    if (!numero.trim()) {
      novosErros.numero = 'Número é obrigatório';
    }
    
    if (!bairro.trim()) {
      novosErros.bairro = 'Bairro é obrigatório';
    }
    
    if (!cidade.trim()) {
      novosErros.cidade = 'Cidade é obrigatória';
    }
    
    if (!estado.trim()) {
      novosErros.estado = 'Estado é obrigatório';
    }
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };
  
  // Função para submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Se estiver editando, atualizar o endereço
    if (modoEdicao && enderecoEditandoId) {
      setFormTocado(true);
      
      if (validarFormulario()) {
        const enderecoAtualizado = {
          id: enderecoEditandoId,
          cep,
          endereco,
          numero,
          bairro,
          complemento,
          cidade,
          estado,
          nome
        };
        
        // Atualiza o endereço na lista
        setEnderecosSalvos(enderecosSalvos.map(endereco => 
          endereco.id === enderecoEditandoId ? enderecoAtualizado : endereco
        ));
        
        // Sai do modo edição
        setModoEdicao(false);
        setEnderecoEditandoId(null);
        setEnderecoSelecionadoId(enderecoEditandoId);
        return;
      }
    }
    
    // Se um endereço salvo foi selecionado, usá-lo
    if (enderecoSelecionadoId && !mostrarNovoEndereco) {
      const enderecoEscolhido = enderecosSalvos.find(e => e.id === enderecoSelecionadoId);
      if (enderecoEscolhido) {
        onSalvar(enderecoEscolhido);
        return;
      }
    }
    
    // Se está criando um novo endereço, validar
    setFormTocado(true);
    
    if (validarFormulario()) {
      // Se passar na validação, enviar dados
      const novoEndereco = {
        id: Date.now(),
        cep,
        endereco,
        numero,
        bairro,
        complemento,
        cidade,
        estado,
        nome
      };
      
      onSalvar(novoEndereco);
      
      // Adicionar aos endereços salvos
      setEnderecosSalvos([...enderecosSalvos, novoEndereco]);
    }
  };
  
  // Função para selecionar um endereço existente
  const selecionarEndereco = (id) => {
    setEnderecoSelecionadoId(id);
    setMostrarNovoEndereco(false);
    setModoEdicao(false);
    setEnderecoEditandoId(null);
  };
  
  // Função para mostrar o formulário de novo endereço
  const mostrarFormularioNovoEndereco = () => {
    setEnderecoSelecionadoId(null);
    setMostrarNovoEndereco(true);
    setModoEdicao(false);
    setEnderecoEditandoId(null);
    // Limpar campos
    setCep('');
    setEndereco('');
    setNumero('');
    setBairro('');
    setComplemento('');
    setCidade('');
    setEstado('');
    setFormTocado(false);
    setErros({});
  };
  
  // Função para editar um endereço
  const editarEndereco = (id, e) => {
    e.stopPropagation(); // Evita selecionar o endereço
    
    const enderecoParaEditar = enderecosSalvos.find(end => end.id === id);
    if (enderecoParaEditar) {
      setModoEdicao(true);
      setEnderecoEditandoId(id);
      setMostrarNovoEndereco(false);
      setEnderecoSelecionadoId(null);
      
      // Preencher o formulário com os dados do endereço
      setCep(enderecoParaEditar.cep || '');
      setEndereco(enderecoParaEditar.endereco || '');
      setNumero(enderecoParaEditar.numero || '');
      setBairro(enderecoParaEditar.bairro || '');
      setComplemento(enderecoParaEditar.complemento || '');
      setCidade(enderecoParaEditar.cidade || '');
      setEstado(enderecoParaEditar.estado || '');
      setNome(enderecoParaEditar.nome || '');
      
      setFormTocado(false);
      setErros({});
    }
  };
  
  // Função para excluir um endereço
  const excluirEndereco = (id, e) => {
    e.stopPropagation(); // Evita selecionar o endereço
    
    // Remover o endereço da lista
    setEnderecosSalvos(enderecosSalvos.filter(endereco => endereco.id !== id));
    
    // Se o endereço excluído estava selecionado, selecionar outro ou limpar
    if (enderecoSelecionadoId === id) {
      setEnderecoSelecionadoId(null);
    }
  };
  
  // Função para continuar com o endereço selecionado
  const continuarComEnderecoSelecionado = () => {
    if (enderecoSelecionadoId) {
      const enderecoEscolhido = enderecosSalvos.find(e => e.id === enderecoSelecionadoId);
      if (enderecoEscolhido) {
        onSalvar(enderecoEscolhido);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.sectionTitle}>Endereço de Entrega</h2>
      
      {/* Lista de endereços salvos */}
      {enderecosSalvos.length > 0 && !modoEdicao && (
        <div className={styles.enderecosSalvos}>
          <h3 className={styles.subsectionTitle}>Endereços Salvos</h3>
          
          {enderecosSalvos.map((endereco) => (
            <div 
              key={endereco.id} 
              className={`${styles.enderecoCard} ${enderecoSelecionadoId === endereco.id && !mostrarNovoEndereco ? styles.selected : ''}`}
              onClick={() => selecionarEndereco(endereco.id)}
            >
              <div className={styles.radioCircle}>
                {enderecoSelecionadoId === endereco.id && !mostrarNovoEndereco && <div className={styles.radioInner}></div>}
              </div>
              
              <div className={styles.enderecoInfo}>
                <div className={styles.enderecoNome}>{endereco.nome}</div>
                <div className={styles.enderecoLinha}>
                  {endereco.endereco}, {endereco.numero} 
                  {endereco.complemento && ` - ${endereco.complemento}`}
                </div>
                <div className={styles.enderecoLinha}>
                  {endereco.bairro} - {endereco.cidade}/{endereco.estado}
                </div>
                <div className={styles.enderecoCep}>CEP: {endereco.cep}</div>
              </div>
              
              <div className={styles.enderecoAcoes}>
                <button 
                  className={styles.editarBtn}
                  onClick={(e) => editarEndereco(endereco.id, e)}
                >
                  Editar
                </button>
                <button 
                  className={styles.excluirBtn}
                  onClick={(e) => excluirEndereco(endereco.id, e)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
          
          <button 
            className={`${styles.novoEnderecoBtn} ${mostrarNovoEndereco ? styles.selected : ''}`}
            onClick={mostrarFormularioNovoEndereco}
          >
            + Novo endereço
          </button>
          
          {/* Botão de continuar para endereço selecionado */}
          {enderecoSelecionadoId && !mostrarNovoEndereco && (
            <button 
              className={styles.continuarBtn}
              onClick={continuarComEnderecoSelecionado}
            >
              Continuar com este endereço
            </button>
          )}
        </div>
      )}
      
      {/* Formulário de novo endereço ou edição */}
      {(mostrarNovoEndereco || enderecosSalvos.length === 0 || modoEdicao) && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.subsectionTitle}>
            {modoEdicao ? 'Editar Endereço' : 'Novo Endereço'}
          </h3>
          
          <div className={styles.formGroup}>
            <label htmlFor="cep">CEP*</label>
            <input
              type="text"
              id="cep"
              value={cep}
              onChange={handleCepChange}
              maxLength="9"
              placeholder="00000-000"
              className={erros.cep && formTocado ? styles.inputError : ''}
            />
            {erros.cep && formTocado && <span className={styles.error}>{erros.cep}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="endereco">Endereço*</label>
            <input
              type="text"
              id="endereco"
              value={endereco}
              onChange={(e) => {
                setEndereco(e.target.value);
                setFormTocado(true);
              }}
              placeholder="Rua, Avenida, etc."
              className={erros.endereco && formTocado ? styles.inputError : ''}
            />
            {erros.endereco && formTocado && <span className={styles.error}>{erros.endereco}</span>}
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="numero">Número*</label>
              <input
                type="text"
                id="numero"
                value={numero}
                onChange={(e) => {
                  setNumero(e.target.value);
                  setFormTocado(true);
                }}
                placeholder="123"
                className={erros.numero && formTocado ? styles.inputError : ''}
              />
              {erros.numero && formTocado && <span className={styles.error}>{erros.numero}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="bairro">Bairro*</label>
              <input
                type="text"
                id="bairro"
                value={bairro}
                onChange={(e) => {
                  setBairro(e.target.value);
                  setFormTocado(true);
                }}
                placeholder="Centro"
                className={erros.bairro && formTocado ? styles.inputError : ''}
              />
              {erros.bairro && formTocado && <span className={styles.error}>{erros.bairro}</span>}
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="complemento">Complemento (opcional)</label>
            <input
              type="text"
              id="complemento"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              placeholder="Apto, Bloco, etc."
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="cidade">Cidade*</label>
              <input
                type="text"
                id="cidade"
                value={cidade}
                onChange={(e) => {
                  setCidade(e.target.value);
                  setFormTocado(true);
                }}
                placeholder="Campestre"
                className={erros.cidade && formTocado ? styles.inputError : ''}
              />
              {erros.cidade && formTocado && <span className={styles.error}>{erros.cidade}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="estado">Estado*</label>
              <input
                type="text"
                id="estado"
                value={estado}
                onChange={(e) => {
                  setEstado(e.target.value);
                  setFormTocado(true);
                }}
                placeholder="MG"
                maxLength="2"
                className={erros.estado && formTocado ? styles.inputError : ''}
              />
              {erros.estado && formTocado && <span className={styles.error}>{erros.estado}</span>}
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label>Cliente</label>
            <div className={styles.clienteInfo}>{nome}</div>
          </div>
          
          <button type="submit" className={styles.salvarBtn}>
            {modoEdicao ? 'Salvar Alterações' : 'Continuar'}
          </button>
          
          {modoEdicao && (
            <button 
              type="button" 
              className={styles.cancelarBtn}
              onClick={() => {
                setModoEdicao(false);
                setEnderecoEditandoId(null);
                if (enderecosSalvos.length > 0) {
                  setEnderecoSelecionadoId(enderecosSalvos[0].id);
                }
              }}
            >
              Cancelar Edição
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default EnderecoForm; 