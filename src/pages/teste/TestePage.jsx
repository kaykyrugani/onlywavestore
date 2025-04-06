import React from 'react';
import { Link } from 'react-router-dom';
import { useProdutos } from '../../contexts/ProdutosContext';

const TestePage = () => {
  const { produtos, loading } = useProdutos();

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Página de Teste - Navegação</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Links para Testar:</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '1rem' }}>
            <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
              Página Inicial
            </Link>
          </li>
          <li style={{ marginBottom: '1rem' }}>
            <Link to="/produtos" style={{ color: 'blue', textDecoration: 'underline' }}>
              Página de Produtos
            </Link>
          </li>
          {!loading && produtos.map(produto => (
            <li key={produto.id} style={{ marginBottom: '1rem' }}>
              <Link 
                to={`/produto/${produto.id}`} 
                style={{ color: 'blue', textDecoration: 'underline' }}
              >
                Produto: {produto.nome} (ID: {produto.id})
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Informações do Produto Atual:</h2>
        <p>Esta página é apenas para teste de navegação. Use os links acima para navegar entre as páginas.</p>
      </div>
    </div>
  );
};

export default TestePage; 