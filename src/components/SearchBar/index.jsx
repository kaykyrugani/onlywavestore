import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { tenis, camisetas, acessorios } from '../../pages/home/produtoscards';
import styles from './SearchBar.module.css';

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
    items: [],
  },
  {
    id: 'acessorios',
    label: 'Acessórios',
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

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

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

  const getSuggestions = (term) => {
    if (!term.trim()) return [];

    const normalizedTerm = term.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const allProducts = [
      ...tenis.map(item => ({ id: item.id, name: item.nome, type: 'produto', category: 'Tênis' })),
      ...camisetas.map(item => ({ id: item.id, name: item.nome, type: 'produto', category: 'Camiseta' })),
      ...acessorios.map(item => ({ id: item.id, name: item.nome, type: 'produto', category: 'Acessório' }))
    ];

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

    const matchingItems = allItems.filter(item => {
      const normalizedName = item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return normalizedName.includes(normalizedTerm);
    });

    const sortedItems = matchingItems.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      
      const aStartsWithTerm = nameA.startsWith(normalizedTerm);
      const bStartsWithTerm = nameB.startsWith(normalizedTerm);
      
      if (aStartsWithTerm && !bStartsWithTerm) return -1;
      if (!aStartsWithTerm && bStartsWithTerm) return 1;
      
      if (nameA.length !== nameB.length) return nameA.length - nameB.length;
      
      return nameA.localeCompare(nameB);
    });

    return sortedItems.slice(0, 10);
  };

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (searchTerm.trim()) {
        const newSuggestions = getSuggestions(searchTerm);
        setSuggestions(newSuggestions);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'produto') {
      let categoria = 'tenis';
      if (suggestion.category === 'Camiseta') categoria = 'camisetas';
      if (suggestion.category === 'Acessório') categoria = 'acessorios';
      
      navigate(`/produtos/${categoria}?produto=${suggestion.id}`);
    } else if (suggestion.type === 'categoria') {
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
    
    clearSearch();
    setIsInputFocused(false);
  };

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <div className={styles.searchInputContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Buscar por produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
        />
        {searchTerm ? (
          <button className={styles.clearSearchButton} onClick={clearSearch}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        ) : (
          <div className={styles.searchIcon}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        )}
      </div>

      {isInputFocused && suggestions.length > 0 && (
        <div className={styles.searchSuggestions}>
          <ul>
            {suggestions.map((suggestion) => (
              <li 
                key={suggestion.id} 
                onClick={() => handleSuggestionClick(suggestion)}
                className={`${styles.suggestionItem} ${styles[suggestion.type]}`}
              >
                <span className={styles.suggestionName}>{suggestion.name}</span>
                {suggestion.category && (
                  <span className={styles.suggestionCategory}>{suggestion.category}</span>
                )}
                {suggestion.type === 'categoria' && (
                  <span className={styles.suggestionType}>Categoria</span>
                )}
                {suggestion.type === 'marca' && (
                  <span className={styles.suggestionType}>Marca</span>
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