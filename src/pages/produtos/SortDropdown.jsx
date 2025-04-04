import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const SortDropdown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Encontrar a opção selecionada para exibir seu rótulo
  const selectedOptionLabel = options.find(opt => opt.value === selectedOption)?.label || "Ordenar por";

  // Alternar o estado de abertura do dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Lidar com a seleção de uma opção
  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  // Fechar o dropdown quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button 
        className="sort-dropdown-button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{selectedOptionLabel}</span>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`dropdown-icon ${isOpen ? "open" : ""}`}
        />
      </button>
      
      {isOpen && (
        <div className="sort-dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`sort-option ${selectedOption === option.value ? "active" : ""}`}
              onClick={() => handleSelect(option.value)}
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
