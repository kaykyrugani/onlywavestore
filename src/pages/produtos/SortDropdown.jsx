import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const SortDropdown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Encontrar a opção selecionada para exibir seu rótulo
  const selectedLabel = options.find(option => option.value === selectedOption)?.label || 'Ordenar';

  // Fechar o dropdown quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button 
        className="sort-dropdown-button" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLabel}
        <FontAwesomeIcon icon={faChevronDown} className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="sort-dropdown-menu">
          {options.map((option) => (
            <div 
              key={option.value}
              className={`sort-option ${selectedOption === option.value ? 'active' : ''}`}
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
