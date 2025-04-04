import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { tenis, camisetas, acessorios } from '../../pages/home/produtoscards';

// Definir menuItems localmente em vez de importar
const menuItems = [
  {
    id: 'sneakers',
    label: 'Sneakers',
    items: tenis.map(item => ({ id: item.id, name: item.nome })),
  },
  {
    id: 'roupas',
    label: 'Roupas',
    items: camisetas.map(item => ({ id: item.id, name: item.nome })),
  },
  {
    id: 'conjuntos',
    label: 'Conjuntos',
    items: [], // Sem itens por enquanto
  },
  {
    id: 'acessorios',
    label: 'Acessorios',
    items: acessorios.map(item => ({ id: item.id, name: item.nome })),
  },
  {
    id: 'marcas',
    label: 'Marcas',
    items: [
      { id: 'nike', name: 'Nike' },
      { id: 'adidas', name: 'Adidas' },
      { id: 'puma', name: 'Puma' },
      { id: 'reebok', name: 'Reebok' },
      { id: 'newbalance', name: 'New Balance' },
    ],
  },
];

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Função para limpar a pesquisa
  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  // Função para lidar com cliques fora do componente de pesquisa
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsInputFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Função para buscar sugestões com base no termo de pesquisa
  const getSuggestions = (term) => {
    if (!term.trim()) return [];

    // Normaliza o termo de pesquisa (lowercase e sem acentos)
    const normalizedTerm = term.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Combina todos os produtos e categorias para pesquisa
    const allProducts = [
      ...tenis.map(item => ({ id: item.id, name: item.nome, type: 'produto', category: 'Tênis' })),
      ...camisetas.map(item => ({ id: item.id, name: item.nome, type: 'produto', category: 'Camiseta' })),
      ...acessorios.map(item => ({ id: item.id, name: item.nome, type: 'produto', category: 'Acessório' }))
    ];

    // Adiciona categorias e marcas à pesquisa
    const categories = menuItems.map(item => ({ 
      id: `cat-${item.id}`, 
      name: item.label, 
      type: 'categoria' 
    }));

    const brands = menuItems.find(item => item.id === 'marcas')?.items.map(brand => ({
      id: `brand-${brand.id}`,
      name: brand.name,
      type: 'marca'
    })) || [];

    const allItems = [...allProducts, ...categories, ...brands];

    // Filtra os itens que correspondem ao termo de pesquisa
    const matchingItems = allItems.filter(item => {
      const normalizedName = item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return normalizedName.includes(normalizedTerm);
    });

    // Ordena os resultados conforme os critérios especificados
    const sortedItems = matchingItems.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      
      // Verifica se começa com o termo de pesquisa
      const aStartsWithTerm = nameA.startsWith(normalizedTerm);
      const bStartsWithTerm = nameB.startsWith(normalizedTerm);
      
      // Prioridade 1: Itens que começam com o termo de pesquisa
      if (aStartsWithTerm && !bStartsWithTerm) return -1;
      if (!aStartsWithTerm && bStartsWithTerm) return 1;
      
      // Prioridade 2: Comprimento do nome (menor primeiro)
      if (nameA.length !== nameB.length) return nameA.length - nameB.length;
      
      // Prioridade 3: Ordem alfabética
      return nameA.localeCompare(nameB);
    });

    // Limita a 10 sugestões
    return sortedItems.slice(0, 10);
  };

  // Efeito para atualizar sugestões quando o termo de pesquisa muda
  useEffect(() => {
    // Limpa o timer de debounce anterior
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Define um novo timer de debounce
    debounceTimerRef.current = setTimeout(() => {
      if (searchTerm.trim()) {
        const newSuggestions = getSuggestions(searchTerm);
        setSuggestions(newSuggestions);
      } else {
        setSuggestions([]);
      }
    }, 300); // 300ms de debounce

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm]);

  // Função para lidar com a seleção de uma sugestão
  const handleSuggestionClick = (suggestion) => {
    // Implementar navegação baseada no tipo de sugestão
    if (suggestion.type === 'produto') {
      // Determinar a categoria do produto
      let categoria = 'tenis';
      if (suggestion.category === 'Camiseta') categoria = 'camisetas';
      if (suggestion.category === 'Acessório') categoria = 'acessorios';
      
      navigate(`/produtos/${categoria}?produto=${suggestion.id}`);
    } else if (suggestion.type === 'categoria') {
      // Mapear o ID da categoria para a rota correta
      const categoryMap = {
        'cat-sneakers': 'tenis',
        'cat-roupas': 'camisetas',
        'cat-acessorios': 'acessorios',
        'cat-conjuntos': 'conjuntos',
        'cat-marcas': 'marcas'
      };
      
      navigate(`/produtos/${categoryMap[suggestion.id] || suggestion.id.replace('cat-', '')}`);
    } else if (suggestion.type === 'marca') {
      const brandId = suggestion.id.replace('brand-', '');
      navigate(`/produtos/marcas?marca=${brandId}`);
    }
    
    // Limpa a pesquisa após a seleção
    clearSearch();
    setIsInputFocused(false);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
        />
        {searchTerm ? (
          <button className="clear-search-button" onClick={clearSearch}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        ) : (
          <div className="search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        )}
      </div>

      {isInputFocused && suggestions.length > 0 && (
        <div className="search-suggestions">
          <ul>
            {suggestions.map((suggestion) => (
              <li 
                key={suggestion.id} 
                onClick={() => handleSuggestionClick(suggestion)}
                className={`suggestion-item ${suggestion.type}`}
              >
                <span className="suggestion-name">{suggestion.name}</span>
                {suggestion.category && (
                  <span className="suggestion-category">{suggestion.category}</span>
                )}
                {suggestion.type === 'categoria' && (
                  <span className="suggestion-type">Categoria</span>
                )}
                {suggestion.type === 'marca' && (
                  <span className="suggestion-type">Marca</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
