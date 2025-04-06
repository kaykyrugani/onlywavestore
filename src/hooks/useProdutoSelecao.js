import { useState, useCallback } from 'react';

const useProdutoSelecao = (options = {}) => {
  const {
    tamanhosDisponiveis = [37, 38, 39, 40, 41, 42, 43, 44],
    quantidadeMinima = 1,
    quantidadeMaxima = 10,
    tamanhoInicial = null,
    quantidadeInicial = null,
    onAdicionarSacola = () => {}
  } = options;

  // Estados
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(tamanhoInicial);
  const [quantidade, setQuantidade] = useState(quantidadeInicial || quantidadeMinima);
  const [erro, setErro] = useState(null);

  // Seleciona um tamanho
  const selecionarTamanho = useCallback((tamanho) => {
    setTamanhoSelecionado(tamanho);
    setErro(null);
  }, []);

  // Incrementa a quantidade
  const incrementarQuantidade = useCallback(() => {
    setQuantidade((prev) => {
      const novaQuantidade = prev + 1;
      return novaQuantidade <= quantidadeMaxima ? novaQuantidade : prev;
    });
  }, [quantidadeMaxima]);

  // Decrementa a quantidade
  const decrementarQuantidade = useCallback(() => {
    setQuantidade((prev) => {
      const novaQuantidade = prev - 1;
      return novaQuantidade >= quantidadeMinima ? novaQuantidade : prev;
    });
  }, [quantidadeMinima]);

  // Atualiza a quantidade diretamente
  const atualizarQuantidade = useCallback((valor) => {
    const numero = parseInt(valor, 10);
    if (isNaN(numero)) return;
    
    if (numero < quantidadeMinima) {
      setQuantidade(quantidadeMinima);
    } else if (numero > quantidadeMaxima) {
      setQuantidade(quantidadeMaxima);
    } else {
      setQuantidade(numero);
    }
  }, [quantidadeMinima, quantidadeMaxima]);

  // Verifica se pode adicionar à sacola
  const podeAdicionarSacola = useCallback(() => {
    return tamanhoSelecionado !== null && quantidade >= quantidadeMinima;
  }, [tamanhoSelecionado, quantidade, quantidadeMinima]);

  // Adiciona à sacola
  const adicionarSacola = useCallback((produto) => {
    if (!podeAdicionarSacola()) {
      setErro('Selecione um tamanho para adicionar à sacola');
      return false;
    }

    onAdicionarSacola({
      ...produto,
      tamanho: tamanhoSelecionado,
      quantidade
    });

    return true;
  }, [tamanhoSelecionado, quantidade, podeAdicionarSacola, onAdicionarSacola]);

  return {
    tamanhoSelecionado,
    quantidade,
    erro,
    tamanhosDisponiveis,
    selecionarTamanho,
    incrementarQuantidade,
    decrementarQuantidade,
    atualizarQuantidade,
    podeAdicionarSacola,
    adicionarSacola
  };
};

export default useProdutoSelecao; 