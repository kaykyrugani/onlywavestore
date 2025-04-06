import React, { useState } from 'react';
import styles from './EntregaOpcoes.module.css';

const EntregaOpcoes = ({ onSelecionarEntrega }) => {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('padrao');

  const opcoesEntrega = [
    {
      id: 'padrao',
      nome: 'Entrega Padrão',
      descricao: 'Receba em até 10 dias úteis',
      valor: 0,
      prazo: '10 dias úteis'
    },
    {
      id: 'expressa',
      nome: 'Entrega Expressa',
      descricao: 'Receba em até 3 dias úteis',
      valor: 15.90,
      prazo: '3 dias úteis'
    },
    {
      id: 'agendada',
      nome: 'Entrega Agendada',
      descricao: 'Escolha a data que deseja receber',
      valor: 25.90,
      prazo: 'Data a escolher'
    }
  ];

  const handleSelecionar = (id) => {
    setOpcaoSelecionada(id);
    const opcaoEscolhida = opcoesEntrega.find(opcao => opcao.id === id);
    onSelecionarEntrega(opcaoEscolhida);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Opções de Entrega</h2>
      
      <div className={styles.opcoes}>
        {opcoesEntrega.map((opcao) => (
          <div 
            key={opcao.id} 
            className={`${styles.opcao} ${opcaoSelecionada === opcao.id ? styles.selecionada : ''}`}
            onClick={() => handleSelecionar(opcao.id)}
          >
            <div className={styles.radioCircle}>
              {opcaoSelecionada === opcao.id && <div className={styles.radioInner}></div>}
            </div>
            
            <div className={styles.conteudo}>
              <div className={styles.infoTopo}>
                <h3 className={styles.nome}>{opcao.nome}</h3>
                <span className={styles.valor}>
                  {opcao.valor === 0
                    ? 'Grátis'
                    : `R$ ${opcao.valor.toFixed(2).replace('.', ',')}`}
                </span>
              </div>
              
              <div className={styles.infoBaixo}>
                <p className={styles.descricao}>{opcao.descricao}</p>
                <span className={styles.prazo}>Prazo: {opcao.prazo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        className={styles.continuarBtn}
        onClick={() => onSelecionarEntrega(opcoesEntrega.find(opcao => opcao.id === opcaoSelecionada))}
      >
        Continuar
      </button>
    </div>
  );
};

export default EntregaOpcoes; 